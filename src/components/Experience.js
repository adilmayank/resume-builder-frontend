import React, { useState, useEffect } from 'react';
import '../components/css/Experience.css';

const Experience = ({ formData, setFormData }) => {
    const initialExperienceState = {
        organisation_name: '',
        designation: '',
        start_date: '',
        end_date: '',
        description: '',
        currently_pursuing: false // New field for checkbox state
    };

    const initializeExperienceList = () => {
        if (formData && formData.work_experience) {
            try {
                const experiences = JSON.parse(formData.work_experience);
                return experiences.map(experience => ({
                    ...experience,
                    start_date: experience.start_date ? experience.start_date.split('T')[0] : '',
                    end_date: experience.end_date ? experience.end_date.split('T')[0] : '',
                    currently_pursuing: experience.currently_pursuing || false
                }));
            } catch (error) {
                console.error("Error parsing experience data: ", error);
                return [];
            }
        }
        return [];
    };

    const [experienceList, setExperienceList] = useState(initializeExperienceList);
    const [detailsOpen, setDetailsOpen] = useState(true);

    useEffect(() => {
        setExperienceList(initializeExperienceList());
    }, [formData.work_experience]);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const updatedList = [...experienceList];
        
        if (type === 'checkbox') {
            updatedList[index] = { ...updatedList[index], [name]: checked };
            if (checked) {
                updatedList[index].end_date = ''; // Reset end_date when checked
            }
        } else {
            updatedList[index] = { ...updatedList[index], [name]: value };
        }

        setFormData({ ...formData, work_experience: JSON.stringify(updatedList) });
        setExperienceList(updatedList);
    };

    const addExperience = () => {
        setExperienceList([...experienceList, { ...initialExperienceState }]);
        setDetailsOpen(true); 
    };

    const deleteExperience = (index) => {
        const updatedList = experienceList.filter((_, i) => i !== index);
        setExperienceList(updatedList);
        setFormData({ ...formData, work_experience: JSON.stringify(updatedList) });
    };

    const toggleDetails = () => {
        console.log("Toggling details, currently:", detailsOpen);
        setDetailsOpen(!detailsOpen);
    };

    useEffect(() => {
        // Adjust textarea heights for each description field
        const textareas = document.querySelectorAll('.exp-description-mform');

        textareas.forEach((textarea) => {
            const adjustHeight = () => {
                textarea.style.height = 'auto'; // Reset the height
                textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
            };

            // Initial adjustment
            adjustHeight();

            // Adjust height on input
            textarea.addEventListener('input', adjustHeight);

            // Cleanup event listener on unmount
            return () => {
                textarea.removeEventListener('input', adjustHeight);
            };
        });
    }, [experienceList]); // Dependency array to trigger effect when experienceList changes

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                Experience
            </h2>
            {detailsOpen && (
                <div>
                    {experienceList.map((experience, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3>Experience Entry {index + 1}</h3>
                                <button className='section-delete-button-mform' type="button" onClick={() => deleteExperience(index)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            </div>
                            <div className='two-input-fields-mform'>
                                <div>
                                    <label className='inputHeading-mform'>Organisation Name:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="organisation_name"
                                        value={experience.organisation_name}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className='inputHeading-mform'>Designation:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="designation"
                                        value={experience.designation}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className='two-input-fields-mform'>
                                <div>
                                    <label className='inputHeading-mform'>Start Date:</label>
                                    <input
                                        className='commonInput-mform'
                                        type="date"
                                        name="start_date"
                                        value={experience.start_date}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div className='end-date-field'>
                                    <label className='inputHeading-mform'>End Date:</label>
                                    <input
                                        className='commonInput-mform'
                                        type="date"
                                        name="end_date"
                                        value={experience.end_date}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={experience.currently_pursuing}
                                    />
                                <div className='current-label-mform'>
                                    <label className='inputHeading-mform'>
                                        <input
                                            type="checkbox"
                                            name="currently_pursuing"
                                            checked={experience.currently_pursuing}
                                            onChange={(e) => handleChange(e, index)}
                                        /> Currently pursuing
                                    </label>
                                </div>
                                </div>
                                <div className="tooltip-container">
                                        <div className="tooltip">
                                            <svg width="16" height="16" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5zm3.69-13.47c0 2.73-2.827 2.73-2.827 5.558H10.62c0-3.608 2.73-3.608 2.73-5.363 0-.877-.585-1.462-1.56-1.462-.877 0-1.56.682-1.56 1.852H7.89c.098-2.438 1.657-3.998 3.9-3.998 2.438 0 3.9 1.463 3.9 3.413zm-5.167 7.8a1.29 1.29 0 0 1 1.267-1.267 1.29 1.29 0 0 1 1.268 1.267 1.29 1.29 0 0 1-1.268 1.268 1.29 1.29 0 0 1-1.267-1.268z"></path>
                                            </svg>
                                            <span className="tooltiptext">
                                                If you don't enter an end date or select "Currently pursuing", it will indicate that you are presently pursuing the role.
                                            </span>
                                        </div>
                                    </div>
                            </div>
                            <div>
                                <label className='inputHeading-mform'>Description:</label>
                                <textarea
                                    className='commonInput-mform description-box-mform'
                                    id='exp-description-mform'
                                    name="description"
                                    value={experience.description}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                    <button className='add-button-mform' type="button" onClick={addExperience}>
                        <svg className='plus-mform' width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="13 11 17 11 17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7"></polygon>
                        </svg>
                        Add Experience
                    </button>
                </div>
            )}
        </div>
    );
};

export default Experience;
