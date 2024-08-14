import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaChartLine,
  FaTags,
  FaFileAlt,
  FaUserTie,
  FaUserGraduate,
  FaCalendarAlt,
  FaBullhorn,
  FaStar,
  FaCertificate,
  FaComments,
  FaClone,
  FaArchive,
  FaFolderOpen,
} from "react-icons/fa";
const routes = {
  courseManagement: {
    path: "/course-management",
    subRoutes: {
      courseList: "/course-management/course-list",
      analytics: "/course-management/analytics",
      categoriesTags: "/course-management/categories-tags",
      contentRepository: "/course-management/content-repository",
      instructorManagement: "/course-management/instructor-management",
      studentEnrollment: "/course-management/student-enrollment",
      scheduleManagement: "/course-management/schedule-management",
      announcements: "/course-management/announcements",
      feedbackReviews: "/course-management/feedback-reviews",
      certificationManagement: "/course-management/certification-management",
      forumManagement: "/course-management/forum-management",
      prerequisitesManagement: "/course-management/prerequisites-management",
      courseTemplates: "/course-management/course-templates",
      archivedCourses: "/course-management/archived-courses",
      resourceManagement: "/course-management/resource-management",
    },
  },
};
// Sidebar Container
const SidebarContainer = styled.div`
  width: 350px;
  background-color: #f4f4f4;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
`;

// Topic Container
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

// Topic Title
const TopicTitle = styled.h3`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .icon {
    margin-right: 10px;
  }
`;

// Subtopics Container
const SubtopicsContainer = styled.div`
  display: ${({ expanded }) => (expanded ? "block" : "none")};
  background-color: #fafafa;
`;

// Subtopic Item
const SubtopicItem = styled.li`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #b7b7b7;
  }
`;
const SubtopicListContainer = styled.ul`
  padding: 0px;
  list-style-type: none; /* Removes default bullet points */
`;
const StyledLink = styled(Link)`
  text-decoration: none; /* Removes the default underline */
  color: #007bff; /* Default link color */

  &:hover {
    color: #0056b3; /* Darker shade on hover */
    text-decoration: underline; /* Underline on hover for emphasis */
  }

  &:active {
    color: #004085; /* Even darker shade when active */
  }

  &:visited {
    color: #6610f2; /* Color for visited links */
  }
`;
export const LMSSidebar = () => {
  const location = useLocation();
  const [expandedTopic, setExpandedTopic] = useState(null);

  const handleToggle = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  const topics = [
    {
      title: "Course Management",
      icon: <FaBook className="icon" />,
      subtopics: [
        {
          name: "Course List",
          path: routes.courseManagement.subRoutes.courseList,
        },
        {
          name: "Analytics Dashboard",
          path: routes.courseManagement.subRoutes.analytics,
        },
        {
          name: "Categories & Tags",
          path: routes.courseManagement.subRoutes.categoriesTags,
        },
        {
          name: "Content Repository",
          path: routes.courseManagement.subRoutes.contentRepository,
        },
        {
          name: "Instructor Management",
          path: routes.courseManagement.subRoutes.instructorManagement,
        },
        {
          name: "Student Enrollment",
          path: routes.courseManagement.subRoutes.studentEnrollment,
        },
        {
          name: "Course Schedule",
          path: routes.courseManagement.subRoutes.scheduleManagement,
        },
        {
          name: "Announcements & Notifications",
          path: routes.courseManagement.subRoutes.announcements,
        },
        {
          name: "Feedback & Reviews",
          path: routes.courseManagement.subRoutes.feedbackReviews,
        },
        {
          name: "Certification Management",
          path: routes.courseManagement.subRoutes.certificationManagement,
        },
        {
          name: "Discussion Forum Management",
          path: routes.courseManagement.subRoutes.forumManagement,
        },
        {
          name: "Prerequisites Management",
          path: routes.courseManagement.subRoutes.prerequisitesManagement,
        },
        {
          name: "Course Cloning & Templates",
          path: routes.courseManagement.subRoutes.courseTemplates,
        },
        {
          name: "Archived Courses",
          path: routes.courseManagement.subRoutes.archivedCourses,
        },
        {
          name: "Resource Management",
          path: routes.courseManagement.subRoutes.resourceManagement,
        },
      ],
    },
  ];

  return (
    <SidebarContainer>
      {topics.map((topic, index) => (
        <TopicContainer key={index}>
          <TopicTitle
            className={expandedTopic === index ? "active" : ""}
            onClick={() => handleToggle(index)}
          >
            {topic.icon} {topic.title}
            {expandedTopic === index ? <FaChevronUp /> : <FaChevronDown />}
          </TopicTitle>
          <SubtopicsContainer expanded={expandedTopic === index}>
            <SubtopicListContainer>
              {topic.subtopics.map((subtopic, subIndex) => (
                <SubtopicItem key={subIndex}>
                  <StyledLink to={`/lms${subtopic.path}`}>
                    {subtopic.name}
                  </StyledLink>
                </SubtopicItem>
              ))}
            </SubtopicListContainer>
          </SubtopicsContainer>
        </TopicContainer>
      ))}
    </SidebarContainer>
  );
};
