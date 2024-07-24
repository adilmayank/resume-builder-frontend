import React from 'react';
import { SectionHeading, SectionText } from './section'; // Assuming correct path to SectionHeading and SectionText

const Summary = ({ summary }) => {
  return (
    <div className="mb-3">
    
      <SectionHeading title="Summary" /> {/* Ensure this renders with the custom styles */}
      <SectionText>{summary}</SectionText> {/* Ensure this renders with the custom styles */}
    </div>
  );
};

export default Summary;
