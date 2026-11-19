/**
 * SHIBU SHALOM B.P - PORTFOLIO INTERACTION ENGINE
 * - Theme Switcher (Dark/Light with localStorage persistence)
 * - Dynamic Typewriter Role Rotator
 * - Command Palette (Cmd + K / Ctrl + K) with keyboard navigation
 * - 3D Tilt Card & Spotlight Mouse Tracking
 * - Interactive Skills Search & Category Tabs
 * - Projects Showcase Filter & Quick-View Modal
 * - Interactive Resume Modal
 * - 1-Click Copy to Clipboard & Toast System
 * - Interactive Contact Form with Validation
 * - Scroll Progress Bar & Back to Top with SVG Progress Ring
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. THEME SWITCHER ==================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('shibu-portfolio-theme', theme);
    }

    // Initialize theme from storage or system preference
    const savedTheme = localStorage.getItem('shibu-portfolio-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            showToast(`Switched to ${nextTheme} mode`, 'info');
        });
    }

    /* ==================== 2. READING SCROLL PROGRESS ==================== */
    const progressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const progressRingCircle = document.querySelector('.progress-ring-circle');
    const ringCircumference = 2 * Math.PI * 21; // r=21 -> ~132px

    if (progressRingCircle) {
        progressRingCircle.style.strokeDasharray = `${ringCircumference} ${ringCircumference}`;
        progressRingCircle.style.strokeDashoffset = ringCircumference;
    }

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
        const progressPercent = Math.min(Math.max(progress * 100, 0), 100);

        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        // Circular progress on back-to-top button
        if (progressRingCircle) {
            const offset = ringCircumference - (progress * ringCircumference);
            progressRingCircle.style.strokeDashoffset = offset;
        }

        // Show/hide Back to Top
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==================== 3. CUSTOM CURSOR (DESKTOP) ==================== */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let isCursorVisible = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isCursorVisible) {
                isCursorVisible = true;
                cursorDot.style.opacity = '1';
                cursorRing.style.opacity = '1';
            }
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        // Smooth trailing ring loop
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Enlarge ring when hovering over clickable elements
        const hoverTargets = 'a, button, input, textarea, .spotlight-card, .skill-item';
        document.querySelectorAll(hoverTargets).forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
        });
    }

    /* ==================== 4. DYNAMIC HERO TYPEWRITER ==================== */
    const typewriterElement = document.getElementById('typewriterText');
    const roles = [
        'Full-Stack .NET Solutions',
        'Scalable ASP.NET Core APIs',
        'High-Performance Angular Apps',
        'Modern React Interfaces',
        'Normalized SQL Server Databases',
        'Enterprise Clean Architectures'
    ];

    if (typewriterElement) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 70;
        const deleteSpeed = 35;
        const pauseDelay = 1800;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeout = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                timeout = pauseDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                timeout = 400;
            }

            setTimeout(typeLoop, timeout);
        }
        typeLoop();
    }

    /* ==================== 5. SPOTLIGHT CARDS MOUSE TRACKING ==================== */
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ==================== 6. 3D TILT EFFECT ON PROFILE CARD ==================== */
    const tiltCard = document.getElementById('profileTiltCard');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    /* ==================== 7. NAVBAR SCROLL & ACTIVE LINK ==================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link detection
        let currentSectionId = '';
        sections.forEach((sec) => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking nav link
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==================== 8. SKILLS SEARCH & CATEGORY FILTER ==================== */
    const skillSearchInput = document.getElementById('skillSearchInput');
    const skillSearchClear = document.getElementById('skillSearchClear');
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillItems = document.querySelectorAll('.skill-item');

    let currentCategory = 'all';
    let searchQuery = '';

    function filterSkills() {
        skillItems.forEach((item) => {
            const category = item.getAttribute('data-category');
            const name = (item.getAttribute('data-name') || '').toLowerCase();
            const textContent = item.textContent.toLowerCase();

            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            const matchesSearch = !searchQuery || name.includes(searchQuery) || textContent.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    skillTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            skillTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-filter');
            filterSkills();
        });
    });

    if (skillSearchInput) {
        skillSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            if (skillSearchClear) {
                skillSearchClear.style.display = searchQuery ? 'block' : 'none';
            }
            filterSkills();
        });

        if (skillSearchClear) {
            skillSearchClear.addEventListener('click', () => {
                skillSearchInput.value = '';
                searchQuery = '';
                skillSearchClear.style.display = 'none';
                filterSkills();
                skillSearchInput.focus();
            });
        }
    }

    /* ==================== 9. PROJECTS FILTER & QUICK VIEW MODAL ==================== */
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Project Modal Data
    const projectDetails = {
        cms: {
            title: 'Clinic Management System (CMS)',
            tag: 'Healthcare • Full-Stack Enterprise Application',
            stack: ['ASP.NET Core Web API', 'C#', 'Entity Framework Core', 'SQL Server', 'Angular', 'Bootstrap 5', 'Postman'],
            summary: 'An end-to-end healthcare system engineered to streamline patient management, clinical records, doctor appointments, and billing operations.',
            features: [
                'Designed RESTful APIs using ASP.NET Core Web API implementing clean layered architecture (Controller → Service → Repository).',
                'Engineered code-first relational schema in Microsoft SQL Server using EF Core migrations with foreign-key referential integrity.',
                'Built appointment scheduling engine with slot-based booking logic preventing double-booking.',
                'Crafted reactive user interface in Angular with dynamic components and HttpClient API communication.',
                'Implemented automated billing logic and patient history reports with role-based access.'
            ],
            github: 'https://github.com/Ramalingamsj/ClinicManagementSystem',
            live: null
        },
        tourism: {
            title: 'Visit Kanyakumari Tourism Portal',
            tag: 'Travel & Hospitality • Interactive Web Portal',
            stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap 5', 'Vercel Deployment'],
            summary: 'A fast, visually engaging travel portal offering travelers interactive destination exploration, cultural history, regional guides, and local photography.',
            features: [
                'Designed and developed interactive destination cards with dynamic filtering for beaches, monuments, and sunrise/sunset viewpoints.',
                'Optimized web assets and images for high Core Web Vitals performance and instant page loads on mobile networks.',
                'Deployed globally via Vercel with HTTPS and edge CDN caching.',
                'Fully responsive across mobile, tablet, and widescreen desktop layouts.'
            ],
            github: 'https://github.com/shibu822/kanyakumari',
            live: 'https://shibu-portfolio-lake.vercel.app'
        },
        portfolio: {
            title: 'Interactive Developer Portfolio System',
            tag: 'Frontend Engineering • Interactive UI Experience',
            stack: ['React 19', 'Vite', 'HTML5 Canvas API', 'Modern CSS Glassmorphism', 'Command Palette'],
            summary: 'Modern, highly-interactive developer portfolio system featuring custom particle physics, 3D tilt effects, instant spotlight command search, and dark/light themes.',
            features: [
                'Engineered dynamic interactive particle constellation with mouse gravity and shockwave ripple physics.',
                'Built an Alfred/Spotlight-style command palette (Cmd + K) supporting instant fuzzy jump and actions.',
                'Created responsive glassmorphic cards with mouse-following radial spotlight glows.',
                'Implemented persistent dark/light theme switching and one-click copy toast notifications.'
            ],
            github: 'https://github.com/shibu822/shibu-portfolio',
            live: 'https://shibu-portfolio-lake.vercel.app'
        }
    };

    const projectModal = document.getElementById('projectModal');
    const projectModalContent = document.getElementById('projectModalContent');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    function openProjectModal(projectId) {
        const data = projectDetails[projectId];
        if (!data || !projectModal || !projectModalContent) return;

        const stackPills = data.stack.map((s) => `<span>${s}</span>`).join('');
        const featureItems = data.features.map((f) => `<li>${f}</li>`).join('');
        const liveBtn = data.live
            ? `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
            : '';
        const githubBtn = data.github
            ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-glass"><i class="fab fa-github"></i> View GitHub</a>`
            : '';

        projectModalContent.innerHTML = `
            <div class="modal-project-header">
                <span class="project-category-tag">${data.tag}</span>
                <h2 class="modal-project-title">${data.title}</h2>
                <div class="project-tech-pills mt-2">${stackPills}</div>
            </div>
            <p class="project-desc">${data.summary}</p>
            <h4 class="mt-3" style="font-size: 1.05rem; color: var(--text-primary);"><i class="fas fa-layer-group text-cyan"></i> Architecture & Key Highlights:</h4>
            <ul class="modal-feature-list">${featureItems}</ul>
            <div class="project-footer mt-4" style="border: none; padding-top: 1rem;">
                <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                    ${githubBtn}
                    ${liveBtn}
                </div>
            </div>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
    }

    document.querySelectorAll('.quick-view-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    /* ==================== 10. RESUME MODAL ==================== */
    const resumeModal = document.getElementById('resumeModal');
    const resumeModalBtn = document.getElementById('resumeModalBtn');
    const resumeCloseBtn = document.getElementById('resumeCloseBtn');

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('active');
        resumeModal.setAttribute('aria-hidden', 'false');
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('active');
        resumeModal.setAttribute('aria-hidden', 'true');
    }

    if (resumeModalBtn) {
        resumeModalBtn.addEventListener('click', openResumeModal);
    }
    if (resumeCloseBtn) {
        resumeCloseBtn.addEventListener('click', closeResumeModal);
    }
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    /* ==================== 11. COMMAND PALETTE (CMD + K) ==================== */
    const cmdModal = document.getElementById('cmdModal');
    const cmdPaletteTrigger = document.getElementById('cmdPaletteTrigger');
    const cmdSearchInput = document.getElementById('cmdSearchInput');
    const cmdResultsList = document.getElementById('cmdResultsList');

    function openCommandPalette() {
        if (!cmdModal) return;
        cmdModal.classList.add('active');
        cmdModal.setAttribute('aria-hidden', 'false');
        if (cmdSearchInput) {
            cmdSearchInput.value = '';
            filterCmdItems('');
            setTimeout(() => cmdSearchInput.focus(), 100);
        }
    }

    function closeCommandPalette() {
        if (!cmdModal) return;
        cmdModal.classList.remove('active');
        cmdModal.setAttribute('aria-hidden', 'true');
    }

    if (cmdPaletteTrigger) {
        cmdPaletteTrigger.addEventListener('click', openCommandPalette);
    }

    // Keyboard shortcut: Cmd + K or Ctrl + K
    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdModal && cmdModal.classList.contains('active')) {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
        } else if (e.key === 'Escape') {
            closeCommandPalette();
            closeProjectModal();
            closeResumeModal();
        }
    });

    if (cmdModal) {
        cmdModal.addEventListener('click', (e) => {
            if (e.target === cmdModal) closeCommandPalette();
        });
    }

    // Filter command items
    function filterCmdItems(query) {
        const q = query.toLowerCase().trim();
        const items = cmdResultsList.querySelectorAll('.cmd-item');
        let firstVisible = null;

        items.forEach((item) => {
            const text = item.textContent.toLowerCase();
            if (!q || text.includes(q)) {
                item.style.display = 'flex';
                if (!firstVisible) firstVisible = item;
            } else {
                item.style.display = 'none';
            }
        });

        items.forEach((i) => i.classList.remove('selected'));
        if (firstVisible) firstVisible.classList.add('selected');
    }

    if (cmdSearchInput) {
        cmdSearchInput.addEventListener('input', (e) => {
            filterCmdItems(e.target.value);
        });

        // Arrow navigation & enter
        cmdSearchInput.addEventListener('keydown', (e) => {
            const visibleItems = Array.from(cmdResultsList.querySelectorAll('.cmd-item')).filter(
                (i) => i.style.display !== 'none'
            );
            if (!visibleItems.length) return;

            const selectedIndex = visibleItems.findIndex((i) => i.classList.contains('selected'));

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (selectedIndex + 1) % visibleItems.length;
                visibleItems.forEach((i) => i.classList.remove('selected'));
                visibleItems[nextIndex].classList.add('selected');
                visibleItems[nextIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
                visibleItems.forEach((i) => i.classList.remove('selected'));
                visibleItems[prevIndex].classList.add('selected');
                visibleItems[prevIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0) {
                    executeCmdAction(visibleItems[selectedIndex]);
                }
            }
        });
    }

    // Execute command item action
    function executeCmdAction(item) {
        const action = item.getAttribute('data-action');
        const target = item.getAttribute('data-target');

        closeCommandPalette();

        if (action === 'nav' && target) {
            const targetEl = document.querySelector(target);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (action === 'theme') {
            if (themeToggleBtn) themeToggleBtn.click();
        } else if (action === 'copy-email') {
            copyToClipboard('shibushalommp@gmail.com', 'Email copied to clipboard!');
        } else if (action === 'resume') {
            openResumeModal();
        } else if (action === 'github') {
            window.open('https://github.com/shibu822', '_blank');
        } else if (action === 'linkedin') {
            window.open('https://www.linkedin.com/in/shibu-shalom-b07525325/', '_blank');
        }
    }

    cmdResultsList.querySelectorAll('.cmd-item').forEach((item) => {
        item.addEventListener('click', () => {
            executeCmdAction(item);
        });
    });

    /* ==================== 12. 1-CLICK COPY & TOAST NOTIFICATIONS ==================== */
    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle';

        toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    function copyToClipboard(text, successMsg) {
        navigator.clipboard.writeText(text).then(
            () => showToast(successMsg, 'success'),
            () => showToast('Failed to copy to clipboard', 'error')
        );
    }

    document.querySelectorAll('.copyable-card').forEach((card) => {
        card.addEventListener('click', () => {
            const text = card.getAttribute('data-copy');
            if (text) {
                const label = text.includes('@') ? 'Email copied to clipboard!' : 'Phone copied to clipboard!';
                copyToClipboard(text, label);
            }
        });
    });

    /* ==================== 13. INTERACTIVE CONTACT FORM ==================== */
    // Web3Forms Access Key: Emails are delivered directly to shibushalommp@gmail.com
    const WEB3FORMS_ACCESS_KEY = 'bc6429e2-0083-4e66-be5f-4ebeecc9a4aa';

    const contactForm = document.getElementById('contactForm');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    if (contactForm) {
        const nameInput = document.getElementById('senderName');
        const emailInput = document.getElementById('senderEmail');
        const subjectInput = document.getElementById('senderSubject');
        const messageInput = document.getElementById('senderMessage');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let isValid = true;

            // Reset errors
            ['nameError', 'emailError', 'subjectError', 'messageError'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.textContent = '';
            });

            // Validate Name
            if (!nameInput.value.trim()) {
                document.getElementById('nameError').textContent = 'Please enter your name.';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                document.getElementById('emailError').textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Validate Subject
            if (!subjectInput.value.trim()) {
                document.getElementById('subjectError').textContent = 'Please specify a subject.';
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                document.getElementById('messageError').textContent = 'Please enter your message.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                document.getElementById('messageError').textContent = 'Message should be at least 10 characters.';
                isValid = false;
            }

            if (!isValid) return;

            // If a Web3Forms Access Key is configured, send seamlessly via background API
            if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim() !== '') {
                const originalBtnHtml = formSubmitBtn.innerHTML;
                formSubmitBtn.disabled = true;
                formSubmitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Sending message...</span>';

                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            access_key: WEB3FORMS_ACCESS_KEY.trim(),
                            name: nameInput.value.trim(),
                            email: emailInput.value.trim(),
                            subject: subjectInput.value.trim(),
                            message: messageInput.value.trim(),
                            from_name: 'Shibu Portfolio Visitor'
                        })
                    });

                    const result = await response.json();

                    if (result.success) {
                        showToast('Message sent successfully! Shibu will reply to your email soon.', 'success');
                        contactForm.reset();
                    } else {
                        showToast(result.message || 'Error sending message. Falling back to email client...', 'error');
                        triggerMailtoFallback();
                    }
                } catch (error) {
                    showToast('Network error. Opening email client fallback...', 'error');
                    triggerMailtoFallback();
                } finally {
                    formSubmitBtn.disabled = false;
                    formSubmitBtn.innerHTML = originalBtnHtml;
                }
            } else {
                // Mailto fallback when key is not yet provided
                triggerMailtoFallback();
            }

            function triggerMailtoFallback() {
                const recipient = 'shibushalommp@gmail.com';
                const subject = encodeURIComponent(subjectInput.value.trim());
                const body = encodeURIComponent(
                    `Hello Shibu,\n\n${messageInput.value.trim()}\n\nFrom: ${nameInput.value.trim()} (${emailInput.value.trim()})`
                );
                const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

                showToast('Opening your email client to send message...', 'info');

                setTimeout(() => {
                    window.location.href = mailtoLink;
                    showToast('Thank you! Your message inquiry is ready to send.', 'success');
                    contactForm.reset();
                }, 600);
            }
        });
    }

    /* ==================== 14. INTERSECTION OBSERVER SCROLL REVEAL ==================== */
    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
});
