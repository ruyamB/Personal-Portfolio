/**
 * RUYAM BHATTACHARJEE - PORTFOLIO INTERACTION ENGINE (2026)
 * Sleek, high-performance, print-inspired interaction routines.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Modules
    initSystemLoader();
    initThemeManager();
    initMobileNavigation();
    initScrollHeader();
    initScrollReveal();
    initRetroComputerEasterEgg();
    initContactFormHandler();
    initCustomCursor();
    initDraggableOrnaments();
    initDockNavigation();
    updateFooterYear();
});

/**
 * MODULE: Theme Manager (Light Ivory <-> Retro Terminal Dark)
 */
function initThemeManager() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Check cached theme preference or systems preference
    const savedTheme = localStorage.getItem('ruyam-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set default theme state
    let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle click trigger
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('matrix-override')) {
            document.body.classList.remove('matrix-override');
            return;
        }
        currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('ruyam-theme', currentTheme);
        
        // Trigger computer screen flash sync on theme change
        triggerComputerScreenFlicker();
    });
}

/**
 * MODULE: Mobile Menu Navigation Drawer Toggle
 */
function initMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    // Toggle menu state
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * MODULE: Scroll Header Effects (Active Border Transition)
 */
function initScrollHeader() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    if (!header) return;

    const handleScroll = () => {
        // Sticky Header scroll styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial call
}

/**
 * MODULE: High-Performance Scroll Intersection Observer
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once animated to save system loops
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

/**
 * MODULE: Retro Computer Easter Egg Interaction
 */
function initRetroComputerEasterEgg() {
    const pcIllustration = document.getElementById('retro-pc');
    if (!pcIllustration) return;

    pcIllustration.addEventListener('click', () => {
        triggerComputerScreenFlicker();
    });
}

function triggerComputerScreenFlicker() {
    const screen = document.querySelector('.glowing-screen');
    const sparkles = document.querySelector('.pc-sparkles');
    
    if (!screen) return;

    // Flicker animations classes
    screen.style.transition = 'none';
    screen.style.fill = '#ffffff';
    
    if (sparkles) {
        sparkles.style.transform = 'scale(1.25)';
        sparkles.style.transition = 'transform 0.1s ease';
    }

    // Dynamic flickering sequences
    setTimeout(() => {
        screen.style.fill = '#f1b025';
        if (sparkles) sparkles.style.transform = 'scale(1)';
        
        setTimeout(() => {
            screen.style.fill = '#ffffff';
            setTimeout(() => {
                screen.style.fill = '#f1b025';
                screen.style.transition = 'fill 0.5s ease';
            }, 80);
        }, 60);
    }, 100);
}

/**
 * MODULE: Contact Inquiry Form Handler (Tactile Feedback Validation)
 */
function initContactFormHandler() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const statusMsg = document.getElementById('form-status');

    if (!form || !submitBtn || !statusMsg) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Input Data
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        // High Contrast Validation Check
        if (!name || !email || !message) {
            showStatus('ALL FIELDS ARE REQUIRED FOR SUBMISSION.', 'error');
            return;
        }

        // Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('PLEASE PROVIDE A VALID EMAIL ADDRESS SCHEMA.', 'error');
            return;
        }

        // Set Loading state
        submitBtn.disabled = true;
        const origBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>TRANSMITTING...</span>';

        // Simulate secure database routing transmission (1.2s latency)
        setTimeout(() => {
            showStatus('CONNECTION SECURED. YOUR INQUIRY WAS TRANSMITTED SUCCESSFULLY!', 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnHtml;
        }, 1200);
    });

    function showStatus(text, type) {
        statusMsg.innerText = text;
        statusMsg.className = 'form-status-msg'; // Clear old states
        statusMsg.classList.add(type);
        
        // Auto dismiss errors after 5 seconds to keep view clean
        if (type === 'error') {
            setTimeout(() => {
                if (statusMsg.classList.contains('error')) {
                    statusMsg.innerText = '';
                    statusMsg.classList.remove('error');
                }
            }, 5000);
        }
    }
}

/**
 * UTILS: Update copyright year
 */
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
}

/**
 * MODULE: System Diagnostics Boot Loader
 */
