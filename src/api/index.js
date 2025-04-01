import express from 'express';
import cors from 'cors';
import { Users, Courses, Progress } from '../models/index.js';
import { initializeDatabase } from '../db/index.js';

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database on server start
initializeDatabase().catch(console.error);

// User routes
app.post('/api/users', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Course routes
app.post('/api/courses', async (req, res) => {
  try {
    const course = await Courses.create(req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/courses/:userId', async (req, res) => {
  try {
    const courses = await Courses.findByUser(req.params.userId);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/courses/:courseId', async (req, res) => {
  try {
    const course = await Courses.updateStatus(req.params.courseId, req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Progress routes
app.get('/api/progress/:userId', async (req, res) => {
  try {
    const stats = await Progress.getStats(req.params.userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:userId/progress', async (req, res) => {
  try {
    const user = await Users.updateProgress(req.params.userId, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;