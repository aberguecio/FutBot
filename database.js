// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ubicación de la base de datos
const dbPath = path.resolve(__dirname, 'data', 'chatbot.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT,
      role TEXT,
      content TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function saveMessage(user, role, content) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (user, role, content) VALUES (?, ?, ?)`,
      [user, role, content],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
}

function getUserMessages(user, limit = 10) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT role, content FROM messages WHERE user = ? ORDER BY timestamp DESC LIMIT ?`,
      [user, limit],
      (err, rows) => {
        if (err) {
          return reject(err);
        }
        // Reversa para mantener el orden cronológico
        resolve(rows.reverse());
      }
    );
  });
}

module.exports = { saveMessage, getUserMessages };
