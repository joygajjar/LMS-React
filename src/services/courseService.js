import axios from "axios";

const API_URL = "http://localhost:5050";

// Service to add a course
export const addCourse = async (courseData) => {
  console.log("payload of add course", courseData);
  try {
    const response = await axios.post(`${API_URL}/course`, courseData, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow any origin
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error adding course:", error);
  }
};

// Service to get a course
export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/course`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow any origin
      },
    });
    return response?.data;
  } catch (error) {
    throw new Error("Error fetching course:", error);
  }
};
