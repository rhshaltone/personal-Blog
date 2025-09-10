class EnvironmentGallery {
    constructor() {
        this.currentLightboxIndex = 0;
        this.visibleItems = [];
        this.initializeElements();
        this.bindEvents();
        this.initializeGallery();
    }
    
    initializeElements() {
        this.galleryGrid = document.getElementById('galleryGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightboxImg');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxDescription = document.getElementById('lightboxDescription');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
    }
    
    bindEvents() {
        // Filter button events
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleFilterClick(btn);
            });
        });
        
        // Lightbox events
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('show')) {
                if (e.key === 'Escape') {
                    this.closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    this.navigateLightbox(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateLightbox(1);
                }
            }
        });
        
        // Prevent body scroll when lightbox is open
        this.lightbox.addEventListener('wheel', (e) => {
            e.preventDefault();
        });
    }
    
    initializeGallery() {
        this.updateVisibleItems('all');
        this.addGalleryItemEvents();
        this.animateOnScroll();
    }
    
    addGalleryItemEvents() {
        this.galleryItems.forEach((item, index) => {
            const viewBtn = item.querySelector('.view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(item);
                });
            }
            
            // Also allow clicking on the image itself
            const img = item.querySelector('img');
            if (img) {
                img.addEventListener('click', () => {
                    this.openLightbox(item);
                });
            }
        });
    }
    
    handleFilterClick(clickedBtn) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        clickedBtn.classList.add('active');
        
        // Get filter value
        const filterValue = clickedBtn.getAttribute('data-filter');
        
        // Filter gallery items
        this.filterGallery(filterValue);
    }
    
    filterGallery(filter) {
        // Add fade-out effect
        this.galleryItems.forEach(item => {
            item.classList.add('fade-out');
        });
        
        // Wait for fade-out animation
        setTimeout(() => {
            this.galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('fade-out');
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
            
            this.updateVisibleItems(filter);
        }, 150);
        
        // Remove fade-in class after animation
        setTimeout(() => {
            this.galleryItems.forEach(item => {
                item.classList.remove('fade-in');
            });
        }, 450);
    }
    
    updateVisibleItems(filter) {
        this.visibleItems = Array.from(this.galleryItems).filter(item => {
            const category = item.getAttribute('data-category');
            return filter === 'all' || category === filter;
        });
    }
    
    openLightbox(galleryItem) {
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h3').textContent;
        const description = galleryItem.querySelector('p').textContent;
        
        this.lightboxImg.src = img.src.replace('w=500&h=400', 'w=1200&h=800');
        this.lightboxImg.alt = img.alt;
        this.lightboxTitle.textContent = title;
        this.lightboxDescription.textContent = description;
        
        // Find current index in visible items
        this.currentLightboxIndex = this.visibleItems.indexOf(galleryItem);
        
        this.lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    navigateLightbox(direction) {
        if (this.visibleItems.length === 0) return;
        
        this.currentLightboxIndex += direction;
        
        // Loop around
        if (this.currentLightboxIndex >= this.visibleItems.length) {
            this.currentLightboxIndex = 0;
        } else if (this.currentLightboxIndex < 0) {
            this.currentLightboxIndex = this.visibleItems.length - 1;
        }
        
        const currentItem = this.visibleItems[this.currentLightboxIndex];
        this.openLightbox(currentItem);
    }
    
    updateNavigationButtons() {
        if (this.visibleItems.length <= 1) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'flex';
            this.nextBtn.style.display = 'flex';
        }
    }
    
    animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.galleryItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Global functions for HTML onclick handlers
window.openLightbox = function(button) {
    const galleryItem = button.closest('.gallery-item');
    window.gallery.openLightbox(galleryItem);
};

window.closeLightbox = function() {
    window.gallery.closeLightbox();
};

window.navigateLightbox = function(direction) {
    window.gallery.navigateLightbox(direction);
};

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new EnvironmentGallery();
    
    // Add some extra interactive features
    initializeExtraFeatures();
});

function initializeExtraFeatures() {
    // Add image loading animation
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
    
    // Add stats counter animation
    animateStats();
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add lazy loading for better performance
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
}

function animateStats() {
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animationDelay = index * 0.2 + 's';
                        item.classList.add('animate-stat');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat-item {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.5s ease;
    }
    
    .stat-item.animate-stat {
        opacity: 1;
        transform: scale(1);
    }
    
    .gallery-item img.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .gallery-item img:not(.loaded) {
        opacity: 0.7;
    }
    
    /* Enhanced hover effects */
    .gallery-item:hover .overlay {
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    }
    
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .filter-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .filter-btn:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);

// Add environment awareness message
setTimeout(() => {
    console.log(`
    🌍 Environment Gallery loaded successfully!
    
    Did you know?
    • Every year, we lose about 18.7 million acres of forests
    • Renewable energy could power 90% of the world by 2050
    • Small actions like recycling and using less plastic make a big difference!
    
    Together, we can protect our beautiful planet! 🌱
    `);
}, 1000);
