const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/submit', (req, res) => {
    const formData = req.body;
    const { name, email, message } = formData;

    const dataToWrite = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    fs.appendFile('data.txt', dataToWrite, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data');
        } else {
            console.log('Data has been saved to data.txt');
            res.status(200).send('Form data submitted successfully!');
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

