// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Tab functionality
    initializeTabs();
    
    // Sidebar functionality
    initializeSidebar();
    
    // Filter functionality (placeholder)
    initializeFilters();
});

// Tab switching functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content section
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Add animation effect
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 50);
        });
    });
}

// Sidebar navigation functionality
function initializeSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add subtle animation
            this.style.transform = 'translateX(8px)';
            setTimeout(() => {
                this.style.transform = 'translateX(4px)';
            }, 200);
        });
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(2px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
}

// Filter functionality (placeholder - ready for future implementation)
function initializeFilters() {
    const timeframeFilter = document.getElementById('timeframe');
    const mediatypeFilter = document.getElementById('mediatype');
    
    timeframeFilter.addEventListener('change', function() {
        const selectedValue = this.value;
        console.log('Timeframe filter changed to:', selectedValue);
        // Add filter logic here in future implementation
        applyFilters();
    });
    
    mediatypeFilter.addEventListener('change', function() {
        const selectedValue = this.value;
        console.log('Media type filter changed to:', selectedValue);
        // Add filter logic here in future implementation
        applyFilters();
    });
}

// Placeholder function for applying filters
function applyFilters() {
    const timeframe = document.getElementById('timeframe').value;
    const mediaType = document.getElementById('mediatype').value;
    
    // This function is ready for future implementation
    // It would filter the visible cards based on the selected criteria
    console.log('Applying filters:', { timeframe, mediaType });
    
    // Add visual feedback for filter application
    const contentSections = document.querySelectorAll('.content-section.active');
    contentSections.forEach(section => {
        section.style.opacity = '0.7';
        setTimeout(() => {
            section.style.opacity = '1';
        }, 300);
    });
}

// Card hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // CTA button effects
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            // Placeholder for future functionality
            console.log('CTA button clicked:', this.textContent);
        });
    });
});

// Responsive behavior
function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        sidebar.style.width = '60px';
        mainContent.style.marginLeft = '60px';
    } else {
        sidebar.style.width = '80px';
        mainContent.style.marginLeft = '80px';
    }
}

// Listen for window resize
window.addEventListener('resize', handleResize);

// Smooth scrolling for better UX
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

// Add loading animation for images
function addImageLoadingEffects() {
    const images = document.querySelectorAll('.card-image');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 50);
        });
    });
}

// Initialize image effects when DOM is loaded
document.addEventListener('DOMContentLoaded', addImageLoadingEffects);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const currentActive = document.querySelector('.tab-btn.active');
    const currentIndex = Array.from(tabButtons).indexOf(currentActive);
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        let nextIndex;
        
        if (e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
        } else {
            nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
        }
        
        tabButtons[nextIndex].click();
        tabButtons[nextIndex].focus();
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('.tab-btn, .nav-item, .cta-btn, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #7BBDE8';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});