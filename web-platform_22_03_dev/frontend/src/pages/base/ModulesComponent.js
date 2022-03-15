import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ModulesComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const userDetailsAuthStore = useSelector(
    (state) => state.userDetailsAuthStore
  );
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsAuthStore;

  useEffect(() => {
    if (!dataUserDetails) {
      dispatch(actions.userDetailsAction());
    }
  }, [dispatch]);

  return (
    <div>
      {constants.modules && (
        <div>
          <h2>Модули:</h2>
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
              {constants.modules.map(
                (module, module_i) =>
                  utils.CheckAccess(userDetailsAuthStore, module.Access) &&
                  module.ShowInModules && (
                    <div key={module_i} className="border shadow text-center  ">
                      <div className="card-header lead">{module["Header"]}</div>
                      <div className="text-center">
                        <img
                          src={module["Image"]}
                          className="img-fluid w-25"
                          alt="id"
                        />
                      </div>
                      {module["Sections"]
                        ? module["Sections"].map(
                            (section, section_i) =>
                              utils.CheckAccess(
                                userDetailsAuthStore,
                                section.Access
                              ) && (
                                <div
                                  key={section_i}
                                  className="card-body text-end  "
                                >
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled d-flex  ">
                                      <div className="">
                                        <img
                                          src={section["Image"]}
                                          className="img-fluid w-25"
                                          alt="id"
                                        />
                                      </div>
                                      <LinkContainer
                                        to="#"
                                        className="disabled"
                                      >
                                        <Nav.Link>
                                          <small className="fw-bold text-light">
                                            {section["Header"]}
                                          </small>
                                        </Nav.Link>
                                      </LinkContainer>
                                    </li>
                                    <ul className="list-group-flush   m-1">
                                      {section["Links"]
                                        ? section["Links"].map((link, link_i) =>
                                            link["Active"]
                                              ? utils.CheckAccess(
                                                  userDetailsAuthStore,
                                                  link.Access
                                                ) &&
                                                link.ShowLink && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action  "
                                                  >
                                                    {link.ExternalLink ? (
                                                      <a
                                                        key={link_i}
                                                        className={
                                                          link["Active"]
                                                            ? "text-dark dropdown-item"
                                                            : "disabled"
                                                        }
                                                        href={link["Link"]}
                                                        target="_self"
                                                      >
                                                        {link["Header"]}
                                                      </a>
                                                    ) : (
                                                      <LinkContainer
                                                        to={link["Link"]}
                                                      >
                                                        <Nav.Link>
                                                          <small className="text-dark">
                                                            {link["Header"]}
                                                          </small>
                                                        </Nav.Link>
                                                      </LinkContainer>
                                                    )}
                                                  </li>
                                                )
                                              : utils.CheckAccess(
                                                  userDetailsAuthStore,
                                                  link.Access
                                                ) &&
                                                link.ShowLink && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action disabled   m-1"
                                                  >
                                                    <LinkContainer
                                                      to={
                                                        link["Link"]
                                                          ? link["Link"]
                                                          : "#"
                                                      }
                                                      className="disabled"
                                                    >
                                                      <Nav.Link>
                                                        <small className="text-muted">
                                                          {link["Header"]} (
                                                          <small className="text-danger">
                                                            В РАЗРАБОТКЕ
                                                          </small>
                                                          )
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
                              )
                          )
                        : ""}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesComponent;
