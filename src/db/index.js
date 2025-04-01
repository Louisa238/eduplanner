import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    // Read and execute migration file
    const migrationPath = path.join(__dirname, 'migrations', 'init.sql');
    const migration = fs.readFileSync(migrationPath, 'utf-8');
    
    // Execute migration
    await pool.query(migration);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export { initializeDatabase };