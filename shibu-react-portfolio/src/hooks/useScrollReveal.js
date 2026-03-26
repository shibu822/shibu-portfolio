import { useEffect } from 'react';

const useScrollReveal = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

export default useScrollReveal;