function initSystemLoader() {
    const loader = document.getElementById('system-loader');
    const percentEl = document.getElementById('loader-percent');
    const fillEl = document.getElementById('loader-bar-fill');
    const screenEl = document.getElementById('loader-terminal-screen');
    
    if (!loader || !percentEl || !fillEl || !screenEl) return;

    const logs = [
        "> INITIALIZING CPU CORE REGISTERS...",
        "> INTEL RETRO AG-AI COPROCESSOR INTERFACE: RUNNING",
        "> BASE MEMORY DECK CONFIG: 640KB BASE OK",
        "> SYNCHRONIZING COLOR GRAPHICS ADAPTERS... OK",
        "> DETECTING SYSTEM DATA STORAGE SECTORS...",
        "> LOCAL MOUNT SECTOR: 0xDEADBEEF MOUNTED",
        "> MOUNTING FLOPPY DRIVE SYSTEM SECTORS... OK",
        "> INITIALIZING TACTILE RETRO PORTFOLIO INSTANCES... SUCCESS"
    ];

    let progress = 0;
    let logIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.classList.add('loaded');
                // Sync screen visual flicker on completion
                triggerComputerScreenFlicker();
            }, 600);
        }
        
        percentEl.innerText = `${progress}%`;
        fillEl.style.width = `${progress}%`;
        
        const expectedLogs = Math.floor((progress / 100) * logs.length);
        while (logIndex < expectedLogs && logIndex < logs.length) {
            const row = document.createElement('div');
            row.className = 'loader-log-row';
            row.innerText = logs[logIndex];
            screenEl.appendChild(row);
            logIndex++;
            screenEl.scrollTop = screenEl.scrollHeight;
        }
    }, 90);
}



/**
 * MODULE: Custom CAD Crosshair Vector Cursor
 */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    document.body.classList.add('custom-cursor-active');

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        const damp = 0.08;
        posX += (mouseX - posX) * damp;
        posY += (mouseY - posY) * damp;

        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"], #retro-pc, .retro-floppy-disk');
    
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    window.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    window.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
}

/**
 * MODULE: Draggable Tactile Canvas Ornaments
 */
function initDraggableOrnaments() {
    const draggables = [
        document.getElementById('retro-pc'),
        document.querySelector('.retro-floppy-disk')
    ];

    draggables.forEach(el => {
        if (!el) return;

        let active = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;
        let xOffset = 0;
        let yOffset = 0;

        el.addEventListener('mouseenter', () => {
            const cur = document.getElementById('custom-cursor');
            if (cur) cur.classList.add('hovering');
        });

        const dragStart = (e) => {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target.closest('#retro-pc') || e.target.closest('.retro-floppy-disk')) {
                active = true;
                el.style.transition = 'none';
                el.style.zIndex = '99';
            }
        };

        const dragEnd = () => {
            if (active) {
                if (el.id === 'retro-pc') {
                    const themeToggle = document.getElementById('theme-toggle');
                    if (themeToggle) {
                        const pcRect = el.getBoundingClientRect();
                        const toggleRect = themeToggle.getBoundingClientRect();

                        const isOverlapping = !(
                            pcRect.right < toggleRect.left ||
                            pcRect.left > toggleRect.right ||
                            pcRect.bottom < toggleRect.top ||
                            pcRect.top > toggleRect.bottom
                        );

                        if (isOverlapping) {
                            currentX = 0;
                            currentY = 0;
                            xOffset = 0;
                            yOffset = 0;
                            initialX = 0;
                            initialY = 0;
                            el.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                            el.style.transform = 'translate3d(0px, 0px, 0px)';

                            triggerMatrixOverrideEasterEgg();

                            active = false;
                            return;
                        }
                    }
                }
            }
            initialX = currentX;
            initialY = currentY;
            active = false;
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        };

        const drag = (e) => {
            if (!active) return;
            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        };

        el.addEventListener('mousedown', dragStart);
        el.addEventListener('touchstart', dragStart, { passive: true });

        window.addEventListener('mouseup', dragEnd);
        window.addEventListener('touchend', dragEnd);

        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag, { passive: false });
    });
}

/**
 * MODULE: Secret Easter Egg - Matrix Override Action
 */
function triggerMatrixOverrideEasterEgg() {
    document.body.classList.toggle('matrix-override');
    triggerComputerScreenFlicker();
}

/**
 * MODULE: Navigation Dock Section Anchoring
 */
function initDockNavigation() {
    const allAnchors = document.querySelectorAll('a[href^="#"]');
    const dockLinks = document.querySelectorAll('.social-dock .dock-item[href^="#"]');

    // Smooth scroll navigation anchors
    allAnchors.forEach(link => {
        link.addEventListener('click', (e) => {
            const anchor = link.getAttribute('href'); // e.g. '#about'
            const targetEl = document.querySelector(anchor);
            
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const highlightDock = () => {
        let currentSectionId = '';
        const scrollSections = document.querySelectorAll('section');
        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        dockLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightDock);
    highlightDock();
}


