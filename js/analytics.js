// Google Analytics 4 Configuration
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID

// Initialize Google Analytics
function initAnalytics() {
    // Check if analytics is enabled (you can add a privacy setting)
    if (typeof gtag === 'undefined') {
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(script);
        
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

// Track page views
function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href
        });
    }
}

// Track button clicks
function trackButtonClick(buttonName, location) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'button',
            event_label: buttonName,
            custom_parameter_1: location
        });
    }
}

// Track form submissions
function trackFormSubmission(formName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'form',
            event_label: formName
        });
    }
}

// Track scroll depth
function trackScrollDepth() {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set();
    
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll', {
                            event_category: 'engagement',
                            event_label: `${threshold}%`,
                            value: threshold
                        });
                    }
                }
            });
        }
    });
}

// Track time on page
function trackTimeOnPage() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'time_on_page',
                value: timeOnPage
            });
        }
    });
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment the line below to enable Google Analytics
    // initAnalytics();
    
    // Track current page view
    trackPageView(document.title);
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track time on page
    trackTimeOnPage();
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buttonText = e.target.textContent.trim();
            const pageName = document.title;
            trackButtonClick(buttonText, pageName);
        });
    });
    
    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            const formName = form.querySelector('h2')?.textContent || 'contact_form';
            trackFormSubmission(formName);
        });
    });
});

// Export functions for manual tracking
window.analytics = {
    trackPageView,
    trackButtonClick,
    trackFormSubmission
};
