const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create tables
        db.serialize(() => {
            // Create purchases table
            db.run(`CREATE TABLE IF NOT EXISTS purchases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tcode TEXT NOT NULL,
                startDate DATE NOT NULL,
                endDate DATE NOT NULL
            )`);

            // Create students table
            db.run(`CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                verified INTEGER NOT NULL DEFAULT 0,
                createdAt DATE NOT NULL DEFAULT (DATETIME('now')),
                verificationId TEXT,
                password TEXT DEFAULT "",
                description TEXT
            )`);
        });
    }
});

module.exports = db;
