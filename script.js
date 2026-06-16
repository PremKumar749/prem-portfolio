// ===== Space Portfolio - Main Script =====

document.addEventListener('DOMContentLoaded', () => {
    initStarsCanvas();
    initParticles();
    initShootingStars();
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initCountUp();
    initContactForm();
});

// ===== Stars Canvas Background =====
function initStarsCanvas() {
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars();
    }

    function createStars() {
        stars = [];
        const numStars = Math.floor((canvas.width * canvas.height) / 3000);
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.3,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2,
                color: getStarColor(),
                dx: (Math.random() - 0.5) * 0.05,
                dy: (Math.random() - 0.5) * 0.05
            });
        }
    }

    function getStarColor() {
        const colors = [
            '200, 200, 255',  // Blue-white
            '255, 240, 220',  // Warm white
            '180, 200, 255',  // Blue
            '255, 220, 180',  // Yellow-white
            '160, 180, 255',  // Deep blue
            '108, 99, 255',   // Accent primary
            '0, 212, 255',    // Accent secondary
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function drawStars(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw nebula clouds
        drawNebula(ctx, canvas);

        stars.forEach(star => {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.4 + 0.6;
            const alpha = star.opacity * twinkle;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
            ctx.fill();

            // Glow for larger stars
            if (star.radius > 1) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.radius * 3
                );
                gradient.addColorStop(0, `rgba(${star.color}, ${alpha * 0.3})`);
                gradient.addColorStop(1, `rgba(${star.color}, 0)`);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Slow drift
            star.x += star.dx;
            star.y += star.dy;

            // Wrap around
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
        });

        animationId = requestAnimationFrame(drawStars);
    }

    function drawNebula(ctx, canvas) {
        // Subtle nebula glow patches
        const nebulaPatches = [
            { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 200, color: '108, 99, 255' },
            { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 250, color: '0, 212, 255' },
            { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 180, color: '255, 107, 157' },
        ];

        nebulaPatches.forEach(patch => {
            const gradient = ctx.createRadialGradient(
                patch.x, patch.y, 0,
                patch.x, patch.y, patch.r
            );
            gradient.addColorStop(0, `rgba(${patch.color}, 0.03)`);
            gradient.addColorStop(0.5, `rgba(${patch.color}, 0.015)`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }

    window.addEventListener('resize', resize);
    resize();
    drawStars(0);
}

// ===== Floating Particles =====
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const colors = [
            'rgba(108, 99, 255, 0.4)',
            'rgba(0, 212, 255, 0.3)',
            'rgba(255, 107, 157, 0.3)',
            'rgba(74, 222, 128, 0.3)'
        ];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 20 + 15}s;
            animation-delay: ${Math.random() * 10}s;
        `;

        container.appendChild(particle);
    }
}

// ===== Shooting Stars =====
function initShootingStars() {
    function createShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');

        const startX = Math.random() * window.innerWidth * 0.5;
        const startY = Math.random() * window.innerHeight * 0.4;
        const duration = Math.random() * 1 + 0.5;

        star.style.cssText = `
            left: ${startX}px;
            top: ${startY}px;
            animation-duration: ${duration}s;
            width: ${Math.random() * 80 + 50}px;
        `;

        document.body.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // Random shooting stars
    setInterval(() => {
        if (Math.random() > 0.6) {
            createShootingStar();
        }
    }, 3000);
}

// ===== Navigation =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link update
        const sections = document.querySelectorAll('.section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ===== Typewriter Effect =====
function initTypewriter() {
    const element = document.getElementById('typewriter');
    const texts = [
        'Full Stack Developer',
        'Java Developer',
        'Web Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));

                // Trigger score bar fills
                const scoreFills = entry.target.querySelectorAll('.score-fill');
                scoreFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, parseInt(delay) + 300);
                });

                // Trigger skill bar fills
                const skillFills = entry.target.querySelectorAll('.skill-bar-fill');
                skillFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, parseInt(delay) + 300);
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));

    // Also observe score bars and skill bars directly
    const barContainers = document.querySelectorAll('.timeline-card, .skill-bars-section');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.score-fill, .skill-bar-fill');
                fills.forEach((fill, i) => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, i * 200 + 500);
                });
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    barContainers.forEach(el => barObserver.observe(el));
}

// ===== Count Up Animation =====
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();
                const isFloat = !Number.isInteger(target);

                function update(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const current = target * easeProgress;

                    el.textContent = isFloat ? current.toFixed(2) : Math.floor(current);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = isFloat ? target.toFixed(2) : target;
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Button animation
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
        `;
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Simulate send
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span>Message Sent! ✓</span>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
            submitBtn.style.opacity = '1';

            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = `
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                `;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2500);
        }, 1500);
    });
}

// ===== Parallax on Mouse Move (Hero Only) =====
document.addEventListener('mousemove', (e) => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    const profileFrame = document.querySelector('.profile-frame');
    const orbits = document.querySelector('.image-orbit');

    if (profileFrame) {
        profileFrame.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    }
    if (orbits) {
        orbits.style.transform += ` translate(${x * -5}px, ${y * -5}px)`;
    }
});

// ===== Smooth reveal for section backgrounds =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const maxDistance = window.innerHeight;
        const opacity = Math.max(0, 1 - distance / maxDistance);

        section.style.setProperty('--section-opacity', opacity);
    });
});
