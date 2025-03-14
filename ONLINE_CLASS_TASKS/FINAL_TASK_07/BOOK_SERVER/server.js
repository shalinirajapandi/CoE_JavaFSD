const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileSender = require('fs');

const app = express();
const PORT = 2000;

app.use(cors());
app.use(bodyParser.json())

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server listening on port " + PORT);
    }
    else {
        console.log(error);
    }
});

app.get('/books', function (req, res) {
    let bookFile = fileSender.readFileSync('./books.json');
    let books = JSON.parse(bookFile);
    res.json(books);
});
