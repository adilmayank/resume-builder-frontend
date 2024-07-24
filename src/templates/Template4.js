import React, { forwardRef } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaTags, FaGraduationCap, FaBriefcase, FaCertificate, FaLink, FaGithub, FaLinkedin, FaTrophy } from 'react-icons/fa';
import './Template4.css';

// Profile picture URL hhh
const profileImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPZrKmaxmMuJH5nA2futuzfHFA2766g7Axmg&s';

const Template4 = forwardRef(({ data, isPreview }, ref) => {

  // Parse JSON fields if they are strings
  const academicDetail = typeof data.academic_detail === 'string' ? JSON.parse(data.academic_detail) : [];
  const workExperience = typeof data.work_experience === 'string' ? JSON.parse(data.work_experience) : [];
  const projectLinks = typeof data.project_links === 'string' ? JSON.parse(data.project_links) : [];
  const certificates = typeof data.certificates === 'string' ? JSON.parse(data.certificates) : [];
  const achievements = typeof data.achievements === 'string' ? JSON.parse(data.achievements) : [];
  const skills = Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? JSON.parse(data.skills) : []);
   const socialLinks = typeof data.social_links === 'string' ? JSON.parse(data.social_links) : {};

  
  return (
    <div ref={ref} id="resume-page">
      <div id="sidebar">
        {data.avatar && data.avatar.length > 0 && (
          <div id="imageCircle">
            <img src={data.avatar} alt="Profile" />
          </div>
        )}
        <div id="nameDetails">
          <div id="name-t4">
            <span>{data.name}</span>
          </div>
          <hr className="divider" />
          {data.resume_title && data.resume_title.length > 0 && (
            <div id="profile">
              <span>{data.resume_title}</span>
            </div>
          )}
        </div>
        {(socialLinks.github || socialLinks.linkedin || data.email || data.contact_no) && (
          <div id="contact">
            {data.contact_no && (
              <div className="phone">
                <a className='sidebar-link' href={`tel:${data.contact_no}`}>
                  <FaPhone className="icon" /> <span>{data.contact_no}</span>
                </a>
              </div>
            )}
            {data.email && (
              <div className="email">
                <a className='sidebar-link' href={`mailto:${data.email}`}>
                  <FaEnvelope className="icon" />
                  <span id="email-t4">{data.email}</span>
                </a>
              </div>
            )}
           {data.social_links.github && (
  <div className="sidebar-link">
    <a href={data.social_links.github}>
      <FaGithub className="icon" /> Github                    
    </a>
  </div>
)}

{ data.social_links.linkedin &&(
  <div className="sidebar-link">
    <a href={data.social_links.linkedin}>
      <FaLinkedin className="icon" /> LinkedIn
    </a>
  </div>
)}


          </div>
        )}
        {data.summary && data.summary.length > 0 && (
          <div id="profileOverview">
            <FaUser className="icon" />
            <span>About Me</span>
            <p>{data.summary}</p>
          </div>
        )}
        {achievements.length > 0 && (
          <div id="Achievements">
            <FaTrophy className='icon' />
            <span>Achievements</span>
            <ul className="achievements-list-t4">
              {achievements.map((achievement, index) => (
                <li key={index} className="achievement-section-t4">
                  <p>{achievement.title}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {skills.length > 0 && (
          <div id="skillSet">
            <FaTags className="icon" />
            <span> Skills</span>
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <li key={index}>{skill.skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div id="mbody">
        {academicDetail.length > 0 && (
          <div className="education">
            <div className="title">
              <FaGraduationCap className="icon" />
              <span>Education</span>
            </div>
            <div className="timeline">
              <div className="line"></div>
              {academicDetail.map((detail, index) => (
                <div className="eduDetails" key={index}>
                  <div className="eduTitle">
                    <div className="circle"></div>
                    <ul>
                      {detail.degree && detail.degree.length > 0 && (
                        <li className='child-1'><span className='degree'>{detail.degree}</span></li>
                      )}
                      {detail.specialization && detail.specialization.length > 0 && (
                        <li className='child-2'><span>Specialization: {detail.specialization}</span></li>
                      )}
                      {detail.institute_name && detail.institute_name.length > 0 && (
                        <li className='child-3'><span>{detail.institute_name}</span></li>
                      )}
                      {(detail.year != null || detail.end_year != null || detail.percentage != null) && (
                        <li>
                          <span className='tenure'>{detail.year} - {detail.end_year} | {detail.percentage}{detail.percentage != null && (<span>%</span>)}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {workExperience.length > 0 && (
          <div className="education experience">
            <div className="title">
              <FaBriefcase className="icon" />
              <span>Experience</span>
            </div>
            <div className="timeline">
              <div className="line"></div>
              {workExperience.map((experience, index) => (
                <div className="eduDetails" key={index}>
                  <div className="eduTitle">
                    <div className="circle"></div>
                    <ul>
                      {experience.organisation_name && experience.organisation_name.length > 0 && (
                        <li className='child-1'><span>{experience.organisation_name}</span></li>
                      )}
                      {experience.designation && experience.designation.length > 0 && (
                        <li className='child-2'><span>{experience.designation}</span></li>
                      )}
                      {(experience.start_date || experience.end_date) && (
  <li>
    <span className='tenure'>
      <strong>{experience.start_date && new Date(experience.start_date).toLocaleString('en-US', { month: 'short', year: 'numeric' })}
      {' - '}
      {experience.end_date ? 
        new Date(experience.end_date).toLocaleString('en-US', { month: 'short', year: 'numeric' })
        : 'Present'
      }
      </strong>
    </span>
  </li>
)}



                      {experience.description && experience.description.length > 0 && (
                        <li className='child-3'><span id='paragraph-1'>{experience.description}</span></li>
                      )}
                      
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {projectLinks.length > 0 && (
          <div className="education links">
            <div className="title">
              <FaLink className="icon" />
              <span>Projects</span>
            </div>
            <div className="timeline">
              <div className="line"></div>
              {projectLinks.map((project, index) => (
                <div className="eduDetails" key={index}>
                  <div className="eduTitle">
                    <div className="circle"></div>
                    <ul>
                      {project.title && project.title.length > 0 && (
                        <li className='child-1'><span>{project.title}</span></li>
                      )}
                      {project.link_url && project.link_url.length > 0 && (
                        <li><a id='project-link' href={project.link_url} target="_blank" rel="noopener noreferrer">PROJECT LINK</a></li>
                      )}
                      {project.description && project.description.length > 0 && (
                        <li className='child-3'><span id="paragraph-2">{project.description}</span></li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {certificates.length > 0 && (
          <div className="education experience certifications">
            <div className="title">
              <FaCertificate className="icon" />
              <span>Certifications</span>
            </div>
            <div className="timeline">
              <div className="line"></div>
              {certificates.map((certificate, index) => (
                <div className="eduDetails" key={index}>
                  <div className="eduTitle">
                    <div className="circle"></div>
                    <ul>
                      <li className='child-1'>
                        <a id='linked-title' href={certificate.certificate_url} target="_blank" rel="noopener noreferrer">
                          {certificate.title}
                        </a>
                      </li>
                      {certificate.description && certificate.description.length > 0 && (
                        <li className='child-3'><span id='paragraph-t4' contentEditable='false'>
                          {certificate.description}</span></li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Template4;
