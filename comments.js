// Create web server
// 1. Import express
const express = require('express');
const { comments } = require('./data');
const { v4: uuidv4 } = require('uuid');

// 2. Create express server
const app = express();

// 3. Add middleware to parse JSON body
app.use(express.json());

// 4. Create a route to get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// 5. Create a route to get a single comment
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === req.params.id);
  res.json(comment);
});

// 6. Create a route to create a comment
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  if (!username || !comment) {
    return res.status(400).json({ message: 'Username and comment are required' });
  }

  const newComment = {
    id: uuidv4(),
    username,
    comment
  };

  comments.push(newComment);
  res.json(newComment);
});

// 7. Create a route to update a comment
app.put('/comments/:id', (req, res) => {
  const { username, comment } = req.body;
  const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
  if (commentIndex === -1) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (!username || !comment) {
    return res.status(400).json({ message: 'Username and comment are required' });
  }

  comments[commentIndex] = {
    ...comments[commentIndex],
    username,
    comment
  };

  res.json(comments[commentIndex]);
});

// 8. Create a route to delete a comment
app.delete('/comments/:id', (req, res) => {
  const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
  if (commentIndex === -1) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  comments.splice(commentIndex, 1);
  res.sendStatus(204);
});

// 9. Start the server
app.listen(3000, () => {
  console.log('Server is