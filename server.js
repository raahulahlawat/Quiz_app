const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jaat',
    database: 'Rahul',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.post('/myFrom', async (req, res) => {
    const { name, email, contact } = req.body;

    try {
        if (name === undefined || email === undefined || contact === undefined) {
            throw new Error('Invalid request body. Make sure all required fields are provided.');
        }

        const connection = await pool.promise().getConnection();

        // Check if the user with the provided email already exists
        const [existingUsers] = await connection.execute('SELECT * FROM test WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            // User already exists, send a response to the client
            res.status(409).json({ success: false, message: 'User already exists.' });
            connection.release();
            return;
        }

        // User doesn't exist, proceed with the signup
        const [result] = await connection.execute('INSERT INTO test (name, email, contact) VALUES (?, ?, ?)', [name, email, contact]);
        connection.release();

        res.redirect('/indexhome.html');
        return;
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ success: false, message: `Error signing up user: ${error.message}` });
    }
});





app.get('/indexhome.html', (req, res) => {
    res.sendFile(__dirname + '/indexhome.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});