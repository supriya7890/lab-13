import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.json());

let movies = [
  { id: 1, title: 'Inception', description: 'A skilled thief is tasked with entering the dreams of others in order to plant an idea in their subconscious.', quantity: 1000 },
  { id: 2, title: 'The Matrix', description: 'A computer programmer is drawn into a rebellion against machines that have enslaved humanity.', quantity: 500 },
  { id: 3, title: 'The Silence of the Lambs', description: 'An FBI trainee seeks the help of a psychopathic serial killer in order to catch another serial killer.', quantity: 100 },
  { id: 4, title: 'Fight Club', description: 'An insomniac office worker and a soap maker form an underground fight club that evolves into something much, much more.', quantity: 200 }
];

// Get all movies
app.get('/', (req, res) => {
  res.send('Welcome to the Movies API!');
});

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  });
  

// Create a new movie
app.post('/movies', (req, res) => {
  const movie = {
    id: movies.length + 1,
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity
  };
  movies.push(movie);
  console.log('New movie created:', movie);
  res.status(201).json(movie);
});

// Update a movie by id
app.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  movie.title = req.body.title;
  movie.description = req.body.description;
  movie.quantity = req.body.quantity;
  console.log('Movie updated:', movie);
  res.status(200).json(movie);
});

// Delete a movie by id
app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  movies.splice(movieIndex, 1);
  console.log('Movie deleted:', req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
