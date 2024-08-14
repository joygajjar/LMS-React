import React from "react";
import styled from "styled-components";
import { LMSSidebar } from "./LMSSidebar";
import { Route, Routes } from "react-router-dom";
import { CourseView } from "../Views/CourseView/CourseView";
export const LMSCourseLayout = () => {
  const MainLayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  `;
  const ContentArea = styled.div`
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  `;
  return (
    <React.Fragment>
      <MainLayoutContainer>
        <LMSSidebar />
        <ContentArea>
          <Routes>
            <Route path="/course-management/*" element={<CourseView />} />

            {/* <Route path="/add-course" element={<AddCourse />} />
            <Route path="/update-course" element={<UpdateCourse />} />
            <Route path="/delete-course" element={<DeleteCourse />} /> */}
            {/* Add more routes as needed */}
          </Routes>
        </ContentArea>
      </MainLayoutContainer>
    </React.Fragment>
  );
};
