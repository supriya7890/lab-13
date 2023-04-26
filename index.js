const express = require('express');
const app = express();
const port = 3000;

// example data for the API
let resources = [
  { id: 1, name: 'resource1' },
  { id: 2, name: 'resource2' },
  { id: 3, name: 'resource3' },
];

// middleware to parse JSON request bodies
app.use(express.json());

// GET method to retrieve all resources
app.get('/resources', (req, res) => {
  res.json(resources);
});

// GET method to retrieve a specific resource by ID
app.get('/resources/:id', (req, res) => {
  const id = req.params.id;
  const resource = resources.find(r => r.id === parseInt(id));
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send('Resource not found');
  }
});

// POST method to create a new resource
app.post('/resources', (req, res) => {
  const resource = req.body;
  resource.id = resources.length + 1;
  resources.push(resource);
  res.json(resource);
});

// PUT method to update a resource by ID
app.put('/resources/:id', (req, res) => {
  const id = req.params.id;
  const resourceIndex = resources.findIndex(r => r.id === parseInt(id));
  if (resourceIndex !== -1) {
    resources[resourceIndex] = req.body;
    resources[resourceIndex].id = parseInt(id);
    res.json(resources[resourceIndex]);
  } else {
    res.status(404).send('Resource not found');
  }
});

// DELETE method to delete a resource by ID
app.delete('/resources/:id', (req, res) => {
  const id = req.params.id;
  const resourceIndex = resources.findIndex(r => r.id === parseInt(id));
  if (resourceIndex !== -1) {
    resources.splice(resourceIndex, 1);
    res.send(`Resource with ID ${id} deleted`);
  } else {
    res.status(404).send('Resource not found');
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
