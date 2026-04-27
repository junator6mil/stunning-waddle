const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');
const db = require('../db');

// Multer config for Temp storage
const tempDir = path.join(__dirname, '../temp');
const uploadDir = path.join(__dirname, '../uploads');
const spacesStorageDir = path.join(__dirname, '../spaces');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.fieldname === 'build') cb(null, tempDir);
        else cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});

const sendError = (res, status, message) => res.status(status).json({ success: false, error: message });

// Upload space build (Unity WebGL ZIP)
router.post('/space-build', upload.single('build'), (req, res) => {
    if (!req.file) return sendError(res, 400, 'No file uploaded');

    const { spaceId } = req.body;
    if (!spaceId) {
        // Fallback: cleanup
        fs.unlinkSync(req.file.path);
        return sendError(res, 400, 'spaceId is required. Please save the space metadata first.');
    }

    const currentUserId = 'mock-user-123'; // Mock user

    // Validate the space belongs to the user
    db.get('SELECT slug FROM spaces WHERE id = ? AND user_id = ?', [spaceId, currentUserId], (err, spaceRow) => {
        if (err || !spaceRow) {
            fs.unlinkSync(req.file.path);
            return sendError(res, 404, 'Space not found or unauthorized');
        }

        const slug = spaceRow.slug;
        const targetPath = path.join(spacesStorageDir, currentUserId, slug);

        // Ensure directory exists
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
        }

        // Unzip the file
        fs.createReadStream(req.file.path)
          .pipe(unzipper.Extract({ path: targetPath }))
          .on('close', () => {
              // Delete temp zip file
              fs.unlinkSync(req.file.path);
              
              const relativeBuildPath = `/spaces/${currentUserId}/${slug}`;

              // Update database status
              db.run('UPDATE spaces SET build_folder_path = ?, status = ? WHERE id = ?', 
                  [relativeBuildPath, 'published', spaceId], (err) => {
                  if (err) return sendError(res, 500, 'Database error during status update');
                  
                  res.json({ 
                      success: true, 
                      message: 'Build uploaded and extracted successfully',
                      buildPath: relativeBuildPath
                  });
              });
          })
          .on('error', (unzipErr) => {
              console.error('Unzip error:', unzipErr);
              fs.unlinkSync(req.file.path);
              sendError(res, 500, 'Failed to extract the ZIP file');
          });
    });
});

module.exports = router;
