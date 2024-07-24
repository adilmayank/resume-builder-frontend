import React from 'react';
import { SectionHeading, SectionText, SectionSubtitle, SectionTitle } from './section';
import './WorkSection.css';

let isFirstExp = true;

const Experience = ({ organisation_name, designation, sector, start_date, end_date, description }) => {
  const renderSectionHeading = isFirstExp;
  isFirstExp = false;

  return (
    <div className="mb-3">
      {renderSectionHeading && (
        <SectionHeading title="Experience" />
      )}
      <div  className="py-2" style={{ marginTop: '2px', marginBottom: '2px' }}>
        <SectionTitle label={organisation_name} />
         <div className="flex justify-between items-center " style={{ marginTop: '2px', marginBottom:'1px' }}>
          <SectionSubtitle label={designation} />
          <p className="text-xs">
            {`${new Date(start_date).toLocaleDateString()} - ${end_date ? new Date(end_date).toLocaleDateString() : 'Present'}`}

          </p>
          </div>
        <div>
          
        </div>
         {description && <SectionText>{` ${description}`}</SectionText>}
      </div>
    </div>
  );
};

export default Experience;
