import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'

const Home = () => {
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                alert('User ID not found in local storage');
                return;
            }

            const response = await axios.post(`http://localhost:8000/api/createResume/${userId}`);
            const resumeId = response.data.resume._id;
            const data  = response.data.resume;   
            navigate(`/form/${resumeId}`, { state: { resumeData: data } });
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('Error fetching profile');
        }
    };

    return (
        <button className='displayButton-mform' id='resume-creator-master' onClick={fetchProfile}>
            Create Resume
        </button>
    );
};

export default Home;