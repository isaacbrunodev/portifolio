// Performance optimization utilities

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'css/style.css',
        'css/animations.css',
        'js/main.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        
        if (resource.endsWith('.css')) {
            link.as = 'style';
        } else if (resource.endsWith('.js')) {
            link.as = 'script';
        }
        
        document.head.appendChild(link);
    });
}

// Optimize font loading
function optimizeFontLoading() {
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap';
    fontLink.as = 'style';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
    
    // Add font-display: swap to existing font link
    const existingFontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
    if (existingFontLink) {
        existingFontLink.media = 'print';
        existingFontLink.onload = function() {
            this.media = 'all';
        };
    }
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
function optimizeScrollEvents() {
    const scrollHandler = throttle(() => {
        // Add any scroll-based functionality here
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update header background opacity based on scroll
        const header = document.querySelector('.site-header');
        if (header) {
            const opacity = Math.min(scrollTop / 100, 1);
            header.style.backgroundColor = `rgba(15, 23, 42, ${0.95 + (opacity * 0.05)})`;
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
}

// Service Worker registration for caching
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    initLazyLoading();
    
    // Optimize font loading
    optimizeFontLoading();
    
    // Optimize scroll events
    optimizeScrollEvents();
    
    // Register service worker
    // registerServiceWorker(); // Uncomment if you have a service worker
});

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
                
                console.log('Performance Metrics:');
                console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
                console.log(`Page Load Time: ${loadTime}ms`);
                
                // Send to analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        name: 'page_load_time',
                        value: Math.round(loadTime)
                    });
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();
