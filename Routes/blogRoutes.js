const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../data/posts.json');

// GET all blog posts
router.get("/post/:id", (req, res) => {
  // your logic
});


// POST a new blog
router.post('/', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsFile));
  const newPost = req.body;
  posts.push(newPost);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  res.status(201).json({ message: '✅ Blog added' });
});

module.exports = router;
