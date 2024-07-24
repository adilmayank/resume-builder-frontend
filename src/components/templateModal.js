import React from 'react';
import DefaultTemplateDisplay from '../templates/DefaultTemplate';
import Template1 from '../templates/Template4'; 
import Template2 from '../templates/template2/template2';

import './css/templateModal.css';

const TemplateModal = ({ show, onClose, onSelectTemplate }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select a Template</h2>
                <div className="template-options">
                    <div className="template-option" onClick={() => onSelectTemplate(1)}>
                          <img src="/defaultTemplate.png" alt="Default Template" className="template-img"/>
                    </div>
                    <div className="template-option" onClick={() => onSelectTemplate(2)}>
                        <img src="/template2.png" alt="Template 2" className="template-img"/>
                    </div>
                    <div className="template-option" onClick={() => onSelectTemplate(4)}>
                         <img src="/template4.png" alt="Template 4" className="template-img"/>
                    </div>
                    
                     
                   </div>
                <div>
                     <button onClick={onClose}>Close</button>
                </div>
            </div>
             
        </div>
    );
};

export default TemplateModal;
