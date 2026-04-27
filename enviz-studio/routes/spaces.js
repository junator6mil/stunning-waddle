const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Mock user for now
const currentUserId = 'mock-user-123';

// Helper for sending json errors
const sendError = (res, status, message) => res.status(status).json({ success: false, error: message });

// Create a new space metadata
router.post('/', (req, res) => {
    const { title, slug, tagline, classification, project_type, visibility, embed_width, embed_height, description, tags } = req.body;
    
    // In a real app we would validate all inputs here
    if (!title || !slug) return sendError(res, 400, 'Title and Slug are required');

    const id = uuidv4();
    const finalSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const insert = `
        INSERT INTO spaces (
            id, user_id, title, slug, tagline, classification, project_type, 
            visibility, embed_width, embed_height
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(insert, [
        id, currentUserId, title, finalSlug, tagline, classification, project_type,
        visibility || 'public', embed_width || 1280, embed_height || 720
    ], function(err) {
        if (err) {
            console.error('Insert error:', err);
            // Unique constraint failed probably on slug
            if (err.message.includes('UNIQUE')) {
                return sendError(res, 409, 'Slug must be unique');
            }
            return sendError(res, 500, 'Failed to save space metadata');
        }
        res.json({ success: true, id, slug: finalSlug });
    });
});

// List public spaces (gallery)
router.get('/', (req, res) => {
    const { sort, classification, page, limit } = req.query;
    let query = `SELECT * FROM spaces WHERE visibility = 'public'`;
    const params = [];

    if (classification) {
        query += ` AND classification = ?`;
        params.push(classification);
    }

    if (sort === 'Newest First') {
        query += ` ORDER BY created_at DESC`;
    } else if (sort === 'Most Viewed' || sort === 'Trending') {
        query += ` ORDER BY view_count DESC`;
    } else {
        query += ` ORDER BY created_at DESC`; // Default
    }

    db.all(query, params, (err, rows) => {
        if (err) return sendError(res, 500, 'Failed to fetch spaces');
        res.json({ success: true, spaces: rows });
    });
});

// Get a single space by slug (for viewer)
router.get('/:slug', (req, res) => {
    const slug = req.params.slug;
    db.get('SELECT * FROM spaces WHERE slug = ?', [slug], (err, row) => {
        if (err) return sendError(res, 500, 'Database error');
        if (!row) return sendError(res, 404, 'Space not found');
        
        // Basic visibility check
        if (row.visibility === 'draft' && row.user_id !== currentUserId) {
             return sendError(res, 403, 'Unauthorized access');
        }

        res.json({ success: true, space: row });
    });
});

// Track space view
router.post('/:id/view', (req, res) => {
    const id = req.params.id;
    db.run('UPDATE spaces SET view_count = view_count + 1 WHERE id = ?', [id], (err) => {
        if (err) return sendError(res, 500, 'Database error');
        res.json({ success: true });
    });
});

module.exports = router;
