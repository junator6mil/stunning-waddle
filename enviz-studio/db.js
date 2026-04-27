const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, 'enviz.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Define Database Schema
        const schema = `
        CREATE TABLE IF NOT EXISTS spaces (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            title TEXT,
            slug TEXT UNIQUE,
            tagline TEXT,
            classification TEXT,
            project_type TEXT,
            cover_image_url TEXT,
            video_trailer_url TEXT,
            screenshot_urls TEXT, -- Stored as JSON array
            visibility TEXT,
            embed_width INTEGER,
            embed_height INTEGER,
            build_folder_path TEXT,
            index_file_path TEXT,
            file_size INTEGER,
            polygon_count TEXT,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            view_count INTEGER DEFAULT 0,
            like_count INTEGER DEFAULT 0,
            status TEXT DEFAULT 'draft'
        );
        `;
        db.run(schema, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Spaces table ready.');
            }
        });
    }
});

module.exports = db;
