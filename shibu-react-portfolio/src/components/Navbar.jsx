import { useEffect, useState } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <nav className="nav-menu">
                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#skills" className="nav-link text-white dynamic-text" onClick={closeMenu}>Skills</a></li>
                        <li><a href="#experience" className="nav-link text-white dynamic-text" onClick={closeMenu}>Experience</a></li>
                        <li><a href="#projects" className="nav-link text-white dynamic-text" onClick={closeMenu}>Projects</a></li>
                        <li><a href="#contact" className="btn-primary invert-btn dynamic-btn" onClick={closeMenu}>CONTACT ME</a></li>
                    </ul>
                </nav>
                <button className="menu-toggle dynamic-text" aria-label="Toggle Menu" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
