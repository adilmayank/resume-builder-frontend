import React, { useState, useEffect } from 'react';


const Education = ({ formData, setFormData }) => {
    const initialEducationState = {
        institute_name: '',
        qualification: '',
        degree: '',
        year: '',
        end_year: '',
        cgpa: null,
        percentage: null,
        specialization: '',
        description: ''
    };

    const [academicDetailList, setAcademicDetailList] = useState(JSON.parse(formData.academic_detail) || []);
    const [detailsOpen, setDetailsOpen] = useState(true);

    useEffect(() => {
        setAcademicDetailList(JSON.parse(formData.academic_detail) || []);
    }, [formData.academic_detail]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedList = [...academicDetailList];
        updatedList[index] = {
            ...updatedList[index],
            [name]: name === 'cgpa' || name === 'percentage' ? (value === '' ? null : parseFloat(value)) : value
        };
        setAcademicDetailList(updatedList);
        setFormData({ ...formData, academic_detail: JSON.stringify(updatedList) });
    };

    const addEducation = () => {
        setAcademicDetailList([...academicDetailList, initialEducationState]);
        setDetailsOpen(true); // Open the details form when a new entry is added
    };

    const deleteEducation = (index) => {
        const updatedList = academicDetailList.filter((_, i) => i !== index);
        setAcademicDetailList(updatedList);
        setFormData({ ...formData, academic_detail: JSON.stringify(updatedList) });
    };

    const toggleDetails = () => {
        setDetailsOpen(!detailsOpen);
    };

    useEffect(() => {
        // Adjust textarea heights for each description field
        const textareas = document.querySelectorAll('.edu-description-mform');

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
    }, [academicDetailList]); // Dependency array to trigger effect when academicDetailList changes

    const years = [];
    for (let i = 1980; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                Education
            </h2>
            {detailsOpen && (
                <div>
                    {academicDetailList.map((academic_detail, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Education Entry {index + 1}</h3>
                                <button className='section-delete-button-mform' type="button" onClick={() => deleteEducation(index)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            </div>
                            <div className='two-input-fields-mform'>
                                <div>
                                    <label className='inputHeading-mform'>Institute Name:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="institute_name"
                                        value={academic_detail.institute_name}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className='inputHeading-mform'>Degree:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="degree"
                                        value={academic_detail.degree}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className='two-input-fields-mform'>
                                <div>
                                    <label className='inputHeading-mform'>Qualification:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="qualification"
                                        value={academic_detail.qualification}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                
                                <div>
                                    <label className='inputHeading-mform'>Specialization:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="specialization"
                                        value={academic_detail.specialization}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className='four-input-fields-mform'>
                                <div>
                                    <label className='inputHeading-mform'>Start Year:</label>
                                    <select
                                        className='commonInput-mform small-input-mform'
                                        name="year"
                                        value={academic_detail.year}
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="">Select Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className='inputHeading-mform'>End Year:</label>
                                    <select
                                        className='commonInput-mform small-input-mform'
                                        name="end_year"
                                        value={academic_detail.end_year}
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="">Select Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className='inputHeading-mform'>CGPA:</label>
                                    <input
                                        className='commonInput-mform small-input-mform'
                                        type="number"
                                        name="cgpa"
                                        value={academic_detail.cgpa !== null ? academic_detail.cgpa : ''}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className='inputHeading-mform'>Percentage:</label>
                                    <input
                                        className='commonInput-mform small-input-mform'
                                        type="number"
                                        name="percentage"
                                        value={academic_detail.percentage !== null ? academic_detail.percentage : ''}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className='inputHeading-mform'>Description:</label>
                                <textarea
                                    className='commonInput-mform description-box-mform'
                                    id='edu-description-input-mform'
                                    name="description"
                                    value={academic_detail.description}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                    <button className='add-button-mform' type="button" onClick={addEducation}>
                        <svg className='plus-mform' width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="13 11 17 11 17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7"></polygon>
                        </svg>
                        Add Education
                    </button>
                </div>
            )}
        </div>
    );
};

export default Education;
