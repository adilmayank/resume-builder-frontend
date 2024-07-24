import React from 'react';
import { SectionHeading, SectionText, SectionSubtitle, SectionTitle } from './section';
import './WorkSection.css';

const Responsibility = ({ organisation_name, designation, start_date, end_date, description, index }) => {
  return (
    <div className="mb-3">
      {index === 0 && <SectionHeading title="Volunteer" />}
      <div className="py-2" style={{ marginTop: '2px', marginBottom: '2px' }}>
        <SectionTitle label={organisation_name} />
        <div className="flex justify-between items-center" style={{ marginTop: '2px', marginBottom: '1px' }}>
          <SectionSubtitle label={designation} />
          <p className="text-xs">
            {`${new Date(start_date).toLocaleDateString()} - ${end_date ? new Date(end_date).toLocaleDateString() : 'Present'}`}
          </p>
        </div>
        {description && <SectionText>{description}</SectionText>}
      </div>
    </div>
  );
};

export default Responsibility;
