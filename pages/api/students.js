import { pool } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query("SELECT * FROM student");
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  } else if (req.method === 'POST') {
    try {
      const { student_id, student_name, course } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO student (student_id, student_name, course) VALUES ($1, $2, $3) RETURNING *',
        [student_id, student_name, course]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add student' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}