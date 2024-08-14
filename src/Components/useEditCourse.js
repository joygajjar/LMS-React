import React, { useState } from "react";

export const useEditCourse = () => {
  const [courseDetail, setCourseDetail] = useState([]);

  return {
    courseDetail,
  };
};
