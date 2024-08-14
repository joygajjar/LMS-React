import React, { useState } from "react";
import styled from "styled-components";
import {
  FaChevronDown,
  FaChevronUp,
  FaAngleLeft,
  FaBook,
  FaTrophy,
} from "react-icons/fa";
// Sidebar Container
const SidebarContainer = styled.div`
  width: 450px; /* Width of the sidebar */
  background-color: #f4f4f4;
  box-sizing: border-box;
  position: fixed; /* Fixed position on the left */
  left: 0;
  top: 0px; /* Height of the TopNavigation */
  bottom: 0px; /* Height of the BottomNavigation */
  overflow-y: auto; /* Enable vertical scrolling */
`;

// Top Navigation Container
const TopNavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Spacing between elements */
  margin-bottom: 20px; /* Space below the top navigation */
  background: #9fc5e8;
  color: white;
`;
const DashboardLinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  a {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
  }
  i {
    margin-right: 8px;
  }
`;

// Course Title Section
const CourseTitleContainer = styled.div`
  text-align: start;
  padding: 15px;
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: white;
  }
`;

// Navigation Links Section (Chapters & Achievements)
const NavigationLinksContainer = styled.ul`
  list-style-type: none;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 18px;

  li {
    a {
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
    }
    i {
      margin-right: 18px;
    }
  }
`;
const TopicContainer = styled.li`
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// Title of the topic, which can be clicked to expand/collapse the subtopics
const TopicTitle = styled.h3`
  font-size: 18px;
  padding: 0px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-left: 18px;
  .icon {
    margin-right: 10px;
  }
`;

// Container for the subtopics, shown or hidden based on the expanded state
const SubtopicsContainer = styled.div`
  display: ${({ expanded }) => (expanded ? "block" : "none")};
  padding: 0px;
  background-color: #fafafa;
`;

// List of subtopics
const SubtopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Each subtopic item
const SubtopicItem = styled.li`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #b7b7b7;
  }
`;

// Container for the details of the subtopic (icon and type)
const SubtopicDetails = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 5px;
  }

  .type {
    font-size: 12px;
    color: #888;
  }
`;

// Container for the status of the subtopic
const SubtopicStatus = styled.div`
  .status-icon {
    font-size: 14px;
    color: #4caf50; // For example, green color for a completed subtopic
  }
`;
// Sidebar Content Component
export const ContentSidebar = () => {
  let data = {
    topics: [
      {
        title: "Introduction",
        subtopics: ["Overview", "Setup", "Getting Started"],
      },
      {
        title: "Core Concepts",
        subtopics: ["Components", "Props", "State"],
      },
      {
        title: "Advanced Topics",
        subtopics: ["Hooks", "Context API", "React Router"],
      },
    ],
  };
  const [expandedTopic, setExpandedTopic] = useState(null);

  const handleToggle = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  return (
    <SidebarContainer>
      <TopNavigationContainer>
        {/* Dashboard Link Section */}
        <DashboardLinkContainer>
          <a href="/enrollments">
            <FaAngleLeft />
            <span>Go to Dashboard</span>
          </a>
        </DashboardLinkContainer>

        {/* Course Title Section */}
        <CourseTitleContainer>
          <h2>M2 - Basics of React and Node</h2>
        </CourseTitleContainer>

        {/* Navigation Links Section */}
        <NavigationLinksContainer>
          <li>
            <a href="/courses/take/copy-of-m2-fundamentals-of-react/chapters">
              <FaBook />
              <span>Chapters</span>
            </a>
          </li>
          <li>
            <a href="/courses/take/copy-of-m2-fundamentals-of-react/enrollment">
              <FaTrophy />
              <span>Achievements & Progress</span>
            </a>
          </li>
        </NavigationLinksContainer>
      </TopNavigationContainer>

      {/* Other Sidebar Content */}
      {data.topics.map((topic, index) => (
        <TopicContainer key={index}>
          <TopicTitle
            className={expandedTopic === index ? "active" : ""}
            onClick={() => handleToggle(index)}
          >
            {topic.title}
            {expandedTopic === index ? <FaChevronUp /> : <FaChevronDown />}
          </TopicTitle>
          <SubtopicsContainer expanded={expandedTopic === index}>
            <SubtopicList>
              {topic.subtopics.map((subtopic, subIndex) => (
                <SubtopicItem key={subIndex}>{subtopic}</SubtopicItem>
              ))}
            </SubtopicList>
          </SubtopicsContainer>
        </TopicContainer>
      ))}
    </SidebarContainer>
  );
};
