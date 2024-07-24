import React from 'react';

function TestTemp({ data }) {
    const academicDetail = data.academic_detail ? JSON.parse(data.academic_detail) : [];

    return (
        <div>
            {academicDetail.length > 0 && (
                <section>
                    <p className='section-title'>Education</p>
                    {academicDetail.map((edu, index) => (
                        <div key={index} className="edu-subsection">
                            <div>
                                <h3 id="insti-name">{edu.institute_name}</h3>
                                <p>{edu.degree} in {edu.specialization}</p>
                            </div>
                            <div className="edu-details">
                                <p className="edu-dates">{edu.year} - {edu.end_year}</p>
                                <p className="edu-cgpa">CGPA: {edu.cgpa}</p>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}

export default TestTemp;
