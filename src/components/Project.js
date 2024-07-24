import React, { useState, useEffect } from 'react';


const Project = ({ formData, setFormData }) => {
    const initialProjectState = {
        title: '',
        description: '',
        link_url: '',
        start_date: '',
        end_date: ''
    };

    // Parse the project links from formData initially
    const parseProjects = (projects) => {
        try {
            return JSON.parse(projects);
        } catch {
            return [];
        }
    };

    // Initialize projectList state with parsed projects from formData
    const [projectList, setProjectList] = useState(parseProjects(formData.project_links));
    const [detailsOpen, setDetailsOpen] = useState(true); // State for toggle

    // Update projectList state and formData whenever formData.project_links changes
    useEffect(() => {
        setProjectList(parseProjects(formData.project_links));
    }, [formData.project_links]);

    // Handle changes in the project details
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedList = [...projectList];
        updatedList[index] = { ...updatedList[index], [name]: value };
        setProjectList(updatedList);
        setFormData({ ...formData, project_links: JSON.stringify(updatedList) });
    };

    // Add a new project to projectList
    const addProject = () => {
        setProjectList([...projectList, initialProjectState]);
        setDetailsOpen(true);
    };

    // Delete a project from projectList
    const deleteProject = (index) => {
        const updatedList = projectList.filter((_, i) => i !== index);
        setProjectList(updatedList);
        setFormData({ ...formData, project_links: JSON.stringify(updatedList) });
    };

    const toggleDetails = () => {
        setDetailsOpen(!detailsOpen);
    };

    useEffect(() => {
        // Adjust textarea heights for each description field
        const textareas = document.querySelectorAll('#project-description-input-mform');

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
    }, [projectList]); // Dependency array to trigger effect when experienceList changes

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                Projects
            </h2>
            {detailsOpen && (
                <div>
                {projectList.map((project, index) => (
                <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <div style={{ display:'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3>Project Entry {index + 1}</h3>
                                <button className='section-delete-button-mform' type="button" onClick={() => deleteProject(index)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            </div>
                    
                    <div className='two-input-fields-mform'>
                    <div>
                        <label className='inputHeading-mform'>Title:</label>
                        <input
                            className='commonInput-mform big-input-mform'
                            type="text"
                            name="title"
                            value={project.title}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                    <div>
                        <label className='inputHeading-mform'>Link URL:</label>
                        <input
                            className='commonInput-mform big-input-mform'
                            type="text"
                            name="link_url"
                            value={project.link_url}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                    </div>
                    <div className='two-input-fields-mform'>
                    <div>
                        <label className='inputHeading-mform'>Start Date:</label>
                        <input
                            className='commonInput-mform small-input-mform'
                            type="date"
                            name="start_date"
                            value={project.start_date ? project.start_date.split('T')[0] : ''}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                    <div>
                        <label className='inputHeading-mform'>End Date:</label>
                        <input
                            className='commonInput-mform small-input-mform'
                            type="date"
                            name="end_date"
                            value={project.end_date ? project.end_date.split('T')[0] : ''}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                    </div>
                    <div>
                        <label className='inputHeading-mform'>Description:</label>
                        <textarea
                            className='commonInput-mform description-box-mform'
                            id='project-description-input-mform'
                            name="description"
                            value={project.description}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                    
                </div>
            ))}
            
            <button className='add-button-mform' type="button" onClick={addProject}>
                        <svg className='plus-mform' width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="13 11 17 11 17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7"></polygon>
                        </svg>
                        Add Project
                    </button>
                </div>
        )}
        </div>
    );
};

export default Project;
