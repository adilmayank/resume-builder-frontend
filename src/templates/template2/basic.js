import React from 'react';
import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { ProfileContact, ProfileImage, ProfileName } from './section'; // Adjust the path if necessary

const BasicIntro = ({ name, email, phone,  linkedinUrl, image }) => {
  return (
    
    <div className="t2-container" >
      <div  >
        <ProfileName name={name} />
        <div className="t2-contact-container t2-flex t2-gap-3">
          {linkedinUrl && (
            <div className="t2-intro-link">
              <a href={linkedinUrl}>
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          )}
          {email && (
            <div className="t2-intro-link">
              <a href={`mailto:${email}`}>
                <FaEnvelope /> {email}
              </a>
            </div>
          )}
          {phone && (
            <div className="t2-intro-link">
              <a href={`tel:${phone}`}>
                <FaPhone /> {phone}
              </a>
            </div>
          )}
          
        </div>
      </div>
      <span></span>
      <div style={{ borderRadius: '100%', overflow: 'hidden', width: '120px', height: '120px' }}>
        <ProfileImage src={image} height="120px" width="120px" />
        </div>
      </div>
     
  );
};

export default BasicIntro;
