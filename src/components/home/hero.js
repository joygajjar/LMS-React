import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import bannerLeft from "../assets/images/banner-left.png";
import bannerRight from "../assets/images/banner-right.png";

export const Hero = () => {
  return (
    <React.Fragment>
      <div class="banner-sec">
        <div className="corses-tagline">
          <div className="d-flex align-items-center p-3 bg-white">
            <h2>80k+</h2>
            <h5>Free Courses Listed Online</h5>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 image-position">
              <img src={bannerLeft} />
            </div>
            <div className="col-lg-6">
              <div class="content">
                <h5 className="subtitle-style">Welcome To World</h5>
                <h1>Bring your goals into focus</h1>
                <p>
                  Consectetur a erat nam at. Facilisis magna etiam tempor orci.
                  Sem et tortor consequat id. Fermentum egestas tellus. Nunc eu
                  hendrerit turpis. Fusce non lectus sem. In pellentesque nunc
                  non Donec pretium gravida neque et placerat.
                </p>
                <a href="/signup" className="btn btn-secondary">
                  <FontAwesomeIcon icon={faRightToBracket} className="me-2" />{" "}
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
