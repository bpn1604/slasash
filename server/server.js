const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'quote'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err);
        return;
    }
    console.log('Connected to database.');
});

// Route to get all favourites
app.get('/favourites', (req, res) => {
    const sql = 'SELECT * FROM favourites';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data: ' + err.stack);
            res.status(500).send('Error fetching data.');
            return;
        }
        res.json(results);
    });
});


app.post('/favourites', (req, res) => {
    const { quote_id, content, author } = req.body;
    const sql = 'INSERT INTO favourites (quote_id, content, author) VALUES (?, ?, ?)';
    db.query(sql, [quote_id, content, author], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            res.status(500).send('Error inserting data.');
            return;
        }
        res.send('Favourite added successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
