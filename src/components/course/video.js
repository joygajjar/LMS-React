import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faPlay,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const Video = () => {
  const initialTopics = [
    { name: "Introduction", duration: "3 Minutes", watched: false },
    { name: "Topic 2", duration: "4 Minutes", watched: false },
    { name: "Topic 3", duration: "5 Minutes", watched: false },
    { name: "Topic 4", duration: "6 Minutes", watched: false },
    { name: "Topic 5", duration: "7 Minutes", watched: false },
    { name: "Topic 6", duration: "8 Minutes", watched: false },
    { name: "Topic 7", duration: "9 Minutes", watched: false },
    { name: "Topic 8", duration: "10 Minutes", watched: false },
    { name: "Topic 9", duration: "11 Minutes", watched: false },
    { name: "Topic 10", duration: "12 Minutes", watched: false },
    { name: "Topic 11", duration: "13 Minutes", watched: false },
    { name: "Topic 12", duration: "14 Minutes", watched: false },
    { name: "Topic 13", duration: "15 Minutes", watched: false },
  ];

  const [topics, setTopics] = useState(initialTopics);

  const handleToggleWatch = (index) => {
    setTopics(
      topics.map((topic, i) =>
        i === index ? { ...topic, watched: !topic.watched } : topic
      )
    );
  };

  return (
    <div className="course-wrap py-5">
      <Container>
        <div className="video-container">
          <div className="row">
            <div className="col-lg-8">
              <video
                src="http://192.168.1.16:8080/api/stream?userId=1&encodedFileName=series&encodedFileType=mp4"
                controls
                controlsList="nodownload"
              ></video>
            </div>
            <div className="col-lg-4">
              <div className="title">
                <h4>Course Content</h4>
              </div>
              <hr />
              <div className="scrollbar">
                <ListGroup>
                  {topics.map((topic, index) => (
                    <ListGroup.Item
                      key={index}
                      onClick={() => handleToggleWatch(index)}
                    >
                      <div className="d-flex align-items-center mb-1">
                        <FontAwesomeIcon
                          icon={topic.watched ? faSquareCheck : faSquare}
                          className={`me-2 ${
                            topic.watched ? "watched-icon" : "unwatched-icon"
                          }`}
                        />
                        {`Topic ${index + 1} - ${topic.name}`}
                      </div>
                      <div className="faPlay-body">
                        <FontAwesomeIcon icon={faPlay} className="faPlay" />
                        {topic.duration}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Video;
