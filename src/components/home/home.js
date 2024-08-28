import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Marquee from "react-fast-marquee";
import Image from "react-bootstrap/Image";
import Homeimg from "../assets/images/Home.webp";
import Aboutimg from "../assets/images/about.webp";
import Logoimg from "../assets/images/logo.png";
import { Container } from "react-bootstrap";
import Heroimg1 from "../assets/images/back-school-witch-school-supplies.png";
import Heroimg2 from "../assets/images/pieces-blue-stationery.png";
import Heroimg3 from "../assets/images/top-view-hardback-books-with-copy-space.png";
import { Hero } from "./hero";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Popularcourse } from "./popularcourse";
import { About } from "./about";
import FeaturedCourses from "./FeaturedCourses";

export const HomeSec = () => {
  return (
    <React.Fragment>
      <Hero />
      <FeaturedCourses />
      <Popularcourse />
      <About />
    </React.Fragment>
  );
};
