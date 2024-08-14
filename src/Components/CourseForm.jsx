import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { addCourse } from "../services/courseService";

// Container for the form
const FormContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Form Title
const FormTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

// Form Grid
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

// Form Field
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

// Field Label
const FieldLabel = styled.label`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;

// Field Input
const FieldInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Dropdown for Select Fields
const FieldSelect = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Textarea for multi-line input
const FieldTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Section for adding topics and subtopics
const TopicSection = styled.div`
  margin-bottom: 30px;
`;

// Topic Title
const TopicTitle = styled.h3`
  font-size: 22px;
  color: #007bff;
  margin-bottom: 15px;
`;

// Subtopic Section
const SubtopicSection = styled.div`
  margin-bottom: 20px;
`;

// Subtopic Title
const SubtopicTitle = styled.h4`
  font-size: 18px;
  color: #28a745;
  margin-bottom: 10px;
`;

// Media Section
const MediaSection = styled.div`
  margin-bottom: 20px;
`;

// Media Field
const MediaField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

// Media Label
const MediaLabel = styled.label`
  font-size: 14px;
  color: #666;
  margin-right: 10px;
  width: 100px;
`;

// Media Type Selector
const MediaTypeSelector = styled(FieldSelect)`
  margin-right: 10px;
`;

// Button Styling
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${({ bgColor }) => bgColor || "#007bff"};
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#0056b3"};
  }
`;

// Submit Button
const SubmitButton = styled(Button)`
  background-color: #28a745;
  margin-top: 20px;
  display: block;
  width: 100%;
`;

// Single Field Section
const SingleFieldSection = styled.div`
  margin-bottom: 20px;
`;

// CourseForm Component
export const CourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    prerequisites: "",
    topics: [{ title: "", subtopics: [{ title: "", media: [] }] }],
    enrollmentDates: "",
    instructor: "",
  });

  const [mediaType, setMediaType] = useState("url");

  const handleChange = (e, index, subIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      // Handle the change for topics and subtopics
      if (name.startsWith("topic") || name.startsWith("subtopic")) {
        const topics = [...prevData.topics];
        if (name.startsWith("topic")) {
          topics[index].title = value;
        } else if (name.startsWith("subtopic")) {
          topics[index].subtopics[subIndex].title = value;
        }
        return { ...prevData, topics };
      }

      // Handle other form fields
      return { ...prevData, [name]: value };
    });
  };

  const handleMediaChange = (e, topicIndex, subtopicIndex) => {
    const { name, value } = e.target;
    const topics = [...formData.topics];

    // Initialize media object if it doesn't exist
    if (!topics[topicIndex].subtopics[subtopicIndex].media) {
      topics[topicIndex].subtopics[subtopicIndex].media = {};
    }

    topics[topicIndex].subtopics[subtopicIndex].media[name] = value;
    setFormData({ ...formData, topics });
  };

  const addTopic = () => {
    setFormData((prevData) => ({
      ...prevData,
      topics: [
        ...prevData.topics,
        { title: "", subtopics: [{ title: "", media: [] }] },
      ],
    }));
  };

  const addSubtopic = (index) => {
    const topics = [...formData.topics];
    topics[index].subtopics.push({ title: "", media: [] });
    setFormData({ ...formData, topics });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("post form data", formData);
    try {
      const response = await addCourse(formData);
      console.log("Course added:", response.data);
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        duration: "",
        level: "",
        prerequisites: "",
        topics: [{ title: "", subtopics: [{ title: "", media: [] }] }],
        enrollmentDates: "",
        instructor: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add New Course</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormField>
            <FieldLabel>Course Title</FieldLabel>
            <FieldInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField>
            <FieldLabel>Description</FieldLabel>
            <FieldTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField>
            <FieldLabel>Category</FieldLabel>
            <FieldSelect
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="business">Business</option>
            </FieldSelect>
          </FormField>

          <FormField>
            <FieldLabel>Duration (hours)</FieldLabel>
            <FieldInput
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField>
            <FieldLabel>Difficulty Level</FieldLabel>
            <FieldSelect
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </FieldSelect>
          </FormField>

          <FormField>
            <FieldLabel>Prerequisites</FieldLabel>
            <FieldTextarea
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
            />
          </FormField>

          <FormField>
            <FieldLabel>Enrollment Dates</FieldLabel>
            <FieldInput
              type="date"
              name="enrollmentDates"
              value={formData.enrollmentDates}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField>
            <FieldLabel>Instructor</FieldLabel>
            <FieldInput
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              required
            />
          </FormField>
        </FormGrid>

        <TopicSection>
          <TopicTitle>Topics</TopicTitle>
          {formData.topics.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <FormField>
                <FieldLabel>Topic Title</FieldLabel>
                <FieldInput
                  type="text"
                  name={`topic-${topicIndex}`}
                  value={topic.title}
                  onChange={(e) => handleChange(e, topicIndex)}
                  required
                />
              </FormField>
              {topic.subtopics.map((subtopic, subtopicIndex) => (
                <SubtopicSection key={subtopicIndex}>
                  <SubtopicTitle>Subtopic</SubtopicTitle>
                  <FormField>
                    <FieldLabel>Subtopic Title</FieldLabel>
                    <FieldInput
                      type="text"
                      name={`subtopic-${subtopicIndex}`}
                      value={subtopic.title}
                      onChange={(e) =>
                        handleChange(e, topicIndex, subtopicIndex)
                      }
                      required
                    />
                  </FormField>
                  <MediaSection>
                    <MediaField>
                      <MediaLabel>Media Type</MediaLabel>
                      <MediaTypeSelector
                        name="mediaType"
                        value={mediaType}
                        onChange={(e) => setMediaType(e.target.value)}
                        required
                      >
                        <option value="url">URL</option>
                        <option value="file">File</option>
                      </MediaTypeSelector>
                      <FieldInput
                        type={mediaType === "url" ? "url" : "file"}
                        name={mediaType}
                        value={subtopic.media[mediaType] || ""}
                        onChange={(e) =>
                          handleMediaChange(e, topicIndex, subtopicIndex)
                        }
                        required={mediaType === "url"}
                        disabled={mediaType !== "url"} // Disable input if it's not a URL field
                      />
                    </MediaField>
                  </MediaSection>
                </SubtopicSection>
              ))}
              <Button
                type="button"
                bgColor="#007bff"
                hoverColor="#0056b3"
                onClick={() => addSubtopic(topicIndex)}
              >
                Add Subtopic
              </Button>
            </div>
          ))}
          <Button
            type="button"
            bgColor="#007bff"
            hoverColor="#0056b3"
            onClick={addTopic}
          >
            Add Topic
          </Button>
        </TopicSection>

        <SubmitButton type="submit">Submit Course</SubmitButton>
      </form>
    </FormContainer>
  );
};
