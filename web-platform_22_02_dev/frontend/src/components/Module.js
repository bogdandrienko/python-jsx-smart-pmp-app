import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const Module = (module = {}) => {
  return (
    <div className="border shadow text-center p-0 m-0">
      <div className="card-header lead">{module.module["Header"]}</div>
      <div className="text-center">
        <img src={module.module["Image"]} className="img-fluid w-50" alt="id" />
      </div>
      {module.module["Sections"]
        ? module.module["Sections"].map((section, section_i) => (
            <div key={section_i} className="card-body text-end p-0 m-0">
              <div className="card">
                <li className="list-group-item list-group-item-action active disabled d-flex">
                  <div className="">
                    <img
                      src={section["Image"]}
                      className="img-fluid w-25"
                      alt="id"
                    />
                  </div>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>
                      <small className="fw-bold text-light">
                        {section["Header"]}
                      </small>
                    </Nav.Link>
                  </LinkContainer>
                </li>
                <ul className="list-group-flush">
                  {section["Links"]
                    ? section["Links"].map((link, link_i) =>
                        link["Type"] === "active" ? (
                          <li
                            key={link_i}
                            className="list-group-item list-group-item-action"
                          >
                            <LinkContainer to={link["Link"]}>
                              <Nav.Link>
                                <small className="text-dark">
                                  {link["Header"]}
                                </small>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                        ) : (
                          <li
                            key={link_i}
                            className="list-group-item list-group-item-action disabled"
                          >
                            <LinkContainer
                              to={link["Link"] ? link["Link"] : "#"}
                              className="disabled"
                            >
                              <Nav.Link>
                                <small className="text-muted">
                                  {link["Header"]} (<small className="text-danger">В РАЗРАБОТКЕ</small>)
                                </small>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                        )
                      )
                    : ""}
                </ul>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Module;
