// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Add this line after "app.use(bodyParser.json());"
app.use(express.static(__dirname));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // REPLACE with your MySQL username
    password: 'K@rm16062006', // REPLACE with your MySQL password
    database: 'event_tracker'
});

db.connect(err => {
    if (err) console.error('DB Connection Failed:', err);
    else console.log('Connected to MySQL Database');
});

// API Endpoint to save event
app.post('/log', (req, res) => {
    const { eventType, message } = req.body;
    const sql = 'INSERT INTO logs (event_type, message) VALUES (?, ?)';
    db.query(sql, [eventType, message], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Logged successfully');
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});