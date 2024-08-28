import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBook } from "@fortawesome/free-solid-svg-icons";
import img from "../assets/images/top-view-hardback-books-with-copy-space.png";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const cards = [
    {
      date: '17 Nov, 2022',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 5,
      image: img,
    },
    {
      date: '14 Dec, 2022',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 4,
      image: img,
    },
    {
      date: '14 Dec, 2022',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 4,
      image: img,
    },
    {
      date: '14 Dec, 2022',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 4,
      image: img,
    },
    {
      date: '14 Dec, 2022',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 4,
      image: img,
    },
    {
      date: '14 Dec, 2022',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 4,
      image: img,
    },
    {
      date: '1 Jan, 2023',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 3,
      image: img,
    },
    {
      date: '1 Jan, 2023',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 3,
      image: img,
    },
    {
      date: '1 Jan, 2023',
      curriculum: '1 Curriculum',
      title: 'Artificial Intelligence',
      university: 'Gujarat Technological University',
      rating: 3,
      image: img,
    },
  ];

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/course');
  };

  return (
    <Container className="categories-container" >
      <div className="course-categories-title">
        <h1>
          <span className="course-title">Course </span>
          <span className="categories-title">Categories</span>
        </h1>
      </div>

      <Form className="form-container">
        <Row className="align-items-end">
          <Col xs={12} lg={3} md={6}>
            <Form.Group className="form-group">
              <Form.Label>Select University</Form.Label>
              <Form.Control as="select" defaultValue="">
                <option value="" disabled>Select</option>
                <option>University A</option>
                <option>University B</option>
                <option>University C</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} lg={3} md={6}>
            <Form.Group className="form-group">
              <Form.Label>Select Course</Form.Label>
              <Form.Control as="select" defaultValue="">
                <option value="" disabled>Select</option>
                <option>Course X</option>
                <option>Course Y</option>
                <option>Course Z</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} lg={3} md={6}>
            <Form.Group className="form-group">
              <Form.Label>Select Topic</Form.Label>
              <Form.Control as="select" defaultValue="">
                <option value="" disabled>Select</option>
                <option>Topic 1</option>
                <option>Topic 2</option>
                <option>Topic 3</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} lg={3} md={6} className="filter-button">
            <Button type="submit" className="btn btn-primary">Filter</Button>
          </Col>
        </Row>
      </Form>

      <div className="cards-container">
        <Row xs={1} md={2} lg={3} className="g-4 mb-5">
          {cards.map((card, idx) => (
            <Col key={idx} className="d-flex justify-content-center">
              <Card className="card" onClick={handleCardClick}>
                <Card.Img variant="top" src={card.image} alt={`Course image ${idx + 1}`} />
                <Card.Body className="card-body">
                  <Row className="info-row">
                    <Col xs={6} className="info-item clock">
                      <FontAwesomeIcon icon={faClock} className="icon" />
                      <span>{card.date}</span>
                    </Col>
                    <Col xs={6} className="info-item book">
                      <FontAwesomeIcon icon={faBook} className="icon" />
                      <span>{card.curriculum}</span>
                    </Col>
                  </Row>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.university}</Card.Text>
                  <hr />
                  <div className="rating">
                    {'★'.repeat(card.rating)}
                    {'☆'.repeat(5 - card.rating)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Categories;
