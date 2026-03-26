const Projects = () => {
    return (
        <section id="projects" className="projects section">
            <div className="container">
                <h2 className="section-title box-title fade-in-up">PROJECTS</h2>
                <div className="projects-grid">
                    <div className="project-card fade-in-up">
                        <div className="project-media">
                            <img src="assets/cms_mockup.png" alt="CMS Mockup" className="project-image" />
                            <div className="project-overlay">
                                <a href="https://github.com/Ramalingamsj/ClinicManagementSystem" target="_blank" rel="noreferrer" className="overlay-btn" title="View Source">
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                        <div className="project-content">
                            <h3>Clinic Management System (CMS)</h3>
                            <p className="tech-stack">ASP.NET Web API • C# • Entity Framework Core • SQL Server • Angular • Bootstrap</p>
                            <ul className="project-bullets">
                                <li>Developed a full-stack Clinic Management System to manage patients, doctors, appointments, and billing.</li>
                                <li>Designed RESTful APIs using ASP.NET Web API for core modules and business logic.</li>
                                <li>Implemented layered architecture (Controller → Service → Repository) for scalability and maintainability.</li>
                                <li>Used Entity Framework Core with code-first approach and designed normalized SQL Server database schema.</li>
                                <li>Built responsive frontend using Angular and Bootstrap with dynamic UI components.</li>
                                <li>Implemented CRUD operations and appointment scheduling with slot-based booking logic.</li>
                                <li>Integrated Angular frontend with backend APIs using HttpClient and routing modules.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="project-card fade-in-up" style={{ transitionDelay: '100ms' }}>
                        <div className="project-media">
                            <img src="assets/tourism_mockup.png" alt="Tourism Mockup" className="project-image" />
                            <div className="project-overlay">
                                <a href="https://github.com/shibu822/kanyakumari" target="_blank" rel="noreferrer" className="overlay-btn" title="View Source">
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                        <div className="project-content">
                            <h3>Visit Kanyakumari Tourism Website</h3>
                            <p className="tech-stack">HTML • CSS • JavaScript • Bootstrap</p>
                            <ul className="project-bullets">
                                <li>Developed a responsive tourism website using HTML, CSS, JavaScript, and Bootstrap.</li>
                                <li>Designed interactive sections including destinations, galleries, and travel guides.</li>
                                <li>Deployed on Vercel ensuring high performance and global accessibility.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
