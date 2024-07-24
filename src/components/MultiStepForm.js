import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed
import BasicDetails from './BasicDetails';
import SkillsExpertise from './SkillsExpertise';
import Education from './Education';
import Experience from './Experience';
import Responsibility from './Responsibility';
import Achievements from './Rewards';
import Certificates from './Certificates';
import Project from './Project';
import SocialLinks from './SocialLinks';
import DefaultTemplateDisplay from '../templates/DefaultTemplate';
import Template1 from '../templates/Template4';
import Template2 from '../templates/template2/template2';
import TemplateModal from './templateModal'; // Import the TemplateModal component
import MyTemplatesModal from './ResumesModal'; // Import the MyTemplatesModal component
import { useReactToPrint } from 'react-to-print'; // Import useReactToPrint
import './styles.css';

const MultiStepForm = () => {
    const location = useLocation();
    const { resumeId } = useParams();

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [templateId, setTemplateId] = useState(1); // Default template ID to 1
    const [showModal, setShowModal] = useState(false);
    const [showMyTemplatesModal, setShowMyTemplatesModal] = useState(false); // State for My Templates modal
    const componentRef = useRef(); // Ref for the component to print

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                if (!userId || !resumeId) {
                    console.error('User ID or Resume ID is missing');
                    return;
                }

                // Fetch resumeData from API
                const response = await axios.get(`http://localhost:8000/api/resumes/${userId}/${resumeId}`);
                const fetchedResumeData = response.data;
                setFormData({
                    template_id: fetchedResumeData?.template_id || 1,
                    name: fetchedResumeData.name || '',
                    resume_title: fetchedResumeData.resume_title || '',
                    email: fetchedResumeData.email || '',
                    contact_no: fetchedResumeData.contact_no || '',
                    avatar: fetchedResumeData.avatar || '',
                    summary: fetchedResumeData.summary || '',
                    skills: JSON.stringify(fetchedResumeData.skills || []),
                    academic_detail: JSON.stringify(fetchedResumeData.academic_detail || []),
                    work_experience: JSON.stringify(fetchedResumeData.work_experience || []),
                    responsibility: JSON.stringify(fetchedResumeData.responsibility || []),
                    achievements: JSON.stringify(fetchedResumeData.achievements || []),
                    certificates: JSON.stringify(fetchedResumeData.certificates || []),
                    project_links: JSON.stringify(fetchedResumeData.project_links || []),
                    social_links: {
                        linkedin: fetchedResumeData.social_links?.linkedin || '',
                        github: fetchedResumeData.social_links?.github || '',
                        leetcode: fetchedResumeData.social_links?.leetcode || ''
                    }
                });
                setTemplateId(fetchedResumeData?.template_id || 1); // Set template ID from fetched data
                setLoading(false); // Data fetched, set loading to false
            } catch (error) {
                console.error('Error fetching resume data:', error);
                setLoading(false); 
            }
        };

        if (!location.state?.resumeData) {
            fetchResumeData();
        } else {
            const resumeData = location.state?.resumeData;
            setFormData({
                template_id: resumeData?.template_id || 1,
                name: resumeData?.name || '',
                resume_title: resumeData?.resume_title || '',
                email: resumeData?.email || '',
                contact_no: resumeData?.contact_no || '',
                avatar: resumeData?.avatar || '',
                summary: resumeData?.summary || '',
                skills: JSON.stringify(resumeData?.skills || []),
                academic_detail: JSON.stringify(resumeData?.academic_detail || []),
                work_experience: JSON.stringify(resumeData?.work_experience || []),
                responsibility: JSON.stringify(resumeData?.responsibility || []),
                achievements: JSON.stringify(resumeData?.achievements || []),
                certificates: JSON.stringify(resumeData?.certificates || []),
                project_links: JSON.stringify(resumeData?.project_links || []),
                social_links: {
                    linkedin: resumeData?.social_links?.linkedin || '',
                    github: resumeData?.social_links?.github || '',
                    leetcode: resumeData?.social_links?.leetcode || ''
                }
            }); // Use passed resumeData if available
            setTemplateId(resumeData?.template_id || 1); // Set template ID from passed data
            setLoading(false); // Data already available, set loading to false
        }
    }, [location.state, resumeId]); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('user_id');
        if (!userId || !resumeId) {
            console.error('User ID or Resume ID is missing');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/updateResume/${userId}/${resumeId}`, formData);
            console.log('Resume updated successfully', response.data);
        } catch (error) {
            console.error('Error updating resume', error);
        }
    };

    const handleChooseTemplate = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSelectTemplate = (template) => {
        setTemplateId(template);
        setFormData((prevFormData) => ({
            ...prevFormData,
            template_id: template
        }));
        setShowModal(false);
    };

    const handleOpenMyTemplates = () => {
        setShowMyTemplatesModal(true);
    };

    const handleCloseMyTemplatesModal = () => {
        setShowMyTemplatesModal(false);
    };

    const handleSelectResume = (resume) => {
        setFormData({
            template_id: resume?.template_id || 1,
            name: resume?.name || '',
            resume_title: resume?.resume_title || '',
            email: resume?.email || '',
            contact_no: resume?.contact_no || '',
            avatar: resume?.avatar || '',
            summary: resume?.summary || '',
            skills: JSON.stringify(resume?.skills || []),
            academic_detail: JSON.stringify(resume?.academic_detail || []),
            work_experience: JSON.stringify(resume?.work_experience || []),
            responsibility: JSON.stringify(resume?.responsibility || []),
            achievements: JSON.stringify(resume?.achievements || []),
            certificates: JSON.stringify(resume?.certificates || []),
            project_links: JSON.stringify(resume?.project_links || []),
            social_links: {
                linkedin: resume?.social_links?.linkedin || '',
                github: resume?.social_links?.github || '',
                leetcode: resume?.social_links?.leetcode || ''
            }
        });
        setTemplateId(resume?.template_id || 1);
        setShowMyTemplatesModal(false);
    };

    const autoSave = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId || !resumeId) {
            console.error('User ID or Resume ID is missing');
            return;
        }

        try {
            await axios.put(`http://localhost:8000/api/updateResume/${userId}/${resumeId}`, formData);
            console.log('Auto-saved resume successfully');
        } catch (error) {
            console.error('Error auto-saving resume', error);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            autoSave();
            event.returnValue = ''; // For modern browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formData]);

    const renderTemplate = (className) => {
        if (templateId === 2) {
            return <Template2 data={formData} ref={componentRef} className={className} />;
        }
        else if (templateId === 4) {
            return <Template1 data={formData} ref={componentRef} className={className} />;
        }
        
        return <DefaultTemplateDisplay data={formData} ref={componentRef} className={className}/>;
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleinputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div id='multi-form-container'>
            <div className='multi-form-div' style={{ flex: '1', marginRight: '40px' }}>
                <button className='displayButton-mform' id='templateChooser'onClick={handleChooseTemplate} style={{ marginBottom: '10px' }}>
                    Choose Template
                </button>
                <button className='displayButton-mform' id='myTemplatesBox'onClick={handleOpenMyTemplates} style={{ marginBottom: '10px' }}>
                    My Templates
                </button>
                <button className='displayButton-mform' type="submit">
                    Update Changes       
                </button>
                <div id='resume-div-mform'>
                        <label id='resume-title-mform'>Resume Title:</label>
                        <input
                            className='commonInput-mform'
                            id='resumetitle-input-mform'
                            type="text"
                            name="resume_title"
                            placeholder="Resume Title"
                            value={formData.resume_title}
                            onChange={handleinputChange}
                        />
                </div>
               
                <form onSubmit={handleSubmit}>
                    <BasicDetails formData={formData} setFormData={setFormData} />
                    <SkillsExpertise formData={formData} setFormData={setFormData} />
                    <Education formData={formData} setFormData={setFormData} />
                    <Experience formData={formData} setFormData={setFormData} />
                    <Responsibility formData={formData} setFormData={setFormData} />
                    <Achievements formData={formData} setFormData={setFormData} />
                    <Certificates formData={formData} setFormData={setFormData} />
                    <Project formData={formData} setFormData={setFormData} />
                    <SocialLinks formData={formData} setFormData={setFormData} />
                </form>
                
            </div>
            <div className='render-wrapper'>
            <div>
            <button className='displayButton-mform'onClick={handlePrint} style={{ marginTop: '10px' }}>Download PDF</button>
             </div>
            <div className='rendererM'>
            {renderTemplate({ margin: '20px', padding: '10px' })}
            </div>
             </div>
            <TemplateModal show={showModal} onClose={handleCloseModal} onSelectTemplate={handleSelectTemplate} />
            <MyTemplatesModal show={showMyTemplatesModal} onClose={handleCloseMyTemplatesModal} onSelectResume={handleSelectResume} />
        </div>
    );
};

export default MultiStepForm;