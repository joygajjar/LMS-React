import React, { useState } from "react";
import { Container, Nav, Tab, Row, Col,Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabStyles = {
    default: {
      borderRadius: '0',
      border: '1px solid black',
      backgroundColor: 'transparent',
      color: 'black',
      margin: '0 5px', 
      padding: '10px 20px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    active: {
      borderRadius: '0',
      border: '1px solid black',
      backgroundColor: '#325481',
      color: 'white',
      margin: '0 5px', 
      padding: '10px 20px',
      cursor: 'pointer',
      textAlign: 'center',
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="Overview">
            <h4>Course Title and Code</h4>
            <p>
              Title: Java And SpringBoot Development
              <br />
              Code: JAVASB101
            </p>
            <hr />

            <h4>Course Description</h4>
            <p>
              This course provides an in-depth introduction to Java programming and Spring Boot framework. It covers fundamental Java concepts, object-oriented programming (OOP) principles, and advanced features such as exception handling, multithreading, and file I/O. The course then delves into Spring Boot, an open-source Java-based framework used to create stand-alone, production-grade Spring-based applications. Students will learn how to build, test, and deploy robust applications using Java and Spring Boot.
            </p>
            <hr />

            <h4>Prerequisites</h4>
            <p>
              Basic understanding of programming concepts.
              <br />
              Familiarity with any programming language is beneficial but not required.
            </p>
            <hr />

            <h4>Course Objective</h4>
            <p>
              Understand and apply core Java programming concepts.
              <br />
              Utilize object-oriented programming principles to design and implement Java applications.
              <br />
              Implement RESTful web services with Spring Boot.
            </p>
            <hr />
            <br></br>
            <br></br>
          </div>
        );
      case "Q&A":
        const questions = [
          "Which one of the following is also known as Conditional Expression?",
          "What does HTML stand for?",
          "Which language runs in a web browser?",
          "What does CSS stand for?"
        ];
      
        const options = [
          { id: 'A', text: 'Alternative to if-else' },
          { id: 'B', text: 'Switch statement' },
          { id: 'C', text: 'If-then-else statement' },
          { id: 'D', text: 'Immediate if' }
        ];
      

        return (
          <>
          {questions.map((question, index) => (
        <div className="content" key={index}>
          <b>Q. {question}</b>
          <br />
          <Form>
            {options.map(option => (
              <Form.Check
                type="radio"
                id={`${index}-${option.id}`}
                name={`question-${index}`}
                label={`${option.id}. ${option.text}`}
                key={option.id}
              />
            ))}
          </Form>
        </div>
      ))}
      
          </>
        );
      case "Notes":
        return (
          <>
          <div className="notes-content">
          <FontAwesomeIcon icon={faAnglesRight} className="notes-icon" />
          <h4 className="notes-title">Software Development Life Cycle (SDLC)</h4>
        <div className="notes-body">
          <p>Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high-quality software.</p>
        </div>
      </div>
      
      <div className="notes-content">
      <FontAwesomeIcon icon={faAnglesRight} className="notes-icon" />
       <h4 className="notes-title">Software Development Life Cycle (SDLC)</h4>
        <div className="notes-body">
          <p>Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high-quality software.</p>
        </div>
      </div>
      
      <div className="notes-content">
      <FontAwesomeIcon icon={faAnglesRight} className="notes-icon"/>  
      <h4 className="notes-title">Software Development Life Cycle (SDLC)</h4>
        <div className="notes-body">
          <p>Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high-quality software.</p>
        </div>
      </div>
      
      <div className="notes-content">
      <FontAwesomeIcon icon={faAnglesRight} className="notes-icon" /> 
       <h4 className="notes-title">Software Development Life Cycle (SDLC)</h4>
        <div className="notes-body">
          <p>Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high-quality software.</p>
        </div>
      </div>
      <br></br><br></br>
          </>
        );
      case "PostQuestion":
        return ( 
          <>
          <form className="question-form">
            <input type="text" placeholder="Enter your question"/>
            <br></br><br></br>
            <button type="submit">Post a Question</button>
          </form>
          <br></br>
          <div className="post-question">
            <b>Q. What is SDLC?</b>
            <br></br>
            <div className="post-question-body">
              <p>A. Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high quality softwares. </p>
            </div>
          </div>

          <div className="post-question">
            <b>Q. What is SDLC?</b>
            <br></br>
          </div>
          
          <div className="post-question">
            <b>Q. What is SDLC?</b>
            <br></br>
          </div>

          <div className="post-question ">
            <b>Q. What is SDLC?</b>
            <br></br>
            <div className="post-question-body">
              <p>A. Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high quality softwares. </p>
            </div>
          </div>
          <br></br><br></br>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Tab.Container className="main-Tab" id="tabs" defaultActiveKey="Overview">
        <br></br>
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="justify-content-center" style={{ display: 'flex', justifyContent: 'center',marginRight: '300px' }}>
              <Nav.Item>
                <Nav.Link
                  eventKey="Overview"
                  style={activeTab === "Overview" ? tabStyles.active : tabStyles.default}
                  onClick={() => setActiveTab("Overview")}
                >
                  Overview
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Q&A"
                  style={activeTab === "Q&A" ? tabStyles.active : tabStyles.default}
                  onClick={() => setActiveTab("Q&A")}
                >
                  Q&A
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Notes"
                  style={activeTab === "Notes" ? tabStyles.active : tabStyles.default}
                  onClick={() => setActiveTab("Notes")}
                >
                  Notes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="PostQuestion"
                  style={activeTab === "PostQuestion" ? tabStyles.active : tabStyles.default}
                  onClick={() => setActiveTab("PostQuestion")}
                >
                  Post a Question
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <br></br>
          <Col sm={9} className="mt-4">
            <Tab.Content>
              <Tab.Pane eventKey="Overview" className="text-start" >
                {renderContent()}
              </Tab.Pane>
              <Tab.Pane eventKey="Q&A">
                {renderContent()}
              </Tab.Pane>
              <Tab.Pane eventKey="Notes">
                {renderContent()}
              </Tab.Pane>
              <Tab.Pane eventKey="PostQuestion">
                {renderContent()}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default TabComponent;
