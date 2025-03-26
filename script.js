// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Course card hover effect
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Problem card click handler
const problemCards = document.querySelectorAll('.problem-card button');
problemCards.forEach(button => {
    button.addEventListener('click', () => {
        alert('Problem solving feature coming soon!');
    });
});

// Course enrollment handler
const courseButtons = document.querySelectorAll('.course-card button');
courseButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Course enrollment feature coming soon!');
    });
});

// Login button handler
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', () => {
    alert('Login feature coming soon!');
});

// CTA button handler
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    document.querySelector('#courses').scrollIntoView({
        behavior: 'smooth'
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.course-card, .topic-section, .roadmap-step, .problem-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation setup
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.course-card, .topic-section, .roadmap-step, .problem-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    navbar.insertBefore(menuButton, navLinks);
    
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
};

// Initialize mobile menu
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .nav-links.active {
            display: flex;
        }
        
        .nav-links li {
            margin: 0.5rem 0;
        }
    }
`;

document.head.appendChild(style); 