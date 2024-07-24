import React, { forwardRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import "./DefaultTemplate.css";

const DefaultTemplateDisplay = forwardRef(({ data, isPreview }, ref) => {
    // Parse skills if they are in JSON string format
    const skills = Array.isArray(data.skills) ? data.skills : JSON.parse(data.skills || '[]');

    // Function to group skills by category
        const groupSkillsByCategory = (skills) => {
        return skills.reduce((acc, skill) => {
            const { category } = skill;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(skill.skill);
            return acc;
        }, {});
    };

    const groupedSkills = groupSkillsByCategory(skills);

    // Parse other data fields if they are in JSON string format
    const academicDetail = data.academic_detail ? JSON.parse(data.academic_detail) : [];
    const workExperience = data.work_experience ? JSON.parse(data.work_experience) : [];
    const projectLinks = data.project_links ? JSON.parse(data.project_links) : [];
    const certificates = data.certificates ? JSON.parse(data.certificates) : [];
    const achievements = data.achievements ? JSON.parse(data.achievements) : [];
    const responsibility = data.responsibility ? JSON.parse(data.responsibility) : [];

    return (
        <div className='fixed-container' >
            <div ref={ref} className="resume-container">
                <div className="header">
                    <h1><span id="name">{data.name}</span></h1>
                    <div className="contact-container">
                        {data.social_links && (
                            <div className="social-links">
                                {data.social_links.github && (
                                    <a href={data.social_links.github}>
                                        <FaGithub /> Github
                                    </a>
                                )}
                                
                                {data.social_links.linkedin && (
                                    <a href={data.social_links.linkedin}>
                                        <FaLinkedin /> LinkedIn
                                    </a>
                                )}
                            </div>
                        )}

                        
                        {(data.email || data.contact_no) && (
                            <div className='contact-info'>
                                {data.email && (
                                    <a href={`mailto:${data.email}`}>
                                        <FaEnvelope /> {data.email}
                                    </a>
                                )}
                                
                                {data.contact_no && (
                                    <a href={`tel:${data.contact_no}`}>
                                        <FaPhone /> {data.contact_no}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {workExperience.length > 0 && (
                    <section>
                        <p className='section-title'>Experience</p>
                        <div className='resumeSubHeadingListStart'>
                            {workExperience.map((exp, index) => (
                                <div key={index} className="exp-section">
                                    <div className="exp-header">
                                        <span className="exp-title">
                                            <strong>{exp.organisation_name}</strong> | <span className="exp-designation"><em>{exp.designation}</em></span>
                                        </span>
                                        <span className="dates">
                                            {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} –
                                            {exp.end_date === "Present" ? "Present" : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="exp-description">
                                        <small>{exp.description}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <p className='section-title'>Skills</p>
                        <ul className="skills-list">
                            {Object.keys(groupedSkills).map((category, index) => (
                                <li key={index}>
                                    <strong>{category}:</strong> <span>{groupedSkills[category].join(', ')}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {academicDetail.length > 0 && (
                    <section>
                        <p className='section-title'>Education</p>
                        {academicDetail.map((edu, index) => (
                            <div key={index} className="edu-subsection">
                              

                                <div className='left-section-details'>
                                    <h3 id="insti-name">{edu.institute_name}</h3>
                                    <p>{edu.degree} in {edu.specialization}</p>
                                </div>
                                <div className="edu-details">
                                    <p className="dates">{edu.year} - {edu.end_year}</p>
                                    <p className="edu-cgpa">CGPA: {edu.cgpa}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {projectLinks.length > 0 && (
                    <section>
                        <p className='section-title'>Projects</p>
                        <div className='resumeSubHeadingListStart'>
                            {projectLinks.map((project, index) => (
                                <div key={index} className="project-section">
                                
                                    <div id="project-header">
                                        <div className="project-title">
                                              <h3>{project.title}</h3>
                                        </div>
                                        <div className="dates">
                                            {new Date(project.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} –
                                            {new Date(project.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                    
                                    <div className="project-description">
                                        <p>{project.description}</p>
                                        {project.link_url && (
                                            <a href={project.link_url} target="_blank" rel="noopener noreferrer">Project Link</a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {certificates.length > 0 && (
                    <section>
                        <p className='section-title'>Certificates</p>
                        <div className='resumeSubHeadingListStart'>
                            {certificates.map((certificate, index) => (
                                <div key={index} className="certificate-section">
                                    <h3>
                                        <a href={certificate.certificate_url} target="_blank" rel="noopener noreferrer">
                                            {certificate.title}
                                        </a>
                                    </h3>
                                    <p className='responsibility-description'>{certificate.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

{achievements.length > 0 && (
    <section>
        <p className='section-title'>Achievements</p>
        <ul className="achievements-list">
            {achievements.map((achievement, index) => (
                <li key={index} className="achievement-section">
                    <p>{achievement.title}</p>
                </li>
            ))}
        </ul>
    </section>
)}


                {responsibility.length > 0 && (
                    <section>
                        <p className='section-title'>Position of Responsibility</p>
                        <div className='resumeSubHeadingListStart'>
                            {responsibility.map((responsibility, index) => (
                                <div key={index} className="responsibility-section">
                                    <div className="responsibility-header">
                                        <span className="responsibility-title">
                                            <strong>{responsibility.organisation_name}</strong> | <span className="responsibility-designation"><em>{responsibility.designation}</em></span>
                                        </span>
                                        <span className="dates">
                                            {new Date(responsibility.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} –
                                            {new Date(responsibility.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="responsibility-description">
                                        <small>{responsibility.description}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
});

export default DefaultTemplateDisplay;
