const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username=? AND password=?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }

        if (result.length > 0) {
            res.json({
                success: true,
                role: result[0].role
            });
        } else {
            res.json({ success: false });
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});