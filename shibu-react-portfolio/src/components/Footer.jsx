import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Footer = () => {
    useScrollReveal();
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            setShowTopBtn(window.scrollY > 400);
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="contact" className="footer section pb-1">
            <div className="container">
                <h2 className="section-title text-center mb-5 box-title centered-box">CONTACT</h2>
                <p className="text-center mb-4 text-dark-grey fade-in-up">
                    Have a question or want to work together? Let's build something incredible.
                </p>

                <div className="contact-details fade-in-up">
                    <div className="contact-card">
                        <i className="fas fa-envelope"></i>
                        <h4>Email</h4>
                        <p><a href="mailto:shibushalommp@gmail.com" className="text-dark">shibushalommp@gmail.com</a></p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-phone-alt"></i>
                        <h4>Phone</h4>
                        <p><a href="tel:+918220078235" className="text-dark">+91 8220078235</a></p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h4>Location</h4>
                        <p>Nagercoil, Tamil Nadu</p>
                    </div>
                </div>
                
                <div className="footer-bottom mt-5 fade-in-up" style={{ transitionDelay: '100ms' }}>
                    <div className="social-links">
                        <a href="mailto:shibushalommp@gmail.com"><i className="fas fa-envelope"></i></a>
                        <a href="https://github.com/shibu822" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/shibu-shalom-b07525325/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <p className="copyright">© 2026 Shibu Shalom B.P. All rights reserved.</p>
                </div>
            </div>
            
            <button 
                className={`back-to-top ${showTopBtn ? 'visible' : ''}`} 
                aria-label="Back to Top" 
                onClick={scrollToTop}
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </footer>
    );
};

export default Footer;
