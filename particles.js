/**
 * Interactive Particle Constellation Background
 * Theme-aware, interactive with mouse hover & shockwave on click
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    let shockwaves = [];

    const mouse = {
        x: null,
        y: null,
        radius: 140
    };

    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Shockwave on click
    window.addEventListener('click', (e) => {
        shockwaves.push(new Shockwave(e.clientX, e.clientY));
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        }, 150);
    });

    // Check current theme
    function isDarkTheme() {
        return document.documentElement.getAttribute('data-theme') !== 'light';
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 1.8 + 0.8;
            this.baseRadius = this.radius;
        }

        update() {
            // Bounce on edges
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            this.x += this.vx;
            this.y += this.vy;

            // Mouse proximity interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    // Gentle repulsion
                    this.x -= Math.cos(angle) * force * 2.5;
                    this.y -= Math.sin(angle) * force * 2.5;
                    this.radius = this.baseRadius * 1.4;
                } else {
                    this.radius = this.baseRadius;
                }
            }

            // Shockwave interaction
            shockwaves.forEach((sw) => {
                const dx = this.x - sw.x;
                const dy = this.y - sw.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (Math.abs(dist - sw.currentRadius) < 25) {
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * 4;
                    this.y += Math.sin(angle) * 4;
                }
            });
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            if (isDarkTheme()) {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
            } else {
                ctx.fillStyle = 'rgba(2, 132, 199, 0.35)';
            }
            ctx.fill();
        }
    }

    class Shockwave {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.currentRadius = 0;
            this.maxRadius = 180;
            this.speed = 4.5;
            this.opacity = 0.6;
        }

        update() {
            this.currentRadius += this.speed;
            this.opacity = 0.6 * (1 - this.currentRadius / this.maxRadius);
        }

        draw() {
            if (this.opacity <= 0) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = isDarkTheme()
                ? `rgba(56, 189, 248, ${this.opacity})`
                : `rgba(2, 132, 199, ${this.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    function init() {
        particles = [];
        // Calculate appropriate count based on area (cap at 85 for smooth performance)
        const count = Math.min(Math.floor((width * height) / 16000), 85);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update & draw shockwaves
        for (let s = shockwaves.length - 1; s >= 0; s--) {
            shockwaves[s].update();
            shockwaves[s].draw();
            if (shockwaves[s].currentRadius >= shockwaves[s].maxRadius) {
                shockwaves.splice(s, 1);
            }
        }

        // Draw connective lines & update particles
        const dark = isDarkTheme();
        const maxDist = 110;

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect neighboring particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = dark
                        ? `rgba(99, 102, 241, ${alpha})`
                        : `rgba(148, 163, 184, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // Connect to mouse if within distance
            if (mouse.x !== null && mouse.y !== null) {
                const mdx = mouse.x - particles[i].x;
                const mdy = mouse.y - particles[i].y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mdist < mouse.radius) {
                    const mAlpha = (1 - mdist / mouse.radius) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = dark
                        ? `rgba(56, 189, 248, ${mAlpha})`
                        : `rgba(2, 132, 199, ${mAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();
});
