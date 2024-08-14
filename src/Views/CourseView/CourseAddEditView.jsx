import React, { useState } from "react";
import styled from "styled-components";
import { FaHome, FaSave } from "react-icons/fa";
import {
  BottomNavigation,
  Button,
  NavigationIcon,
  NavigationText,
  TopNavigation,
} from "../../Components";
import { LMSContentArea } from "./CourseListView";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FormContainer = styled(Box)`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0 auto;
  padding: 20px; /* Added padding for better spacing */
`;

const initialValues = {
  title: "",
  category: "",
  duration: "",
  level: "",
  instructor: "",
  description: "",
  topics: [],
};

export const CourseAddEditView = () => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTopicChange = (event, index) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      topics: prevData.topics.map((topic, i) => {
        if (i === index) {
          return { ...topic, [name]: value };
        }
        return topic;
      }),
    }));
  };

  const handleSubtopicChange = (event, topicIndex, subtopicIndex) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      topics: prevData.topics.map((topic, i) => {
        if (i === topicIndex) {
          return {
            ...topic,
            subtopics: topic.subtopics.map((subtopic, j) => {
              if (j === subtopicIndex) {
                return { ...subtopic, [name]: value };
              }
              return subtopic;
            }),
          };
        }
        return topic;
      }),
    }));
  };

  const handleMediaChange = (event, topicIndex, subtopicIndex, mediaIndex) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      topics: prevData.topics.map((topic, i) => {
        if (i === topicIndex) {
          return {
            ...topic,
            subtopics: topic.subtopics.map((subtopic, j) => {
              if (j === subtopicIndex) {
                return {
                  ...subtopic,
                  media: subtopic.media.map((media, k) => {
                    if (k === mediaIndex) {
                      return { ...media, [name]: value };
                    }
                    return media;
                  }),
                };
              }
              return subtopic;
            }),
          };
        }
        return topic;
      }),
    }));
  };

  const addTopic = () => {
    setFormData((prevData) => ({
      ...prevData,
      topics: [...prevData.topics, { title: "", subtopics: [] }],
    }));
  };

  const addSubtopic = (topicIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      topics: prevData.topics.map((topic, i) => {
        if (i === topicIndex) {
          return {
            ...topic,
            subtopics: [...topic.subtopics, { title: "", media: [] }],
          };
        }
        return topic;
      }),
    }));
  };

  const addMedia = (topicIndex, subtopicIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      topics: prevData.topics.map((topic, i) => {
        if (i === topicIndex) {
          return {
            ...topic,
            subtopics: topic.subtopics.map((subtopic, j) => {
              if (j === subtopicIndex) {
                return {
                  ...subtopic,
                  media: [...subtopic.media, { url: "", type: "" }],
                };
              }
              return subtopic;
            }),
          };
        }
        return topic;
      }),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  const handleAddSubtopic = (topicIndex) => {
    addSubtopic(topicIndex);
  };

  const handleAddMedia = (topicIndex, subtopicIndex) => {
    addMedia(topicIndex, subtopicIndex);
  };

  const handleAddTopic = () => {
    addTopic();
  };

  return (
    <React.Fragment>
      <TopNavigation>
        <NavigationIcon>
          <FaHome />
          <NavigationText>Modify Course</NavigationText>
          <div style={{ width: "24px" }} />
        </NavigationIcon>
      </TopNavigation>

      <LMSContentArea>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Basic Course Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Course details form fields */}
              </Grid>
            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">Topics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {formData.topics.map((topic, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    id={`topic-${index}`}
                    name="title"
                    label="Topic Title"
                    variant="outlined"
                    fullWidth
                    value={topic.title}
                    onChange={(event) => handleTopicChange(event, index)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="button"
                    onClick={() => handleAddSubtopic(index)}
                  >
                    Add Subtopic
                  </Button>
                </Grid>

                {topic.subtopics.map((subtopic, subtopicIndex) => (
                  <Grid container spacing={2} key={subtopicIndex}>
                    <Grid item xs={12}>
                      <TextField
                        id={`subtopic-${index}-${subtopicIndex}`}
                        name="title"
                        label="Subtopic Title"
                        variant="outlined"
                        fullWidth
                        value={subtopic.title}
                        onChange={(event) =>
                          handleSubtopicChange(event, index, subtopicIndex)
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="button"
                        onClick={() => handleAddMedia(index, subtopicIndex)}
                      >
                        Add Media
                      </Button>
                    </Grid>

                    {subtopic.media.map((media, mediaIndex) => (
                      <Grid container spacing={2} key={mediaIndex}>
                        <Grid item xs={12}>
                          <TextField
                            id={`media-${index}-${subtopicIndex}-${mediaIndex}`}
                            name="url"
                            label="Media URL"
                            variant="outlined"
                            fullWidth
                            value={media.url}
                            onChange={(event) =>
                              handleMediaChange(
                                event,
                                index,
                                subtopicIndex,
                                mediaIndex
                              )
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            id={`media-type-${index}-${subtopicIndex}-${mediaIndex}`}
                            name="type"
                            label="Media Type"
                            variant="outlined"
                            fullWidth
                            value={media.type}
                            onChange={(event) =>
                              handleMediaChange(
                                event,
                                index,
                                subtopicIndex,
                                mediaIndex
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="button" onClick={handleAddTopic}>
                Add Topic
              </Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </LMSContentArea>

      <BottomNavigation>
        <Button type="button">
          <FaSave />
          Save
        </Button>
      </BottomNavigation>
    </React.Fragment>
  );
};
