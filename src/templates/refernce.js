import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Resume.css"; // Make sure to style accordingly

const Resume = () => {
  return (
    <div className="resume-container">
      {/* Heading */}
      <div className="resume-header">
          <h1>Kavya Sharma</h1>
         <div className="contact-info">
          <a href="https://github.com/kavmak">
            <FaGithub /> github.com/kavyaSharma
          </a>
          <a href="https://www.linkedin.com/in/kavya-sharma-25b798267/">
            <FaLinkedin /> linkedin.com/in/kavyasharma
          </a>
          <a href="mailto:kaveeyasharma@gmail.com">
            <FaEnvelope /> kaveeyasharma@gmail.com
          </a>
         </div>
      </div>

      {/* Education */}
      <Section title="Education">
        <SubHeading
          title="Indian Institute of Technology (ISM) Dhanbad"
          date="December 2021-May 2025"
          subtitle="Bachelor of Technology in Civil Engineering"
          extra="CGPA: 7.64/10"
        />
        <SubHeading
          title="K N Memo Academy, Rahmatpur, Asarganj, Munger, Bihar"
          date="April 2018-April 2020"
          subtitle="Class-12th"
          extra="Percentage: 91.6"
        />
        <SubHeading
          title="Notre Dame Academy, Munger, Bihar"
          date="April 2017-April 2018"
          subtitle="Class-10th"
          extra="Percentage: 96"
        />
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <ul>
          <li>
            <strong>Languages</strong>: C, C++, JavaScript
          </li>
          <li>
            <strong>Development</strong>: HTML, CSS, Bootstrap, React.Js,
            Express.Js, Node.Js
          </li>
          <li>
            <strong>Others</strong>: Data structures, Algorithms,
            Object-oriented Programming
          </li>
        </ul>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        <Project
          title="REACT-MOVIE-WEBSITE"
          date="June 2023"
          link="https://github.com/kavmak/React-Movie-Search"
          details={[
            "This is a dynamic movie-search website crafted using React.Js.",
            "This project, with a seamless integration of OMDb API, empowers users to explore a vast database of movies effortlessly and discover relevant films based on keywords.",
            "Technologies Used: HTML, CSS, React Js, API.",
          ]}
        />
        <Project
          title="Temperature Converter"
          date="January 2023"
          link="https://github.com/kavmak/Temperature-Converter"
          details={[
            "This web page converts temperature from Celsius to Fahrenheit units and vice versa.",
            "This is a front-end web development project that utilizes Javascript for successful conversions in temperature.",
            "Technologies used: HTML, CSS, Javascript",
          ]}
        />
        <Project
          title="FILE-SHARING-APP"
          date="Ongoing"
          link="https://github.com/kavmak/file-sharing-mern"
          details={[
            "This MERN-based, intuitive and user-friendly file sharing application is designed to simplify the process of uploading, storing and sharing files securely.",
            "Using this tool, users can effortlessly upload files from their devices to the MongoDB database, generating a unique download link that is shareable.",
            "This project is not just a stand-alone app; it can be used as a robust file upload and share utility when integrated into larger projects.",
            "Technologies used: React.Js, Express.Js, MongoDB, CSS.",
          ]}
        />
      </Section>

      {/* Sports Programming */}
      <Section title="Sports Programming">
        <ul>
          <li>
            <a href="https://www.codingninjas.com/studio/profile/kavmak">
              Codestudio
            </a>
            : Solved more than 300 questions with an exp rating of more than
            12000
          </li>
          <li>
            <a href="https://www.codechef.com/users/dragoner_1519">Codechef</a>:
            Solved over 170 questions with a maximum rating of 1271.
          </li>
          <li>
            <a href="https://auth.geeksforgeeks.org/user/kaveeyakynv/practice">
              Geeks for Geeks
            </a>
            : Solved over 48 questions with an overall coding score over 137
          </li>
        </ul>
      </Section>

      {/* Achievements */}
      <Section title="Achievements">
        <ul>
          <li>
            Secured <strong>2nd</strong> position with my team in{" "}
            <strong>Industrial Genix</strong> - a technical event in{" "}
            <strong>Concetto 2022</strong>, the annual techno-management fest of
            IIT(ISM) Dhanbad.
          </li>
          <li>
            Secured <strong>2nd</strong> position in a cultural event called{" "}
            <strong>Pitch a Book</strong> organized during{" "}
            <strong>Srijan 2023</strong>, the annual socio-cultural fest of
            IIT(ISM) Dhanbad.
          </li>
        </ul>
      </Section>

      {/* Extra-Curriculars */}
      <Section title="Extra-Curriculars">
        <ul>
          <li>Digital Art, sketching, painting</li>
          <li>Member of Artfreaks - the fine arts club of IIT(ISM).</li>
          <li>
            Member of Udaan - the career development club of IIT(ISM).
          </li>
        </ul>
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="section">
    <h2>{title}</h2>
    {children}
  </div>
);

const SubHeading = ({ title, date, subtitle, extra }) => (
  <div className="subheading">
    <div className="subheading-title">
      <h3>{title}</h3>
      <span>{date}</span>
    </div>
    <div className="subheading-details">
      <em>{subtitle}</em> <span>{extra}</span>
    </div>
  </div>
);

const Project = ({ title, date, link, details }) => (
  <div className="project">
    <div className="project-title">
      <h3>{title}</h3>
      <span>{date}</span>
      <a href={link}>Github</a>
    </div>
    <ul>
      {details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  </div>
);

export default Resume;
