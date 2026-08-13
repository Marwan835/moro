/* ==========================================================================
   1. Intro Screen Handler & Progress Bar (Fixed)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.loader-progress');
    const introScreen = document.getElementById('intro-screen');
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += 10;
        if (progressBar) progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(loadingInterval);
            hideIntroScreen();
        }
    }, 30);

    // حماية إضافية: إخفاء الشاشة تلقائياً بعد 1.5 ثانية مهما حدث
    setTimeout(hideIntroScreen, 1500);

    function hideIntroScreen() {
        if (introScreen && introScreen.style.opacity !== '0') {
            introScreen.style.opacity = '0';
            introScreen.style.visibility = 'hidden';
            initTypingEffect();
        }
    }
});

/* ==========================================================================
   2. Typing Animation Effect
   ========================================================================== */
const professions = [
    "Frontend Developer & UI/UX Designer",
    "Social Media Strategist",
    "Creative Ad Content Creator",
    "Factory System Operations Specialist"
];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = professions[professionIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        speed = 400;
    }

    setTimeout(initTypingEffect, speed);
}

/* ==========================================================================
   3. Interactive Particle Canvas Background
   ========================================================================== */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = '#00c6ff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const isMobile = window.innerWidth < 768;
        const numberOfParticles = Math.min(90, Math.floor((canvas.width * canvas.height) / (isMobile ? 28000 : 18000)));
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}

/* ==========================================================================
   4. Scroll Reveal Animations
   ========================================================================== */
const revealElements = document.querySelectorAll(
    '.service-card, .portfolio-card, .cert-card, .contact-card, .about-wrapper'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==========================================================================
   5. Header Scroll & Navigation
   ========================================================================== */
const header = document.querySelector('.main-header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

/* ==========================================================================
   6. Mouse Hover Glow Effects
   ========================================================================== */
const tiltCards = document.querySelectorAll('.service-card, .portfolio-card, .contact-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 198, 255, 0.12), #0f172a 75%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

/* ==========================================================================
   7. Back To Top
   ========================================================================== */
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   8. Mobile Navigation
   ========================================================================== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        navToggle.innerHTML = `<i class="fas fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

/* ==========================================================================
   9. Project Case Study Modal
   ========================================================================== */
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const projectButtons = document.querySelectorAll('.project-btn');

const projectDescriptions = {
    'Sukina Brand Store': 'A focused e-commerce concept for a prayer-dress brand, designed around a clear product presentation, smooth navigation, and a modern shopping experience.',
    'Interactive Restaurant Portal': 'A restaurant interface concept with a digital menu, highlighted daily specials, and a direct path toward ordering and customer contact.',
    'Vivani Apparel Factory System': 'An operations-focused concept for organizing garment production tracking and streamlining workflows across departments.'
};

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const project = button.dataset.project;
        if (!projectModal || !modalTitle || !modalDescription) return;
        modalTitle.textContent = project;
        modalDescription.textContent = projectDescriptions[project] || 'Project details coming soon.';
        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

projectModal?.querySelectorAll('[data-close-modal]').forEach(element => {
    element.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeProjectModal();
});
