const Experience = () => {
    return (
        <section id="experience" className="experience section">
            <div className="container">
                <h2 className="section-title box-title fade-in-up">EXPERIENCE & CERTIFICATIONS</h2>
                <div className="timeline-wrapper">
                    <div className="timeline-item fade-in-up">
                        <h4>.NET Full Stack Developer Intern</h4>
                        <h5>Faith Infotech, Technopark <span className="timeline-date">Sep 2025 – Mar 2026</span></h5>
                        <ul className="project-bullets">
                            <li>Developed scalable web modules using ASP.NET Core MVC and SQL Server.</li>
                            <li>Implemented CRUD operations using repository and service layers.</li>
                        </ul>
                    </div>
                    
                    <div className="timeline-item fade-in-up">
                        <h4>Frontend Developer Training</h4>
                        <h5>Pantech E-Learning, Chennai <span className="timeline-date">Jun 2023</span></h5>
                        <ul className="project-bullets">
                            <li>Developed responsive web pages using HTML and CSS.</li>
                            <li>Gained practical exposure to frontend development and UI structuring.</li>
                        </ul>
                    </div>

                    <div className="timeline-item fade-in-up">
                        <h4>Figma – Ui/UX Design</h4>
                        <h5>Udemy Certification Course</h5>
                        <ul className="project-bullets">
                            <li>Mobile and Web Design, UI/UX Design, HTML, CSS.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
