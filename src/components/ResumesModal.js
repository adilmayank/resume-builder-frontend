import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './ResumesModal.css';

const MyTemplatesModal = ({ show, onClose }) => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            const fetchResumes = async () => {
                try {
                    const userId = localStorage.getItem('user_id');
                    if (!userId) {
                        console.error('User ID is missing');
                        return;
                    }

                    const response = await axios.get(`http://localhost:8000/api/resumes/${userId}`);
                    setResumes(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching resumes:', error);
                    setLoading(false);
                }
            };

            fetchResumes();
        }
    }, [show]);

    const handleResumeClick = (resume) => {
        navigate(`/form/${resume._id}`);
        onClose(); // Close the modal after navigating
    };

    const handleDeleteClick = (resume) => {
        setResumeToDelete(resume);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteResume/${resumeToDelete._id}`);
            if (response.status === 200) {
                setResumes(resumes.filter((r) => r._id !== resumeToDelete._id));
                //navigate('/');
            } else {
                console.error('Failed to delete resume');
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
        setShowDeleteConfirmation(false);
        setResumeToDelete(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false);
        setResumeToDelete(null);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content2">
                <h2>My Templates</h2>
                <button  onClick={onClose}>close</button>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {resumes.map((resume, index) => (
                            <div className="l2modal" key={resume._id || index}>
                                <span className='template-heading-mform' onClick={() => handleResumeClick(resume)}>
                                    {resume.resume_title}                              
                                </span>
                                 <span className="fa fa-trash-o" onClick={() => handleDeleteClick(resume)}></span>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
            {showDeleteConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-content">
                        <p>Do you want to delete this resume?</p>
                        <button onClick={handleDeleteConfirm}>Yes</button>
                        <button onClick={handleDeleteCancel}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTemplatesModal;
