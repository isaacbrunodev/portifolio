// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Fechar menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
            navLinks?.classList.remove('active');
            const spans = menuToggle?.querySelectorAll('span');
            spans?.forEach(span => span.classList.remove('active'));
        }
    });
});

// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear().toString();

// Animate statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section when it exists
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Mobile popup functions
function showMobilePopup() {
    const popup = document.getElementById('mobilePopup');
    if (popup) {
        popup.style.display = 'block';
    }
}

function closeMobilePopup() {
    const popup = document.getElementById('mobilePopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Show popup on mobile after 3 seconds
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            showMobilePopup();
        }, 3000);
    }
});

// Close popup when clicking on buttons
document.addEventListener('DOMContentLoaded', () => {
    const popupButtons = document.querySelectorAll('.mobile-popup-buttons .btn');
    popupButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeMobilePopup();
        });
    });
});
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
