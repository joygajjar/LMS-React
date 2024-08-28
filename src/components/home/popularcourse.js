import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBusinessTime,
  faCashRegister,
  faCode,
  faDatabase,
  faGear,
  faGears,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faPython } from "@fortawesome/free-brands-svg-icons";

export const Popularcourse = () => {
  return (
    <React.Fragment>
      <div>
        <section class="services p-5" id="services">
          <div class="container">
            <div class="main-txt">
              <h1>
                Popular <span> Category</span>
              </h1>
            </div>

            <div class="row" style={{ marginTop: "30px" }}>
              <div class="col-md-3 py-3 py-md-0">
                <Link to="/coursecategory">
                  <div class="card">
                    <FontAwesomeIcon className="p-4 fs-2" icon={faGears} />
                    <div class="card-body">
                      <h3>Machine learning</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div class="col-md-3 py-3 py-md-0">
                <div class="card">
                  <FontAwesomeIcon
                    className="p-4 fs-2"
                    size="xl"
                    icon={faPython}
                  />
                  <div class="card-body">
                    <h3>Python</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 py-3 py-md-0">
                <div class="card">
                  <FontAwesomeIcon className="p-4 fs-2" icon={faNetworkWired} />
                  <div class="card-body">
                    <h3>Networking</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 py-3 py-md-0">
                <div class="card">
                  <FontAwesomeIcon className="p-4 fs-2" icon={faCode} />
                  <div class="card-body">
                    <h3>Web Designing</h3>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" style={{ marginTop: "30px" }}>
              <div class="col-md-3 py-3 py-md-0">
                <div class="card">
                  <FontAwesomeIcon className="p-4 fs-2" icon={faBolt} />
                  <div class="card-body">
                    <h3>Electrical</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 py-3 py-md-0">
                <div class="card">
                  <FontAwesomeIcon className="p-4 fs-2" icon={faDatabase} />
                  <div class="card-body">
                    <h3>Data Analytics</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 py-3 py-md-0">
                <div class="card">
                  <FontAwesomeIcon className="p-4 fs-2" icon={faBusinessTime} />
                  <div class="card-body">
                    <h3>MBA</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 py-3 py-md-0">
                <div class="card">
                  <FontAwesomeIcon className="p-4 fs-2" icon={faCashRegister} />
                  <div class="card-body">
                    <h3>Accounting</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};
