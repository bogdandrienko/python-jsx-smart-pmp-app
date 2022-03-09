import React, { useEffect } from "react";
import { modules } from "../js/constants";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAuthAction } from "../js/actions";

const ModulesComponent = () => {
  const dispatch = useDispatch();

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  useEffect(() => {
    if (!dataUserDetails) {
      dispatch(userDetailsAuthAction());
    }
  }, [dispatch]);

  function checkAccess(slug = "") {
    if (dataUserDetails) {
      if (dataUserDetails["group_model"]) {
        return dataUserDetails["group_model"].includes(slug);
      }
      return false;
    }
    return false;
  }

  return (
    <div>
      <h2>Модули:</h2>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
          {modules
            ? modules.map(
                (module, module_i) =>
                  checkAccess(module.Access) &&
                  module.ShowInModules && (
                    <div
                      key={module_i}
                      className="border shadow text-center p-0 m-0"
                    >
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
                              checkAccess(section.Access) && (
                                <div
                                  key={section_i}
                                  className="card-body text-end p-0 m-0"
                                >
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled d-flex p-0 m-0">
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
                                    <ul className="list-group-flush p-0 m-1">
                                      {section["Links"]
                                        ? section["Links"].map((link, link_i) =>
                                            link["Active"]
                                              ? checkAccess(link.Access) && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action p-0 m-0"
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
                                              : checkAccess(link.Access) && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action disabled p-0 m-1"
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
              )
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ModulesComponent;