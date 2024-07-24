import React from 'react';
import { SectionHeading, SectionText, SectionSubtitle, SectionTitle } from './section';

 
    
let isFirstCerti = true;

const Certificates = ({ title,certificate_url, description }) => {
  const renderSectionHeading = isFirstCerti;
  isFirstCerti = false;

  return (
    <div className="mb-3" style={{ marginTop: '2px',   marginBottom: '2px' }}>
      {renderSectionHeading && (
        <SectionHeading title="Certificates" />
      )}
      <div className="py-2" style={{ marginTop: '2px' }} >
        <div className="flex justify-between items-center" style={{ marginTop: '1px', marginBottom: '1px' }}>
           <SectionTitle label={title} />
          {certificate_url && (
          <p className="text-xs" style={{ marginBottom: '2px' ,marginTop:'1px' }}>
            <a href={certificate_url} target="_blank" rel="noopener noreferrer"> Link</a>
          </p>
        )}
        </div>
       
       
              {description && <SectionText>{description}</SectionText>}
               
      </div>
    </div>
  );
};

export default Certificates;
