import React, { forwardRef } from 'react';
import BasicIntro from './basic'; // Assuming path is correct
import Experience from './experience'; // Assuming path is correct
import Summary from './Summary'; // Assuming path is correct
import Reward from './reward'; // Assuming path is correct
import Education from './education'; // Assuming path is correct
import Project from './Project';
import Certificates from './certificates';
import Responsibility from './volunteer'; 
import { SectionHeading, SectionTitle } from './section';
import './resumeStyle.css';

const Template2 = forwardRef(({ data, isPreview }, ref) => {
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

  // Ensure data.work_experience is an array before mapping
  const workExperience = data.work_experience ? JSON.parse(data.work_experience) : [];
  const achievements = data.achievements ? JSON.parse(data.achievements) : [];
  const educationDetails = data.academic_detail ? JSON.parse(data.academic_detail) : [];
  const projectLinks = data.project_links ? JSON.parse(data.project_links) : [];
  const certificates = data.certificates ? JSON.parse(data.certificates) : [];
  const linkedinUrl = data.social_links ? data.social_links.linkedin : undefined;
  const responsibility = data.responsibility ? JSON.parse(data.responsibility) : [];
 

  return (
    <div ref={ref} className="fixed-container" style={{ padding: ' 20px' }}>
      <div style={{width:'100%'}}>
        {/* Basic Intro Section */}
        <BasicIntro
          name={data.name}
          email={data.email}
          phone={data.contact_no}
          image={data.avatar}
          linkedinUrl={linkedinUrl}
        />
      </div>

      <div style={{ display: 'flex' }}>
         <div className="wrapper">
        <div className="basis-75 " style={{ flex: '7 5 0%', marginRight: '20px' }}>
          {/* Summary Section */}
          {data.summary && <Summary summary={data.summary} />}

          {/* Work Section */}
        {workExperience.length > 0 && (
  <div>
    <SectionHeading title="Experience" />
    {workExperience.map((experience, index) => (
      <Experience
        key={index}
        organisation_name={experience.organisation_name}
        designation={experience.designation}
        sector={experience.sector}
        start_date={experience.start_date}
        end_date={experience.end_date}
        description={experience.description}
      />
    ))}
  </div>
)}
          {/* Project Links Section */}
          {projectLinks.length > 0 && (
            <div>
              <SectionHeading title="Projects" />
              {projectLinks.map((project, index) => (
                <Project
                  key={index}
                  title={project.title}
                  start_date={project.start_date}
                  end_date={project.end_date}
                  description={project.description}
                  link_url={project.link_url}
                />
              ))}
            </div>
            )}
            
        </div>
        </div>
         
         <div className="wrapper">
        <div className="basis-35 " style={{ flex: '3 1 0%' }}>
         
          {/* Education Section */}
            {educationDetails.length > 0 && (
              
                <div>
                  <SectionHeading title="Education" />
                    {educationDetails.map((education, index) => (
                      
                    <Education
                      key={index}
                      institute_name={education.institute_name}
                      qualification={education.qualification}
                      degree={education.degree}
                      year={education.year}
                      end_year={education.end_year}
                      cgpa={education.cgpa}
                      percentage={education.percentage}
                      specialization={education.specialization}
                        />
                        
                    ))}
                </div>
            )}
            
          

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="mb-3">
                <SectionHeading title="Skills" />
                <ul className="t2-section-list">
                  {Object.keys(groupedSkills).map((category, index) => (
                    <div key={index}>
                      <strong>{category}:</strong> <span>{groupedSkills[category].join(', ')}</span>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Achievements Section */}
            {achievements.length > 0 && (
              <div style={{ marginTop: '5px' }}>
                <SectionHeading title="Reward" />
                {achievements.map((achievement, index) => (
                  <Reward
                    key={index}
                    title={achievement.title}
                    description={achievement.description}
                  />
                ))}
              </div>
            )}
           

            {/* Certificates Section */}
            {certificates.length > 0 && (
              <div>
                <SectionHeading title="Certificates" />
                {certificates.map((certificate, index) => (
                  <Certificates
                    key={index}
                    title={certificate.title}
                    date={certificate.date}
                    description={certificate.description}
                    certificate_url={certificate.certificate_url}
                  />
                ))}
              </div>
              )}
              {/*voulnteer*/}
              {responsibility.length > 0 && (
              <div className="section">
                {responsibility.map((volunteer, index) => (
                  <Responsibility
                    key={index}
                    organisation_name={volunteer.organisation_name}
                    designation={volunteer.designation}
                    start_date={volunteer.start_date}
                    end_date={volunteer.end_date}
                    description={volunteer.description}
                    index={index}
                  />
                ))}
              </div>
            )}
              </div>
          </div>
        </div>
      </div>
    
  );
});

export default Template2;
