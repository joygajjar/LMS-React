import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../../services/courseService";
export const useEditCourse = () => {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getAllCourses();
      setCourseList(courses);
    };

    fetchCourses();
  }, []);
  return {
    courseList,
  };
};
