const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/contacts', (req, res, next) => {
  const contact = req.body;
  console.log(contact);
  res.status(201).json({
    message: 'Contacts added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const contacts = [
    {
      id: 'fadf12421l',
      firstname: 'ali',
      lastname: 'ali',
      mobile: 654654,
      home: 654654,
      email: 'a@a.co'
    },
    {
      id: 'fadf12421l',
      firstname: 'ali',
      lastname: 'ali',
      mobile: 654654,
      home: 654654,
      email: 'a@a.co'
    }
  ];
  res.status(200).json({
    message: 'contacts fetched successfully!',
    contacts: contacts
  });
});

module.exports = app;
