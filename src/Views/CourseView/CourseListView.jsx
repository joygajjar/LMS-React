import React from "react";
import {
  BottomNavigation,
  Button,
  ContentContainer,
  NavigationIcon,
  NavigationText,
  TopNavigation,
} from "../../Components";
import {
  FaHome,
  FaEllipsisV,
  FaChartLine,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEditCourse } from "./hooks/useCourseEdit";

// Styled Components
export const LMSContentArea = styled.main`
  position: absolute;
  flex: 1; /* Takes up remaining space */
  display: flex;
  flex-direction: column;
  width: calc(100% - 350px); /* Full width */
  margin-top: 100px; /* Height of the TopNavigation */
  margin-bottom: 100px; /* Height of the BottomNavigation */
  padding: 0px;
  margin-right: 0px;
  left: 350px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 12px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:last-child {
    border-bottom: 2px solid #ddd;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 5px;
  color: #333;
  &:hover {
    color: #007bff;
  }
`;

const ActionIcons = styled.div`
  display: flex;
  align-items: center;
`;

const ModalOverlay = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  max-width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

// Sample Data
const courseData = [
  {
    _id: "66b9f55224c97e48e9d25bab",
    title: "Introduction to React",
    description: "A comprehensive course on React.js...",
    category: "Programming",
    duration: "4 weeks",
    level: "Intermediate",
    prerequisites: "Basic knowledge of JavaScript",
    enrollmentDates: "2024-08-01 to 2024-08-31",
    instructor: "John Doe",
    topics: [
      {
        title: "React Basics",
        subtopics: [
          {
            title: "Components",
            media: [
              {
                url: "http://example.com/media/intro-to-react.mp4",
                type: "video",
              },
              {
                url: "http://example.com/media/react-basics.pdf",
                type: "pdf",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const CourseListView = () => {
  const navigate = useNavigate();
  const { courseList } = useEditCourse();
  console.log("courseList", courseList);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);

  // Handler for actions
  const handleActionClick = (action, course) => {
    console.log(`${action} action clicked for course: ${course.title}`);
    if (action === "visualize") {
      setSelectedCourse(course);
      setModalVisible(true);
    }
    // Implement actions like edit and delete if needed
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCourse(null);
  };

  return (
    <React.Fragment>
      <TopNavigation>
        <NavigationIcon>
          <FaHome />
          <NavigationText>Course List View</NavigationText>
          <div style={{ width: "24px" }} />
        </NavigationIcon>
      </TopNavigation>

      <LMSContentArea>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Duration</TableHeader>
                <TableHeader>Level</TableHeader>
                <TableHeader>Prerequisites</TableHeader>
                <TableHeader>Enrollment Dates</TableHeader>
                <TableHeader>Total Topics</TableHeader>
                <TableHeader>Total Subtopics</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course) => {
                const totalTopics = course.topics.length;
                const totalSubtopics = course.topics.reduce(
                  (acc, topic) => acc + topic.subtopics.length,
                  0
                );
                return (
                  <TableRow key={course._id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.prerequisites}</TableCell>
                    <TableCell>{course.enrollmentDates}</TableCell>
                    <TableCell>{totalTopics}</TableCell>
                    <TableCell>{totalSubtopics}</TableCell>
                    <TableCell>
                      <ActionIcons>
                        <ActionButton
                          onClick={() => handleActionClick("visualize", course)}
                        >
                          <FaChartLine />
                        </ActionButton>
                        <ActionButton
                          onClick={() =>
                            navigate(
                              `/lms/course-management/course-update/${course._id}`
                            )
                          }
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleActionClick("delete", course)}
                        >
                          <FaTrash />
                        </ActionButton>
                      </ActionIcons>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>

          <ModalOverlay show={modalVisible}>
            <ModalContent>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
              <h2>Course Visualization</h2>
              <p>Visualize the hierarchy for course: {selectedCourse?.title}</p>
              {/* Add more visualization or content here */}
            </ModalContent>
          </ModalOverlay>
        </TableContainer>
      </LMSContentArea>

      <BottomNavigation>
        <Button>In Progress</Button>
      </BottomNavigation>
    </React.Fragment>
  );
};
