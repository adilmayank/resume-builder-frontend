import React from 'react';
import { SectionHeading, SectionSubtitle, SectionText, SectionTitle } from './section';

let isFirstEd = true;

const Education = ({
  institute_name,
  qualification,
  degree,
  year,
  end_year,
  cgpa,
  percentage,
  specialization
}) => {
  const renderSectionHeading = isFirstEd;
  isFirstEd = false;

  return (
    <div className="mb-3">
      {renderSectionHeading && (
        <SectionHeading title="Education" />
      )}
      <div style={{ marginBottom: '2px' }}>
       
          <SectionTitle label={institute_name} />
        <div>
           <SectionText children={degree} />
          {/* Ensure institute_name is passed as label */}
          <div className="flex gap-3">
            {/* Additional content or components can be added here */}
          </div>
        </div>
        <SectionText style={{ marginTop: '3px' }}>
          <p className="text-xs text-gray-600" style={{ marginBottom: '5px', marginTop: '5px' }}>{specialization}</p>
          {cgpa && (
            <p className="text-xs text-gray-600" style={{ marginBottom: '5px', marginTop: '5px' }}>CGPA: {cgpa}</p>
          )}
          {percentage && (
            <p className="text-xs text-gray-600" style={{ marginBottom: '5px', marginTop: '5px' }}>Percentage: {percentage}%</p>
          )}
        </SectionText>
      </div>
    </div>
  );
};

export default Education;
