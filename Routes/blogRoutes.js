const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all blog posts
router.get('/posts', (req, res) => {
    try {
        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        if (fs.existsSync(postsPath)) {
            const data = fs.readFileSync(postsPath, 'utf8');
            const posts = JSON.parse(data);
            res.json(posts);
        } else {
            res.json({ posts: [] });
        }
    } catch (error) {
        console.error('Error reading posts:', error);
        res.status(500).json({ error: 'Failed to load posts' });
    }
});

// Get a single blog post by ID
router.get('/posts/:id', (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        
        if (fs.existsSync(postsPath)) {
            const data = fs.readFileSync(postsPath, 'utf8');
            const posts = JSON.parse(data);
            const post = posts.posts.find(p => p.id === postId);
            
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } else {
            res.status(404).json({ error: 'Posts file not found' });
        }
    } catch (error) {
        console.error('Error reading post:', error);
        res.status(500).json({ error: 'Failed to load post' });
    }
});

// Create a new blog post
router.post('/posts', (req, res) => {
    try {
        const { title, content, excerpt, author, tags } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        let postsData = { posts: [] };
        
        if (fs.existsSync(postsPath)) {
            const data = fs.readFileSync(postsPath, 'utf8');
            postsData = JSON.parse(data);
        }

        const newPost = {
            id: Date.now(),
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            author: author || 'Rimba',
            date: new Date().toISOString().split('T')[0],
            tags: tags || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        postsData.posts.push(newPost);
        fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));
        
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Update a blog post
router.put('/posts/:id', (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, content, excerpt, author, tags } = req.body;
        
        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        
        if (!fs.existsSync(postsPath)) {
            return res.status(404).json({ error: 'Posts file not found' });
        }

        const data = fs.readFileSync(postsPath, 'utf8');
        const postsData = JSON.parse(data);
        const postIndex = postsData.posts.findIndex(p => p.id === postId);
        
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Update the post
        postsData.posts[postIndex] = {
            ...postsData.posts[postIndex],
            title: title || postsData.posts[postIndex].title,
            content: content || postsData.posts[postIndex].content,
            excerpt: excerpt || (content ? content.substring(0, 150) + '...' : postsData.posts[postIndex].excerpt),
            author: author || postsData.posts[postIndex].author,
            tags: tags || postsData.posts[postIndex].tags,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));
        
        res.json(postsData.posts[postIndex]);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// Delete a blog post
router.delete('/posts/:id', (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        
        if (!fs.existsSync(postsPath)) {
            return res.status(404).json({ error: 'Posts file not found' });
        }

        const data = fs.readFileSync(postsPath, 'utf8');
        const postsData = JSON.parse(data);
        const postIndex = postsData.posts.findIndex(p => p.id === postId);
        
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const deletedPost = postsData.posts.splice(postIndex, 1)[0];
        fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));
        
        res.json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Search posts
router.get('/search', (req, res) => {
    try {
        const { q, tag } = req.query;
        const postsPath = path.join(__dirname, '..', 'Data', 'posts.json');
        
        if (!fs.existsSync(postsPath)) {
            return res.json({ posts: [] });
        }

        const data = fs.readFileSync(postsPath, 'utf8');
        const postsData = JSON.parse(data);
        let filteredPosts = postsData.posts;

        // Filter by search query
        if (q) {
            const query = q.toLowerCase();
            filteredPosts = filteredPosts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query)
            );
        }

        // Filter by tag
        if (tag) {
            filteredPosts = filteredPosts.filter(post => 
                post.tags && post.tags.includes(tag)
            );
        }

        res.json({ posts: filteredPosts });
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'Failed to search posts' });
    }
});

module.exports = router;
