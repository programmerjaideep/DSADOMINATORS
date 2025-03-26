// Search functionality
const searchInput = document.querySelector('.search-box input');
const sidebarLinks = document.querySelectorAll('.sidebar-content a');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    sidebarLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    });
});

// Smooth scrolling for anchor links
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

// Code highlighting
document.addEventListener('DOMContentLoaded', () => {
    Prism.highlightAll();
});

// Active section highlighting
const sections = document.querySelectorAll('.doc-section');
const sidebarItems = document.querySelectorAll('.sidebar-content a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    sidebarItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        sidebar.style.display = 'none';
        mainContent.style.marginLeft = '0';
        
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', () => {
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        });
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Add copy button to code blocks
document.querySelectorAll('.code-example pre code').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '<i class="fas fa-copy"></i>';
    block.parentNode.appendChild(button);
    
    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(block.textContent);
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
}); 