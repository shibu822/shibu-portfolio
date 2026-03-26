import useScrollReveal from '../hooks/useScrollReveal';

const Hero = () => {
    useScrollReveal();

    return (
        <section id="hero" className="hero-split-section">
            <div className="hero-bg-dark"></div>
            <div className="hero-content-split">
                <div className="hero-left fade-in-up">
                    <p className="hero-intro fw-bold text-dark">Hi, I am</p>
                    <h1 className="hero-title-large">Shibu Shalom</h1>
                    <h2 className="hero-subtitle text-dark-grey mb-4">full-stack developer</h2>
                    <div className="hero-about-text fade-in-up" style={{ transitionDelay: '300ms', maxWidth: '600px', color: 'var(--dark-grey)', lineHeight: 1.6, fontSize: '1rem' }}>
                        <p className="mb-3">Hello! I'm Shibu Shalom, a passionate Developer with expertise in the .NET ecosystem and modern frontend frameworks like React and Angular. I thrive on building scalable, user-centric web applications.</p>
                        <p>With a strong foundation in backend architecture and database design, combined with a keen eye for frontend aesthetics, I bring a holistic approach to software development.</p>
                    </div>
                    <div className="social-links-square mt-4">
                        <a href="mailto:shibushalommp@gmail.com" aria-label="Email"><i className="fas fa-at"></i></a>
                        <a href="https://github.com/shibu822" aria-label="GitHub" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/shibu-shalom-b07525325/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="hero-right fade-in-up" style={{ transitionDelay: '200ms' }}>
                    <img src="/profile.jpg" alt="Shibu" className="hero-profile-img" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
