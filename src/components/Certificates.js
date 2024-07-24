import React, { useState, useEffect } from 'react';


const Certificates = ({ formData, setFormData }) => {
    const initialCertificateState = {
        title: '',
        certificate_url: '',
        description: ''
    };

    const parseCertificates = (certificates) => {
        try {
            return JSON.parse(certificates);
        } catch {
            return [];
        }
    };

    const [certificateList, setCertificateList] = useState(parseCertificates(formData.certificates));
    const [isCertificatesVisible, setIsCertificatesVisible] = useState(true);

    useEffect(() => {
        setCertificateList(parseCertificates(formData.certificates));
    }, [formData.certificates]);

    const handleInputChange = (index, field, value) => {
        const updatedList = certificateList.map((cert, i) =>
            i === index ? { ...cert, [field]: value } : cert
        );
        setCertificateList(updatedList);
        setFormData({ ...formData, certificates: JSON.stringify(updatedList) });
    };

    const addCertificate = () => {
        const updatedList = [...certificateList, { ...initialCertificateState }];
        setCertificateList(updatedList);
        setFormData({ ...formData, certificates: JSON.stringify(updatedList) });
    };

    const deleteCertificate = (index) => {
        const updatedList = certificateList.filter((_, i) => i !== index);
        setCertificateList(updatedList);
        setFormData({ ...formData, certificates: JSON.stringify(updatedList) });
    };

    const toggleCertificatesVisibility = () => {
        setIsCertificatesVisible(!isCertificatesVisible);
    };

    useEffect(() => {
        // Adjust textarea heights for each description field
        const textareas = document.querySelectorAll('#certificate-description-mform');

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
    }, [certificateList]); // Dependency array to trigger effect when certificateList changes

    return (
        <div>
            <h2 className='major-heading-mform' onClick={toggleCertificatesVisibility} style={{ cursor: 'pointer' }}>
                Certificates
            </h2>
           
            {isCertificatesVisible && (
                <div>
                    {certificateList.map((certificate, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <div style={{ display:'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3>Certificate Entry {index + 1}</h3>
                                <button className='section-delete-button-mform' type="button" onClick={() => deleteCertificate(index)}>
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
                                        placeholder="Title"
                                        value={certificate.title}
                                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                        style={{ display: 'block', marginBottom: '5px' }}
                                    />
                                </div>
                                <div>
                                    <label className='inputHeading-mform'>URL Link:</label>
                                    <input
                                        className='commonInput-mform big-input-mform'
                                        type="text"
                                        name="certificate_url"
                                        placeholder="URL"
                                        value={certificate.certificate_url}
                                        onChange={(e) => handleInputChange(index, 'certificate_url', e.target.value)}
                                        style={{ display: 'block', marginBottom: '5px' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='inputHeading-mform'>Description:</label>
                                <textarea
                                    className='commonInput-mform description-box-mform'
                                    id='certificate-description-mform'
                                    name="description"
                                    placeholder="Description"
                                    value={certificate.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    style={{ display: 'block', marginBottom: '5px' }}
                                />
                            </div>
                        </div>
                    ))}
                    <button className='add-button-mform' type="button" onClick={addCertificate}>
                        <svg className='plus-mform' width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="13 11 17 11 17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7"></polygon>
                        </svg>
                        Add Certificate
                    </button>
                </div>
            )}
        </div>
    );
};

export default Certificates;
