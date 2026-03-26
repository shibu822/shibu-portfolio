import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const auraRef = useRef(null);
    const requestRef = useRef();
    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const auraPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    useEffect(() => {
        const aura = auraRef.current;
        if (!aura) return;

        const handleMouseMove = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            aura.style.opacity = '1';
        };

        const animateAura = () => {
            auraPos.current.x += (mousePos.current.x - auraPos.current.x) * 0.15;
            auraPos.current.y += (mousePos.current.y - auraPos.current.y) * 0.15;
            
            aura.style.transform = `translate3d(${auraPos.current.x - 150}px, ${auraPos.current.y - 150}px, 0)`;
            
            requestRef.current = requestAnimationFrame(animateAura);
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(animateAura);

        // cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return <div className="cursor-aura" ref={auraRef}></div>;
};

export default CustomCursor;
