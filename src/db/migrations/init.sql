-- Initialize database schema

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    programme VARCHAR(255) NOT NULL,
    level INTEGER NOT NULL,
    streak INTEGER DEFAULT 0,
    total_hours INTEGER DEFAULT 0,
    weekly_hours INTEGER DEFAULT 0,
    cwa DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    credits INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    grade VARCHAR(2),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_user_id ON courses(user_id);
CREATE INDEX idx_users_email ON users(email);