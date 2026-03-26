import useScrollReveal from '../hooks/useScrollReveal';

const Services = () => {
    useScrollReveal();

    return (
        <section id="services" className="services section">
            <div className="container">
                <div className="services-grid">
                    <div className="service-card fade-in-up">
                        <i className="fas fa-laptop-code service-icon"></i>
                        <h3>FRONTEND</h3>
                        <p>Specialized in building responsive, dynamic user interfaces using <strong>Angular</strong>, HTML5, CSS3, and Bootstrap for seamless web experiences.</p>
                    </div>
                    <div className="service-card fade-in-up" style={{ transitionDelay: '100ms' }}>
                        <i className="fas fa-server service-icon"></i>
                        <h3>BACKEND</h3>
                        <p>Expertise in developing RESTful APIs and robust server-side architecture using <strong>ASP.NET Core Web API</strong> and C#.</p>
                    </div>
                    <div className="service-card fade-in-up" style={{ transitionDelay: '200ms' }}>
                        <i className="fas fa-database service-icon"></i>
                        <h3>DATABASES</h3>
                        <p>Experienced in designing normalized schemas and optimizing data access using <strong>SQL Server</strong> and Entity Framework Core.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
