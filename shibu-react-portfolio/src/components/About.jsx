import useScrollReveal from '../hooks/useScrollReveal';

const About = () => {
    useScrollReveal();

    return (
        <section id="about" className="about section">
            <div className="container">
                <h2 className="section-title box-title">ABOUT ME</h2>
                <div className="about-content fade-in-up mt-4">
                    <div className="about-image">
                        <img src="/img_4991.png" alt="Shibu Shalom B.P" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Profile+Pic' }} />
                    </div>
                    <div className="about-text">
                        <p>Enthusiastic full-stack developer with strong expertise in full-stack development using <strong>.NET</strong> and <strong>Angular</strong>. Skilled in building scalable, responsive, and user-centric applications.</p>
                        <p className="mt-2">Passionate about optimizing performance and solving real-world problems through technology. Looking forward to leveraging my knowledge of ASP.NET Core, SQL Server, and modern frontend frameworks to build excellent digital experiences.</p>
                        <ul className="about-stats mt-4">
                            <li><strong>Education:</strong> B.E. Computer Science, Rohini College</li>
                            <li><strong>Location:</strong> Kanyakumari, Tamil Nadu</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
