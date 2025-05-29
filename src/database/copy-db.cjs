const fs = require('fs');
const path = require('path');

// ✅ __dirname is available by default in CommonJS
const source = path.resolve(__dirname, 'databaseSQLite.db');
const dest = path.resolve(__dirname, '..', '..', 'dist-electron/database', 'databaseSQLite.db');

// Ensure destination folder exists
fs.mkdirSync(path.dirname(dest), { recursive: true });

// Copy file
fs.copyFileSync(source, dest);

console.log('✔ Copied:', source, '→', dest);