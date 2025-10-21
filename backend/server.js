const express = require('express');
const mysql = require('mysql2'); // Changed from mysql to mysql2
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'erp_main',
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = 'SELECT * FROM User_Main WHERE email = ? AND user_password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length > 0) {
      return res.json({ message: 'Login successful', role: result[0].role_id });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});