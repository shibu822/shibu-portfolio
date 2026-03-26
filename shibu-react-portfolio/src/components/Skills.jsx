import useScrollReveal from '../hooks/useScrollReveal';

const skillGroups = [
    {
        title: 'PROGRAMMING & CORE',
        delay: '0ms',
        skills: [
            { label: 'C#', iconClass: 'devicon-csharp-plain colored' },
            { label: 'JAVASCRIPT', iconClass: 'devicon-javascript-plain colored' },
            { label: 'TYPESCRIPT', iconClass: 'devicon-typescript-plain colored' },
            { label: 'HTML5', iconClass: 'devicon-html5-plain colored' },
            { label: 'CSS3', iconClass: 'devicon-css3-plain colored' },
            { label: 'SQL', iconClass: 'fas fa-database', iconColor: '#4b5563' },
            { label: 'OOP', iconClass: 'fas fa-cubes', iconColor: '#4b5563' },
        ],
    },
    {
        title: 'FRAMEWORKS & LIBRARIES',
        delay: '100ms',
        skills: [
            { label: 'ASP.NET CORE', iconClass: 'devicon-dotnetcore-plain colored' },
            { label: 'ANGULAR', iconClass: 'devicon-angularjs-plain colored' },
            { label: 'NODE.JS', iconClass: 'devicon-nodejs-plain colored' },
            { label: 'JQUERY', iconClass: 'devicon-jquery-plain colored' },
            { label: 'BOOTSTRAP', iconClass: 'devicon-bootstrap-plain colored' },
            { label: 'ADO.NET', iconClass: 'fas fa-plug', iconColor: '#4b5563' },
            { label: 'LINQ', iconClass: 'fas fa-code-branch', iconColor: '#4b5563' },
        ],
    },
    {
        title: 'DATABASES & TOOLS',
        delay: '200ms',
        skills: [
            { label: 'SQL SERVER', iconClass: 'devicon-microsoftsqlserver-plain colored' },
            { label: 'MYSQL', iconClass: 'devicon-mysql-plain colored' },
            { label: 'VISUAL STUDIO', iconClass: 'devicon-visualstudio-plain colored' },
            { label: 'VS CODE', iconClass: 'devicon-vscode-plain colored' },
            { label: 'GIT', iconClass: 'devicon-git-plain colored' },
            { label: 'GITHUB', iconClass: 'devicon-github-original colored' },
            { label: 'POSTMAN', iconClass: 'devicon-postman-plain colored' },
            { label: 'REST APIs', iconClass: 'fas fa-cloud', iconColor: '#4b5563' },
            { label: 'MVC ARCHITECTURE', iconClass: 'fas fa-layer-group', iconColor: '#4b5563' },
        ],
    },
];

const Skills = () => {
    useScrollReveal();

    return (
        <section id="skills" className="skills section">
            <div className="container">
                <h2 className="section-title text-center mb-5 box-title centered-box">SKILLS LOG</h2>
                <div className="skills-wrapper fade-in-up">
                    {skillGroups.map((group) => (
                        <div
                            key={group.title}
                            className="skill-category fade-in-up"
                            style={{ transitionDelay: group.delay }}
                        >
                            <h3 className="skill-title">{group.title}</h3>
                            <div className="skill-icon-grid">
                                {group.skills.map((skill) => (
                                    <div key={skill.label} className="skill-card">
                                        <div className="skill-logo" aria-hidden="true">
                                            <i
                                                className={skill.iconClass}
                                                style={skill.iconColor ? { color: skill.iconColor } : undefined}
                                            ></i>
                                        </div>
                                        <span>{skill.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
