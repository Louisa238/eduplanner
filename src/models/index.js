import pool from '../config/database.js';

export const Users = {
  async create({ name, email, password, programme, level }) {
    const query = 'INSERT INTO users (name, email, password, programme, level) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, email, password, programme, level];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async updateProgress(userId, { streak, total_hours, weekly_hours, cwa }) {
    const query = 'UPDATE users SET streak = $1, total_hours = $2, weekly_hours = $3, cwa = $4 WHERE id = $5 RETURNING *';
    const values = [streak, total_hours, weekly_hours, cwa, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

export const Courses = {
  async create({ code, name, credits, semester, user_id }) {
    const query = 'INSERT INTO courses (code, name, credits, semester, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [code, name, credits, semester, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByUser(userId) {
    const query = 'SELECT * FROM courses WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async updateStatus(courseId, { status, grade }) {
    const query = 'UPDATE courses SET status = $1, grade = $2 WHERE id = $3 RETURNING *';
    const values = [status, grade, courseId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

export const Progress = {
  async getStats(userId) {
    const query = `
      SELECT 
        AVG(CASE 
          WHEN grade = 'A' THEN 4.0
          WHEN grade = 'A-' THEN 3.7
          WHEN grade = 'B+' THEN 3.3
          WHEN grade = 'B' THEN 3.0
          WHEN grade = 'B-' THEN 2.7
          WHEN grade = 'C+' THEN 2.3
          WHEN grade = 'C' THEN 2.0
          WHEN grade = 'C-' THEN 1.7
          WHEN grade = 'D+' THEN 1.3
          WHEN grade = 'D' THEN 1.0
          WHEN grade = 'F' THEN 0.0
        END) as average_grade,
        COUNT(*) as total_courses,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_courses,
        SUM(credits) as total_credits,
        SUM(CASE WHEN status = 'completed' THEN credits ELSE 0 END) as completed_credits
      FROM courses
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
};