import React from "react";
import aboutimg from "../assets/images/home-fixed.jpg";

export const About = () => {
  return (
    <React.Fragment>
      <section class="about-section py-3 py-md-5">
        <div class="container">
          <div class="about-txt">
            <h1>
              About <span>Us</span>
            </h1>
          </div>
          <div class="mb-5 py-3 row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div class="col-12 col-lg-6">
              <img
                class="img-fluid rounded"
                loading="lazy"
                src={aboutimg}
                alt="About 2"
              ></img>
            </div>
            <div class="col-12 col-lg-6">
              <div class="row justify-content-xl-center">
                <div class="col-12 col-xl-10">
                  <p class="lead fs-5 mb-3 mb-xl-5">
                    Welcome to our innovative Learning Management System (LMS),
                    designed to enhance education for students, educators, and
                    institutions. Our user-friendly platform offers interactive
                    courses, real-time assessments, and collaborative tools to
                    foster a community of lifelong learners. Join us in
                    transforming the future of education with our
                    cutting-edge LMS.
                  </p>
                  <div class="d-flex align-items-center mb-3">
                    <div class="me-3 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p class="fs-5 m-0">
                        Interactive course & real-time assessments.
                      </p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <div class="me-3 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p class="fs-5 m-0">
                        Easy navigation and accessibility for all users.
                      </p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-4 mb-xl-5">
                    <div class="me-3 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p class="fs-5 m-0">
                        Regular updates to meet modern educational needs.
                      </p>
                    </div>
                  </div>
                  <div className="connect-button">
                    <button
                      type="button"
                      class="btn bsb-btn-xl btn-outline-primary rounded-pill"
                    >
                      Sign up Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
