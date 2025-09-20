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
    console.log('Found', statNumbers.length, 'stat numbers to animate');
    
    statNumbers.forEach((stat, index) => {
        const target = parseInt(stat.getAttribute('data-target'));
        console.log(`Animating stat ${index + 1}: 0 -> ${target}`);
        
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            
            stat.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
                console.log(`Animation complete for stat ${index + 1}: ${target}`);
            }
        }
        
        // Start animation with a small delay for each stat
        setTimeout(() => {
            requestAnimationFrame(updateNumber);
        }, index * 200); // 200ms delay between each stat
    });
}

// Intersection Observer removed - stats animate immediately on page load

// Mobile popup functions
function showMobilePopup() {
    const popup = document.getElementById('mobilePopup');
    if (popup) {
        popup.classList.add('show');
    }
}

function closeMobilePopup() {
    const popup = document.getElementById('mobilePopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Make functions global
window.showMobilePopup = showMobilePopup;
window.closeMobilePopup = closeMobilePopup;

// Show popup on mobile after 3 seconds
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, animating stats immediately...');
    
    // Animate stats immediately when page loads
    setTimeout(() => {
        console.log('Starting stats animation...');
        animateStats();
    }, 500); // Small delay to ensure page is fully loaded
    
    // Show mobile popup
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            showMobilePopup();
        }, 3000);
    }
    
    // Close popup when clicking on buttons
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
