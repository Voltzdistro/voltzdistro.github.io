// Voltzdistro Website JavaScript
// Minimal, performance-focused interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeScrollEffects();
    initializePerformanceOptimizations();
});

// Sidebar functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Smooth hover effects
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Subtle scroll effects for performance
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Subtle parallax effect for hero elements
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && scrolled < window.innerHeight) {
            heroTitle.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Only apply scroll effects on larger screens for performance
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Lazy load non-critical elements
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('.highlight-card, .access-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyElements.forEach(el => observer.observe(el));
    }
    
    // Optimize images loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Debounced resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-initialize responsive features if needed
            if (window.innerWidth <= 768) {
                // Mobile optimizations
                document.body.classList.add('mobile-view');
            } else {
                document.body.classList.remove('mobile-view');
            }
        }, 250);
    }, { passive: true });
}

// Utility functions
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Support arrow key navigation in sidebar
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const activeItem = document.querySelector('.nav-item:focus');
    
    if (activeItem && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const currentIndex = navItems.indexOf(activeItem);
        let nextIndex;
        
        if (e.key === 'ArrowUp') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
        } else {
            nextIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
        }
        
        navItems[nextIndex].focus();
    }
});

// Enhanced accessibility
function initializeAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = `2px solid var(--accent-primary)`;
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Export functions for potential external use
window.VoltzdistroUtils = {
    smoothScrollTo,
    initializeSidebar,
    initializeScrollEffects
}; 
function toggleDescription(header) {
  const thisCard = header.closest('.tool-card');
  const thisDesc = thisCard.querySelector('.tool-description');

  // Hide other cards' descriptions (optional, if you want only one open at a time)
  const allCards = document.querySelectorAll('.tool-card');
  allCards.forEach(card => {
    if (card !== thisCard) {
      card.classList.remove('expanded');
    }
  });

  // Toggle this card's expanded class
  thisCard.classList.toggle('expanded');
}
