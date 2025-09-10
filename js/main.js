// Enhanced Modern JavaScript for Personal Blog
class BlogApp {
  constructor() {
    this.initializeApp();
    this.bindEvents();
    this.setupUXFeatures();
  }

  initializeApp() {
    // Hide loading screen after content loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }
      }, 800);
    });

    // Initialize components
    this.setupMobileNavigation();
    this.setupLiveClock();
    this.setupScrollFeatures();
    this.setupFormHandlers();
    this.addAnimations();
  }

  setupMobileNavigation() {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    // Create mobile menu button
    const menuBtn = document.createElement("button");
    menuBtn.innerHTML = "☰";
    menuBtn.className = "mobile-menu-btn";
    menuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    menuBtn.style.cssText = `
      display: none;
      font-size: 1.8rem;
      background: none;
      color: white;
      border: none;
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
      transition: all 0.3s ease;
    `;

    // Add responsive behavior
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => {
      if (e.matches) {
        menuBtn.style.display = 'block';
      } else {
        menuBtn.style.display = 'none';
        navLinks.classList.remove('show');
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQuery);

    navLinks.parentElement.insertBefore(menuBtn, navLinks);

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuBtn.innerHTML = navLinks.classList.contains('show') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('show');
        menuBtn.innerHTML = '☰';
      }
    });
  }

  setupLiveClock() {
    const updateClock = () => {
      const clock = document.getElementById("live-clock");
      if (clock) {
        const now = new Date();
        const options = { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        };
        clock.textContent = now.toLocaleTimeString('en-US', options);
      }
    };

    setInterval(updateClock, 1000);
    updateClock();
  }

  setupScrollFeatures() {
    // Scroll progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollToTop = document.getElementById('scrollToTop');

    const updateScrollProgress = () => {
      const scrolled = window.pageYOffset;
      const maxScrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrolled / maxScrollHeight) * 100;
      
      if (scrollProgress) {
        scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
      }

      // Show/hide scroll to top button
      if (scrollToTop) {
        if (scrolled > 300) {
          scrollToTop.classList.add('visible');
        } else {
          scrollToTop.classList.remove('visible');
        }
      }
    };

    // Smooth scroll to top
    if (scrollToTop) {
      scrollToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupFormHandlers() {
    // Contact form handler
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        if (submitBtn) {
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
        }

        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.showNotification("✅ Thanks! Your message has been received.", 'success');
        contactForm.reset();
        
        // Reset button
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    }

    // Comment form handler
    const commentForm = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    if (commentForm && commentList) {
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("commentName")?.value.trim();
        const text = document.getElementById("commentText")?.value.trim();

        if (name && text) {
          const newComment = document.createElement("div");
          newComment.className = "comment-item fade-in";
          newComment.innerHTML = `
            <div class="comment-header">
              <strong>${this.escapeHtml(name)}</strong>
              <span class="comment-date">${new Date().toLocaleDateString()}</span>
            </div>
            <p>${this.escapeHtml(text)}</p>
          `;
          commentList.appendChild(newComment);
          commentForm.reset();
          
          this.showNotification("Comment added successfully!", 'success');
        }
      });
    }
  }

  addAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.card, .project-card, .blog-post');
    animateElements.forEach(el => observer.observe(el));
  }

  setupUXFeatures() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
      // ESC to close mobile menu
      if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks?.classList.contains('show')) {
          navLinks.classList.remove('show');
          if (menuBtn) menuBtn.innerHTML = '☰';
        }
      }
    });

    // Enhance link accessibility
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
      if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  bindEvents() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.title = '👋 Come back soon - Shal Rhimba';
      } else {
        document.title = 'Shal Rhimba | Cybersecurity Student & Tech Creator';
      }
    });

    // Performance monitoring
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
      }
    });
  }

  // Utility methods
  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#00c896' : '#0066cc'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 10000;
      opacity: 0;
      transform: translateX(100px);
      transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize the app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new BlogApp();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogApp;
}
