// Import required modules
const express = require('express');
const students = require('./students');

// Create the Express app
const app = express();

// Set up the server to listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// Define the API endpoints
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  console.log(req.body);
  res.send('students post request');

  students.push(req.body);
  res.json(req.body);
});

app.put('/api/students/:id', (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email } = req.body;

  const index = students.findIndex(student => student.id == id);

  if (index >= 0) {
    const std = students[index];
    std.last_name = last_name;
    std.first_name = first_name;
    std.email = email;
    res.json(std);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});
