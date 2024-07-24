import React, { useState } from 'react';

const SocialLinks = ({ formData, setFormData }) => {
    const [detailsOpen, setDetailsOpen] = useState(true); // State for toggle

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            social_links: {
                ...formData.social_links,
                [name]: value
            }
        });
    };

    const toggleDetails = () => {
        setDetailsOpen(!detailsOpen);
    };

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                Social Links
            </h2>
            {detailsOpen && (
                <div>
                    <div>
                        <label className='inputHeading-mform'>LinkedIn:</label>
                        <input
                            className='commonInput-mform sociAL-input-mform'
                            
                            type="text"
                            name="linkedin"
                            placeholder="Enter LinkedIn URL"
                            value={formData.social_links?.linkedin || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='inputHeading-mform'>Github:</label>
                        <input
                            className='commonInput-mform sociAL-input-mform'
                            type="text"
                            name="github"
                            placeholder="Enter GitHub URL"
                            value={formData.social_links?.github || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='inputHeading-mform'>LeetCode:</label>
                        <input
                            className='commonInput-mform sociAL-input-mform'
                            type="text"
                            name="leetcode"
                            placeholder="Enter LeetCode URL"
                            value={formData.social_links?.leetcode || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialLinks;
