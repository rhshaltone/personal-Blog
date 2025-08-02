const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory (your HTML files)
app.use(express.static(path.join(__dirname, '..')));

// Import routes
const blogRoutes = require('../Routes/blogRoutes');

// Use routes
app.use('/api/blog', blogRoutes);

// Root route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// API route to get blog posts
app.get('/api/posts', (req, res) => {
    try {
        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        if (fs.existsSync(postsPath)) {
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
            res.json(posts);
        } else {
            res.json({ posts: [] });
        }
    } catch (error) {
        console.error('Error reading posts:', error);
        res.status(500).json({ error: 'Failed to load posts' });
    }
});

// API route to add a new blog post
app.post('/api/posts', (req, res) => {
    try {
        const { title, content, excerpt, author, date } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        let posts = { posts: [] };
        
        if (fs.existsSync(postsPath)) {
            posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
        }

        const newPost = {
            id: Date.now(),
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            author: author || 'Rimba',
            date: date || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };

        posts.posts.push(newPost);
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
        
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// API route to get a specific post by ID
app.get('/api/posts/:id', (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        
        if (fs.existsSync(postsPath)) {
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
            const post = posts.posts.find(p => p.id === postId);
            
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error('Error reading post:', error);
        res.status(500).json({ error: 'Failed to load post' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Personal Blog API'
    });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Personal Blog Backend is running on port ${PORT}`);
    console.log(`📱 Visit: http://localhost:${PORT}`);
    console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
