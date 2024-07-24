import React, { useState, useEffect } from 'react';


const Rewards = ({ formData, setFormData }) => {
    const initialRewardState = {
        title: '',
        description: ''
    };

    // Initialize achievementsList from formData if available
    const initializeAchievementsList = () => {
        if (formData && formData.achievements) {
            try {
                return JSON.parse(formData.achievements);
            } catch (error) {
                console.error("Error parsing achievements data: ", error);
                return [];
            }
        }
        return [];
    };

    const [achievementsList, setAchievementsList] = useState(initializeAchievementsList);
    const [detailsOpen, setDetailsOpen] = useState(true); // State for toggle

    // useEffect to sync achievementsList with formData.achievements
    useEffect(() => {
        setAchievementsList(initializeAchievementsList());
    }, [formData.achievements]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedList = [...achievementsList];
        updatedList[index] = { ...updatedList[index], [name]: value };
        setAchievementsList(updatedList);

        // Update formData
        setFormData({ ...formData, achievements: JSON.stringify(updatedList) });
    };

    const addReward = () => {
        setAchievementsList([...achievementsList, { ...initialRewardState, id: Date.now() }]);
    };

    const deleteReward = (index) => {
        const updatedList = achievementsList.filter((_, i) => i !== index);
        setAchievementsList(updatedList);

        // Update formData
        setFormData({ ...formData, achievements: JSON.stringify(updatedList) });
    };

    const toggleDetails = () => {
        setDetailsOpen(!detailsOpen);
    };

    useEffect(() => {
        // Adjust textarea heights for each description field
        const textareas = document.querySelectorAll('.reward-description-input-mform');

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
    }, [achievementsList]); // Dependency array to trigger effect when achievementsList changes

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                Rewards
            </h2>
            {detailsOpen && (
                <div>
                    {achievementsList.map((achievement, index) => (
                        <div key={achievement.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3>Reward Entry {index + 1}</h3>
                                <button className='section-delete-button-mform' type="button" onClick={() => deleteReward(index)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            </div>
                            <div>
                                <label className='inputHeading-mform'>Title:</label>
                                <input
                                    className='commonInput-mform big-input-mform'
                                    type="text"
                                    name="title"
                                    value={achievement.title}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label className='inputHeading-mform'>Description:</label>
                                <textarea
                                    className='commonInput-mform description-box-mform'
                                    id='reward-description-input-mform'
                                    name="description"
                                    value={achievement.description}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                     <button className='add-button-mform' type="button" onClick={addReward}>
                        <svg className='plus-mform' width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="13 11 17 11 17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7"></polygon>
                        </svg>
                        Add Achievement
                    </button>
                </div>
            )}
        </div>
    );
};

export default Rewards;
