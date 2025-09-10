// Enhanced Blog Functionality
class BlogManager {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentPage = 1;
    this.postsPerPage = 6;
    this.currentFilter = 'all';
    this.currentSort = 'newest';
    this.searchQuery = '';
    this.currentPostIndex = -1; // index within filteredPosts

    this.initializeBlog();
  }

  async initializeBlog() {
    await this.loadPosts();
    this.setupElements();
    this.bindEvents();
    this.renderTags();
    this.filterAndRender();
  }

  async loadPosts() {
    try {
      const response = await fetch('./Data/posts.json');
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }
      const data = await response.json();
      this.posts = data.posts || [];
      
      // Add some additional posts for better demo
      this.posts = [
        ...this.posts,
        {
          id: 4,
          title: "Building My First Cybersecurity Lab",
          content: `Setting up a home cybersecurity lab has been one of the most rewarding projects I've undertaken. Here's how I built mine from scratch and what I learned in the process.

## The Setup

I started with a basic setup using VirtualBox on my main machine. Here's what I included:

### Virtual Machines:
- **Kali Linux** - For penetration testing and security tools
- **Metasploitable2** - As a vulnerable target system
- **Windows 10** - For testing Windows-specific vulnerabilities
- **Ubuntu Server** - For web application testing

### Tools and Software:
- **Wireshark** for network analysis
- **Nmap** for network scanning
- **Burp Suite** for web application testing
- **OWASP ZAP** as an alternative web scanner

## Key Lessons Learned

1. **Start Small**: Don't try to build everything at once
2. **Documentation is Key**: Keep detailed notes of your configurations
3. **Practice Safely**: Only test on systems you own or have permission to test
4. **Network Isolation**: Keep your lab separate from your main network

## Next Steps

I'm planning to expand my lab with:
- Docker containers for easier management
- A dedicated physical machine
- More diverse operating systems

Building this lab has accelerated my learning tremendously. If you're studying cybersecurity, I highly recommend setting up your own lab environment.`,
          excerpt: "Setting up a home cybersecurity lab has been one of the most rewarding projects I've undertaken. Here's how I built mine from scratch...",
          author: "Shal Rhimba",
          date: "2024-12-15",
          tags: ["cybersecurity", "lab", "virtual-machines", "learning"],
          createdAt: "2024-12-15T10:00:00.000Z",
          updatedAt: "2024-12-15T10:00:00.000Z"
        },
        {
          id: 5,
          title: "My Journey with Web Development",
          content: `Web development wasn't my first choice when I started studying ICT, but it's become one of my favorite skills to develop. Here's my journey and what I've learned along the way.

## How It Started

I initially focused purely on cybersecurity, but I quickly realized that understanding web technologies is crucial for:
- Web application security testing
- Understanding common vulnerabilities like XSS and SQL injection
- Building tools and dashboards for security operations

## Technologies I've Learned

### Frontend:
- **HTML5 & CSS3**: The foundation of everything
- **JavaScript**: From basic DOM manipulation to advanced ES6+ features
- **Responsive Design**: Making sites work on all devices
- **CSS Frameworks**: Bootstrap, and now custom CSS systems

### Backend:
- **Node.js**: JavaScript on the server
- **Express.js**: Web framework for Node.js
- **Databases**: MySQL, MongoDB basics
- **APIs**: RESTful services and JSON handling

## Projects That Taught Me

1. **Weather App**: API integration and async JavaScript
2. **Environment Gallery**: Complex filtering and image handling
3. **This Blog**: Content management and responsive design
4. **Cybersecurity Platform**: Educational content delivery

## What's Next

I'm excited to explore:
- React or Vue.js for more complex UIs
- Python web frameworks like Django
- Cloud deployment with AWS or Azure
- Progressive Web Apps (PWAs)

Web development has enhanced my cybersecurity studies by giving me a deeper understanding of how applications work and where vulnerabilities might exist.`,
          excerpt: "Web development wasn't my first choice when I started studying ICT, but it's become one of my favorite skills to develop...",
          author: "Shal Rhimba",
          date: "2024-12-10",
          tags: ["web-development", "javascript", "learning", "projects"],
          createdAt: "2024-12-10T14:00:00.000Z",
          updatedAt: "2024-12-10T14:00:00.000Z"
        },
        {
          id: 6,
          title: "The Importance of Continuous Learning in Tech",
          content: `Technology moves fast. Really fast. One day you're learning about the latest framework, and the next day there's already a newer, "better" version. Here's how I stay current and why continuous learning is essential.

## Why Continuous Learning Matters

In the tech industry, especially in cybersecurity:
- New threats emerge daily
- Tools and technologies evolve rapidly
- What you learned yesterday might be outdated tomorrow
- Employers value adaptability and growth mindset

## My Learning Strategy

### 1. Set Clear Goals
I break down learning into manageable chunks:
- Short-term: Complete a specific tutorial or course
- Medium-term: Build a project using new skills
- Long-term: Achieve certifications or major milestones

### 2. Mix Theory with Practice
- Read documentation and articles
- Watch video tutorials
- Build real projects
- Participate in online communities

### 3. Stay Curious
- Follow tech news and blogs
- Join Discord/Slack communities
- Attend virtual conferences and webinars
- Network with other learners and professionals

## Resources I Recommend

### For Cybersecurity:
- **Cybrary** - Free cybersecurity training
- **OverTheWire** - Hands-on security challenges
- **SANS Institute** - Professional training (premium)
- **Security podcasts** - Learning during commutes

### For Web Development:
- **freeCodeCamp** - Comprehensive free curriculum
- **MDN Web Docs** - Authoritative web standards
- **JavaScript.info** - Deep dive into JavaScript
- **GitHub** - Open source projects to study

### General Learning:
- **Coursera/edX** - University-level courses
- **YouTube** - Countless free tutorials
- **Stack Overflow** - Problem-solving community
- **Reddit** - r/learnprogramming, r/cybersecurity

## The Compound Effect

The key insight I've learned is that small, consistent efforts compound over time. Spending 30 minutes a day learning something new adds up to over 180 hours per year!

Remember: You don't need to learn everything, but you need to keep learning something.`,
          excerpt: "Technology moves fast. Really fast. Here's how I stay current and why continuous learning is essential in tech...",
          author: "Shal Rhimba",
          date: "2024-12-05",
          tags: ["learning", "career", "motivation", "resources"],
          createdAt: "2024-12-05T09:00:00.000Z",
          updatedAt: "2024-12-05T09:00:00.000Z"
        }
      ];
      
      this.filteredPosts = [...this.posts];
    } catch (error) {
      console.error('Error loading posts:', error);
      this.posts = [];
      this.filteredPosts = [];
    }
  }

  setupElements() {
    this.searchInput = document.getElementById('searchInput');
    this.tagsContainer = document.getElementById('tagsContainer');
    this.sortSelect = document.getElementById('sortSelect');
    this.postsGrid = document.getElementById('postsGrid');
    this.pagination = document.getElementById('pagination');
    this.readerModal = document.getElementById('readerModal');
    this.readerTitle = document.getElementById('readerTitle');
    this.readerMeta = document.getElementById('readerMeta');
    this.readerBody = document.getElementById('readerBody');
    this.readerClose = document.getElementById('readerClose');
    this.readerBackdrop = document.getElementById('readerBackdrop');
    this.readerPrev = document.getElementById('readerPrev');
    this.readerNext = document.getElementById('readerNext');
    this.shareBtn = document.getElementById('shareBtn');
    this.copyLinkBtn = document.getElementById('copyLinkBtn');
  }

  bindEvents() {
    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.currentPage = 1;
        this.filterAndRender();
      });
    }

    // Sort functionality
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.currentPage = 1;
        this.filterAndRender();
      });
    }

    // Modal events
    if (this.readerClose) {
      this.readerClose.addEventListener('click', () => this.closeModal());
    }
    
    if (this.readerBackdrop) {
      this.readerBackdrop.addEventListener('click', () => this.closeModal());
    }

    if (this.readerPrev) {
      this.readerPrev.addEventListener('click', () => this.navigateModal(-1));
    }
    if (this.readerNext) {
      this.readerNext.addEventListener('click', () => this.navigateModal(1));
    }

    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', () => this.shareCurrentPost());
    }
    if (this.copyLinkBtn) {
      this.copyLinkBtn.addEventListener('click', () => this.copyCurrentLink());
    }

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (this.readerModal.classList.contains('show')) {
        if (e.key === 'Escape') this.closeModal();
        if (e.key === 'ArrowLeft') this.navigateModal(-1);
        if (e.key === 'ArrowRight') this.navigateModal(1);
      }
    });

    // Deep link open
    this.openFromURL();
  }

  getAllTags() {
    const allTags = new Set();
    this.posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => allTags.add(tag));
      }
    });
    return Array.from(allTags).sort();
  }

  renderTags() {
    if (!this.tagsContainer) return;

    const tags = this.getAllTags();
    const tagElements = ['all', ...tags].map(tag => {
      const isActive = this.currentFilter === tag;
      return `
        <span class="tag ${tag === 'all' ? 'all' : ''} ${isActive ? 'active' : ''}" 
              data-tag="${tag}">
          ${tag === 'all' ? 'All Posts' : '#' + tag}
        </span>
      `;
    }).join('');

    this.tagsContainer.innerHTML = tagElements;

    // Bind tag click events
    this.tagsContainer.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        const selectedTag = e.target.dataset.tag;
        this.currentFilter = selectedTag;
        this.currentPage = 1;
        this.updateActiveTag(selectedTag);
        this.filterAndRender();
      });
    });
  }

  updateActiveTag(activeTag) {
    if (!this.tagsContainer) return;
    
    this.tagsContainer.querySelectorAll('.tag').forEach(tag => {
      tag.classList.remove('active');
      if (tag.dataset.tag === activeTag) {
        tag.classList.add('active');
      }
    });
  }

  filterAndRender() {
    // Apply filters
    this.filteredPosts = this.posts.filter(post => {
      // Tag filter
      const tagMatch = this.currentFilter === 'all' || 
                      (post.tags && post.tags.includes(this.currentFilter));

      // Search filter
      const searchMatch = !this.searchQuery || 
                         post.title.toLowerCase().includes(this.searchQuery) ||
                         post.excerpt.toLowerCase().includes(this.searchQuery) ||
                         post.content.toLowerCase().includes(this.searchQuery) ||
                         (post.tags && post.tags.some(tag => 
                           tag.toLowerCase().includes(this.searchQuery)));

      return tagMatch && searchMatch;
    });

    // Apply sorting
    this.sortPosts();

    // Render results
    this.renderPosts();
    this.renderPagination();
  }

  sortPosts() {
    this.filteredPosts.sort((a, b) => {
      switch (this.currentSort) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }

  renderPosts() {
    if (!this.postsGrid) return;

    if (this.filteredPosts.length === 0) {
      this.postsGrid.innerHTML = `
        <div class="no-posts">
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      `;
      return;
    }

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

    // Render posts
    this.postsGrid.innerHTML = postsToShow.map(post => {
      const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const tagsHtml = post.tags ? post.tags.map(tag => 
        `<span class="post-tag">${tag}</span>`
      ).join('') : '';

      return `
        <article class="post-card" data-post-id="${post.id}">
          <div class="post-header">
            <h3 class="post-title">${post.title}</h3>
            <div class="post-meta">
              <div class="post-author">
                <i class="fas fa-user"></i>
                <span>${post.author}</span>
              </div>
              <div class="post-date">
                <i class="fas fa-calendar"></i>
                <span>${formattedDate}</span>
              </div>
            </div>
          </div>
          
          <div class="post-excerpt">
            ${post.excerpt}
          </div>
          
          <div class="post-footer">
            <div class="post-tags">
              ${tagsHtml}
            </div>
            <a href="#" class="read-more" data-post-id="${post.id}">
              Read More <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>
      `;
    }).join('');

    // Bind click events for posts
    this.bindPostEvents();
  }

  bindPostEvents() {
    // Post card click events
    this.postsGrid.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.read-more')) {
          e.preventDefault();
        }
        const postId = parseInt(card.dataset.postId);
        this.openModal(postId);
      });
    });

    // Also bind explicit read-more links for accessibility
    this.postsGrid.querySelectorAll('.read-more').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const postId = parseInt(link.dataset.postId);
        this.openModal(postId);
      });
    });

    // Read more link events
    this.postsGrid.querySelectorAll('.read-more').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const postId = parseInt(link.dataset.postId);
        this.openModal(postId);
      });
    });
  }

  renderPagination() {
    if (!this.pagination) return;

    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    
    if (totalPages <= 1) {
      this.pagination.innerHTML = '';
      return;
    }

    let paginationHtml = '';

    // Previous button
    paginationHtml += `
      <button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
              data-page="${this.currentPage - 1}">
        <i class="fas fa-chevron-left"></i> Previous
      </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        paginationHtml += `
          <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                  data-page="${i}">
            ${i}
          </button>
        `;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        paginationHtml += '<span class="page-dots">...</span>';
      }
    }

    // Next button
    paginationHtml += `
      <button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
              data-page="${this.currentPage + 1}">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    `;

    this.pagination.innerHTML = paginationHtml;

    // Bind pagination events
    this.pagination.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.disabled) return;
        const page = parseInt(btn.dataset.page);
        this.currentPage = page;
        this.renderPosts();
        this.renderPagination();
        
        // Scroll to top of posts
        this.postsGrid.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  openModal(postId) {
    const postIndex = this.filteredPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;
    const post = this.filteredPosts[postIndex];
    this.currentPostIndex = postIndex;

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Set modal content
    this.readerTitle.textContent = post.title;
    
    this.readerMeta.innerHTML = `
      <div>
        <i class="fas fa-user"></i>
        <span>By ${post.author}</span>
      </div>
      <div>
        <i class="fas fa-calendar"></i>
        <span>${formattedDate}</span>
      </div>
      ${post.tags ? `
        <div>
          <i class="fas fa-tags"></i>
          <span>${post.tags.join(', ')}</span>
        </div>
      ` : ''}
    `;
    
    // Convert content to HTML (simple markdown-like conversion)
    const htmlContent = this.convertToHtml(post.content);
    this.readerBody.innerHTML = htmlContent;

    // Show modal
    this.readerModal.classList.add('show');
    this.readerModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update nav buttons
    this.updateModalNavButtons();

    // Update URL and title
    this.pushURL(post.id, post.title);

    // Focus management
    this.readerClose.focus();
  }

  closeModal() {
    this.readerModal.classList.remove('show');
    this.readerModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    this.currentPostIndex = -1;
    this.popURL();
  }

  updateModalNavButtons() {
    if (!this.readerPrev || !this.readerNext) return;
    this.readerPrev.disabled = this.currentPostIndex <= 0;
    this.readerNext.disabled = this.currentPostIndex >= this.filteredPosts.length - 1;
  }

  navigateModal(direction) {
    if (this.currentPostIndex === -1) return;
    let newIndex = this.currentPostIndex + direction;
    if (newIndex < 0 || newIndex >= this.filteredPosts.length) return;
    const nextPost = this.filteredPosts[newIndex];
    this.openModal(nextPost.id);
  }

  pushURL(postId, title) {
    const url = new URL(window.location.href);
    url.searchParams.set('post', String(postId));
    window.history.pushState({ postId }, '', url.toString());
    if (title) document.title = `${title} — Shal Rhimba Blog`;
  }

  popURL() {
    const url = new URL(window.location.href);
    url.searchParams.delete('post');
    window.history.pushState({}, '', url.toString());
    document.title = 'Blog - Shal Rhimba';
  }

  openFromURL() {
    const url = new URL(window.location.href);
    const postIdParam = url.searchParams.get('post');
    if (postIdParam) {
      const postId = parseInt(postIdParam);
      // Wait until posts rendered
      setTimeout(() => this.openModal(postId), 100);
    }

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      const currentParam = new URL(window.location.href).searchParams.get('post');
      if (currentParam) {
        this.openModal(parseInt(currentParam));
      } else if (this.readerModal.classList.contains('show')) {
        this.closeModal();
      }
    });
  }

  shareCurrentPost() {
    if (this.currentPostIndex === -1) return;
    const current = this.filteredPosts[this.currentPostIndex];
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('post', String(current.id));

    if (navigator.share) {
      navigator.share({
        title: current.title,
        text: 'Check out this post by Shal Rhimba',
        url: shareUrl.toString(),
      }).catch(() => {});
    } else {
      this.copyTextToClipboard(shareUrl.toString());
      this.showCopied();
    }
  }

  copyCurrentLink() {
    if (this.currentPostIndex === -1) return;
    const current = this.filteredPosts[this.currentPostIndex];
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('post', String(current.id));
    this.copyTextToClipboard(shareUrl.toString());
    this.showCopied();
  }

  copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  showCopied() {
    if (!this.copyLinkBtn) return;
    this.copyLinkBtn.classList.add('copied');
    const original = this.copyLinkBtn.textContent;
    this.copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => {
      this.copyLinkBtn.classList.remove('copied');
      this.copyLinkBtn.textContent = original;
    }, 1500);
  }

  convertToHtml(content) {
    return content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      .replace(/## (.*?)(<br>|<\/p>)/g, '<h2>$1</h2>')
      .replace(/### (.*?)(<br>|<\/p>)/g, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/<p><\/p>/g, '')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>');
  }
}

// Initialize blog when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the blog page
  if (document.getElementById('postsGrid')) {
    new BlogManager();
  }
});
