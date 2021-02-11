// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
app.use('/static', express.static('public'));

// Callback to debug
const listening = () => {
    console.log(`Server running on localhost: ${port}`);
};

// Spin up the server
const port = 8000;
const server = app.listen(port, listening());

app.post('/add', (req, res) => {
    newEntry = {
        date: newDate(),
        feeling: req.body.feeling,
        temperature: req.body.temperature,
        zipcode: req.body.zipcode
    }
    projectData.push(newEntry);
    res.json(newEntry);
    console.log('/add');
    console.log(newEntry);
});

app.get('/all', (req, res) => {
    res.json(projectData);
    console.log('/all');
    console.log(projectData);
});

const newDate = () => {
    const newDate = new Date();
    return newDate.toLocaleString();
}