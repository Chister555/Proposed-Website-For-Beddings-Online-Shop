const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bedding = require('./app/data');
const port = 3000;

let messages = []; 


app.use(express.static('public'));
app.use('/src', express.static('src'));
app.use('/app', express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/shop.html', (req, res) => {
  res.sendFile(__dirname + "/shop.html");
});

app.get('/contact.html', (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});

app.get('/index.html#featured', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/customerList.html', (req, res) => {
  res.sendFile(__dirname + "/customerList.html");
});

app.get('/email.html', (req, res) => {
  res.sendFile(__dirname + "/email.html");
});

app.get('/facebook.html', (req, res) => {
  
  res.sendFile(__dirname + "/facebook.html");
});

app.get('/twitter.html', (req, res) => {
  
  res.sendFile(__dirname + "/twitter.html");
});

app.get('/insta.html', (req, res) => {
  
  res.sendFile(__dirname + "/insta.html");
});

app.get('/bedding', (req, res) => {  
  res.json(bedding);
});


app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = { id: messages.length + 1, name, email, message, date: new Date() };
  messages.push(newMessage);
  res.status(201).send(newMessage); 
});


app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/messages.html', (req, res) => {
  res.sendFile(__dirname + "/messages.html");
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
