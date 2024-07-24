import React from 'react';
import { SectionHeading, SectionText, SectionTitle } from './section';

let isFirstProject = true; // Flag to track if it's the first project

const Project = ({ link_url, title, start_date, end_date, description }) => {
    const renderSectionHeading = isFirstProject;
  isFirstProject = false; // Set isFirstProject to false after first render
   return (
    <div className="mb-3" style={{ marginTop: '2px',   marginBottom: '2px' }}>
      {renderSectionHeading && (
        <SectionHeading title="Projects" />
      )}
           
       <div className="py-2" style={{ marginTop: '2px' }}>
         <div className="flex justify-between items-center" style={{ marginTop: '1px', marginBottom: '1px' }}>
    <SectionTitle label={title} />
    {link_url && (
      <p className="text-xs ml-4">
        <a href={link_url} target="_blank" rel="noopener noreferrer">Link</a>
      </p>
    )}
  </div>
        
              {description && <SectionText>{description}</SectionText>}
              
      </div>
    </div>
  );
};

export default Project;
