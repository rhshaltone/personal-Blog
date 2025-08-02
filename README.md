# Personal Blog

Welcome to my personal blog! This is a full-stack web application built with Node.js, Express, and vanilla HTML/CSS/JavaScript.

## 🚀 Features

- **Static Frontend**: Clean, responsive design with vanilla HTML, CSS, and JavaScript
- **RESTful API**: Node.js backend with Express.js
- **Blog Management**: Create, read, update, and delete blog posts
- **Search Functionality**: Search posts by title, content, or tags
- **Responsive Design**: Works great on desktop and mobile devices
- **Real-time Clock**: Live clock display on the homepage
- **Contact Form**: Interactive contact form with validation

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Responsive design

### Backend
- Node.js
- Express.js
- File-based JSON storage
- CORS enabled
- Body parser middleware

## 📁 Project Structure

```
personal-blog/
├── Backend/
│   ├── package.json
│   └── server.js
├── Routes/
│   └── blogRoutes.js
├── Data/
│   └── posts.json
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── [image files]
├── index.html
├── about.html
├── blog.html
├── contact.html
├── projects.html
└── [other HTML files]
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal-blog.git
cd personal-blog
```

2. Install backend dependencies:
```bash
cd Backend
npm install
```

3. Start the development server:
```bash
npm run dev
# or
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 📚 API Endpoints

### Blog Posts
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific post by ID
- `POST /api/posts` - Create a new blog post
- `PUT /api/posts/:id` - Update a blog post
- `DELETE /api/posts/:id` - Delete a blog post

### Blog Routes
- `GET /api/blog/posts` - Get all posts (alternative endpoint)
- `GET /api/blog/search?q=query&tag=tag` - Search posts
- `POST /api/blog/posts` - Create a new post

### Health Check
- `GET /api/health` - API health status

## 📱 Pages

- **Home** (`/`) - Welcome page with introduction
- **About** (`/about.html`) - About me and my background
- **Blog** (`/blog.html`) - Blog posts listing
- **Projects** (`/projects.html`) - My projects showcase
- **Contact** (`/contact.html`) - Contact form

## 🎨 Features

### Frontend Features
- Responsive navigation with mobile menu
- Live clock display
- Interactive contact form
- Comment system for blog posts
- Clean, modern design

### Backend Features
- RESTful API design
- JSON file-based storage
- Error handling
- CORS support
- Static file serving

## 🚀 Deployment

### Local Development
```bash
cd Backend
npm run dev
```

### Production
```bash
cd Backend
npm start
```

### Environment Variables
Create a `.env` file in the Backend directory:
```
PORT=3000
NODE_ENV=production
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📧 Contact

- **Author**: Rimba
- **Email**: [your-email@example.com]
- **GitHub**: [your-github-username]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to the open-source community
- Inspired by modern web development practices
- Built with passion for learning and sharing knowledge

---

**Happy coding!** 🎉
