import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { CourseListView } from "./CourseListView";
import { CourseAddEditView } from "./CourseAddEditView";
import { FaHome } from "react-icons/fa";
export const CourseView = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="course-list" element={<CourseListView />}></Route>
        <Route
          path="course-update/:courseId"
          element={<CourseAddEditView />}
        ></Route>
        <Route path="*" element={<Outlet />} />
      </Routes>
    </React.Fragment>
  );
};
