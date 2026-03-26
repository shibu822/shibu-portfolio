import { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let particlesArray = [];
        let animationFrameId;

        let mouse = {
            x: null,
            y: null,
            radius: 120
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            update() {
                if (this.x > canvas.width || this.x < 0) this.vx = -this.vx;
                if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;

                this.x += this.vx;
                this.y += this.vy;

                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 - distance/(mouse.radius * 6.66)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                        ctx.closePath();
                        
                        // Mild attraction
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x += (dx / distance) * force * 0.8;
                        this.y += (dy / distance) * force * 0.8;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fill();
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 10000;
            if (numberOfParticles > 120) numberOfParticles = 120; // Cap
            
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                for (let j = i; j < particlesArray.length; j++) {
                    let dx = particlesArray[i].x - particlesArray[j].x;
                    let dy = particlesArray[i].y - particlesArray[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 - dist/1000})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-bg"></canvas>;
};

export default ParticleNetwork;
