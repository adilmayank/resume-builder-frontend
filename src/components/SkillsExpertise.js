import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
/*import '../components/css/skillsExpertise.css'*/
/*guyhijojl*/

const SkillsExpertise = ({ formData, setFormData }) => {
    const skills = formData.skills ? JSON.parse(formData.skills) : [];
    const [detailsOpen, setDetailsOpen] = useState(true);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSkills = skills.map((skill, i) =>
            i === index ? { ...skill, [name]: value } : skill
        );
        setFormData({ ...formData, skills: JSON.stringify(updatedSkills) });
    };

    const addSkill = () => {
        const newSkill = { id: Date.now(), skill: '', category: '' };
        const updatedSkills = [...skills, newSkill];
        setFormData({ ...formData, skills: JSON.stringify(updatedSkills) });
        setDetailsOpen(true);
    };

    const deleteSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setFormData({ ...formData, skills: JSON.stringify(updatedSkills) });
    };

    const toggleDetails = () => {
        setDetailsOpen(!detailsOpen);
    };

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                Skills and Expertise
            </h2>
            {detailsOpen && (
                <div>
            {skills.map((skill, index) => (
                <div className='two-input-fields-mform' key={skill.id} style={{ marginBottom: '10px' }}>
                    <div>
                    <input
                        className='commonInput-mform'
                        type="text"
                        name="skill"
                        placeholder="Skill"
                        value={skill.skill}
                        onChange={(e) => handleChange(e, index)}
                        style={{ marginRight: '10px' }}
                    />
                    </div>
                    <div>
                    <input
                        className='commonInput-mform'
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={skill.category}
                        onChange={(e) => handleChange(e, index)}
                        style={{ marginRight: '10px' }}
                    />
                    </div>
                    <div>
                    <button className='section-delete-button-mform' type="button" onClick={() => deleteSkill(index)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    </div>
                </div>
            ))}
            
            <button className='add-button-mform' type="button" onClick={addSkill}>
                 <svg  className='plus-mform'width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                 <polygon points="13 11 17 11 17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7"></polygon>
                 </svg>
               Add Skill
           </button>

            
        </div>
            )}
            </div>
    );
};

export default SkillsExpertise;
