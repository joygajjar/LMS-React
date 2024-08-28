import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import course_image from "../assets/images/course_image.jpg";
import graphicImg from "../assets/images/graphic-design.png";
import { Arrows, Border } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const FeaturedCourses = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    centerMode: false,
    Arrows: true,
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="category-wrap py-5">
        <div className="container-fluid">
          <div className="content pb-5">
            <h5 className="subtitle-style">Select Your</h5>
            <h1 className="title-style">
              Explore Top Courses <span>Categories</span>
            </h1>
          </div>
          <Slider
            className="featured-courses-slider overflow-hidden"
            {...settings}
          >
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Writing & Translation</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Programming</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>{" "}
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Business</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>{" "}
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Digital Marketing</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>{" "}
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Graphics & Design</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>{" "}
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Lifestyle</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Networking</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>
            <div>
              <Card className="m-2">
                <Card.Link href="#">
                  <Card.Img src={graphicImg} alt="Categories Image" />
                  <Card.Body>
                    <Card.Title>Video & Animation</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </div>
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FeaturedCourses;
