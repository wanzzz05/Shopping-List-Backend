const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const cors = require('cors');

const itemRoutes = require('./routes/itemRoutes');
app.use(bodyParser.json());
app.use(cors());

const mongoURL='mongodb+srv://pawankaru2005:8PPXETIn04af3Xgc@cluster0.c8cjaye.mongodb.net/ShoppingList?retryWrites=true&w=majority'

mongoose.connect(mongoURL);
const db =mongoose.connection;
db.on('error' ,console.error.bind(console, "MongoDB connection error"));
db.once('open', ()=>(console.log('connected to MongoDB')

))

app.use('/item',itemRoutes);

// Define a route for GET requests to the root URL
app.get('/yes', (req, res) => {
  res.send('Hello World from Express!');
});

app.get('/no', (req, res) => {
  res.send(' Bye World! ');
});


app.post('/new', (req, res) => {
  res.send(' New World! ');
});

app.get('/kottu/:type/:portion', (req, res) => {
  res.send(`kottu type ${req.params.type} ${req.params.portion}`);
});

app.get('/kottu', (req, res) => { 
    const {type, size} = req.query
  res.send(`kottu type${type} ${size}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 