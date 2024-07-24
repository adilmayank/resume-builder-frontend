import React, { useState, useEffect } from 'react';
import '../components/css/commonStyles.css';


const BasicDetails = ({ formData, setFormData }) => {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    useEffect(() => {
        const textarea = document.getElementById('summary-input-mform');

        const adjustHeight = () => {
            textarea.style.height = 'auto'; // Reset the height
            textarea.style.height = (textarea.scrollHeight) + 'px'; // Set the height to the scrollHeight
        };

        // Initial adjustment
        adjustHeight();

        // Adjust height on input
        textarea.addEventListener('input', adjustHeight);

        // Cleanup event listener on unmount
        return () => {
            textarea.removeEventListener('input', adjustHeight);
        };
    }, [formData.summary]); // Dependency array to trigger effect when summary changes

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleFormVisibility} style={{ cursor: 'pointer' }}>
                Basic Details
            </h2>
            {isFormVisible && (
                <div>
                    <div className='two-input-fields-mform'>
                        <div className='mform-inputfield'>
                            <label className='inputHeading-mform'>Name:</label>
                            <input
                                className='commonInput-mform big-input-mform'
                                type="text"
                                name="name"
                                placeholder="Your name here"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mform-inputfield'>
                            <label className='inputHeading-mform'>Email:</label>
                            <input
                                className='commonInput-mform big-input-mform'
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className='inputHeading-mform'>Contact No:</label>
                        <input
                            className='commonInput-mform big-input-mform'
                            type="text"
                            name="contact_no"
                            placeholder="Contact No"
                            value={formData.contact_no}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='inputHeading-mform' htmlFor="summary">Summary:</label>
                        <textarea
                            className='commonInput-mform description-box-mform'
                            id="summary-input-mform"
                            name="summary"
                            placeholder="Summary"
                            value={formData.summary}
                            onChange={handleChange}
                            rows={4} // Adjust rows as needed
                            cols={50} // Adjust cols as needed
                        />
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default BasicDetails;