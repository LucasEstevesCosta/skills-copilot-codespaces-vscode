// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// create comments array
const comments = [
  { username: 'Todd', comment: 'lol' },
  { username: 'Skyler', comment: 'rofl' },
  { username: 'Sk8erBoi', comment: 'lmao' },
  { username: 'Jake', comment: 'lmfao' },
];

// get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// get comment by username
app.get('/comments/:username', (req, res) => {
  const comment = comments.find((comment) => comment.username === req.params.username);
  res.json(comment);
});

// post comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.json(comment);
});

// start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});