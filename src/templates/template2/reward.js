import React from 'react';
import { SectionHeading, SectionSubtitle, SectionText, SectionTitle } from './section';

const Reward = ({ title, description }) => {
  return (
    <div className="mb-3" >
      
      <div className="flex justify-between items-center">
        <SectionTitle label={title} />
      </div>
      
      <SectionText>{description}</SectionText>
    </div>
  );
};

export default Reward;
