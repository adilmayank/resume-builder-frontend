import React, { useState, useEffect } from 'react';


const Responsibility = ({ formData, setFormData }) => {
    const initialResponsibilityState = {
        designation: '',
        organisation_name: '',
        start_date: '',
        end_date: '',
        description: ''
    };

    const initializeResponsibilityList = () => {
        if (formData && formData.responsibility) {
            try {
                const responsibilities = JSON.parse(formData.responsibility);
                return responsibilities.map(responsibility => ({
                    ...responsibility,
                    start_date: responsibility.start_date ? responsibility.start_date.split('T')[0] : '',
                    end_date: responsibility.end_date ? responsibility.end_date.split('T')[0] : ''
                }));
            } catch (error) {
                console.error("Error parsing experience data: ", error);
                return [];
            }
        }
        return [];
    };

    const [responsibilityList, setResponsibilityList] = useState(initializeResponsibilityList);
    const [detailsOpen, setDetailsOpen] = useState(true); // State for toggle

    // useEffect to sync responsibilityList with formData.responsibility
    useEffect(() => {
        setResponsibilityList(initializeResponsibilityList());
    }, [formData.responsibility]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedList = [...responsibilityList];
        updatedList[index] = { ...updatedList[index], [name]: value };
        setResponsibilityList(updatedList);

        // Update formData
        setFormData({ ...formData, responsibility: JSON.stringify(updatedList) });
    };

    const addResponsibility = () => {
        setResponsibilityList([...responsibilityList, { ...initialResponsibilityState }]);
        setDetailsOpen(true);
    };

    const deleteResponsibility = (index) => {
        const updatedList = responsibilityList.filter((_, i) => i !== index);
        setResponsibilityList(updatedList);

        // Update formData
        setFormData({ ...formData, responsibility: JSON.stringify(updatedList) });
    };

    const toggleDetails = () => {
        setDetailsOpen(!detailsOpen);
    };

    useEffect(() => {
        // Adjust textarea heights for each description field
        const textareas = document.querySelectorAll('.resp-description-mform');

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
    }, [responsibilityList]); // Dependency array to trigger effect when responsibilityList changes

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                Responsibilities
            </h2>
            {detailsOpen && (
                <div>
                    {responsibilityList.map((responsibility, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <div style={{ display:'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3>Responsibility Entry {index + 1}</h3>
                                <button className='section-delete-button-mform' type="button" onClick={() => deleteResponsibility(index)}>
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
                                        value={responsibility.organisation_name}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className='inputHeading-mform'>Designation:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="designation"
                                        value={responsibility.designation}
                                        onChange={(e) => handleChange(e, index)}
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
                                        value={responsibility.start_date}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className='inputHeading-mform'>End Date:</label>
                                    <input
                                        className='commonInput-mform small-input-mform'
                                        type="date"
                                        name="end_date"
                                        value={responsibility.end_date}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='inputHeading-mform'>Description:</label>
                                <textarea
                                    className='commonInput-mform description-box-mform'
                                    id='res-description-input-mform'
                                    name="description"
                                    value={responsibility.description}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                    <button className='add-button-mform' type="button" onClick={addResponsibility}>
                        <svg className='plus-mform' width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="13 11 17 11 17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7"></polygon>
                        </svg>
                        Add Responsibility
                    </button>
                </div>
            )}
        </div>
    );
};

export default Responsibility;
