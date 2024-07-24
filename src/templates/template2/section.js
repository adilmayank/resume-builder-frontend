import React from 'react';
 import './resumeStyle.css'; // Import your CSS file for styling

const ProfileName = ({ name }) => {
  return (
    <div className="t2-profile-name" title={name}>
      {name}
    </div>
  );
};

const SectionHeading = ({ title }) => {
  return (
    <div className="t2-custom-section-heading">
      {title}
    </div>
  );
};

const SectionList = ({ children }) => {
  return <div className="t2-section-list">{children}</div>;
};

const SectionSubtitle = ({ label }) => {
  return <div className="t2-custom-subtitle">{label}</div>;
};

const SectionText = ({ children }) => {
  return <div className="t2-section-text">{children}</div>;
};

const SectionTitle = ({ label }) => {
  return <div className="t2-custom-section-title">{label}</div>;
};

const ProfileContact = ({ text }) => {
  return <div className="t2-profile-contact">{text}</div>;
};

const ProfileImage = ({ src, height, width }) => {
  return <img src={src} alt="t2-Profile" style={{ height, width }} />;
};

export { ProfileName, SectionHeading, SectionList, SectionSubtitle, SectionText, SectionTitle, ProfileContact, ProfileImage };
