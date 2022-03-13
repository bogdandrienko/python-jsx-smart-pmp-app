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

const NewsComponent = (count = 100) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div className="">
      <div className="list-group list-group-flush border-bottom scrollarea  ">
        <LinkContainer to="/news" className=" ">
          <Nav.Link>
            <div
              className="list-group-item list-group-item-action active m-0 p-1 lh-tight shadow"
              aria-current="true"
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1 lead">Лента</strong>
                <strong className="text-warning">Свежие сверху</strong>
              </div>
              {count.count <= 9 && (
                <div className="col-10 mb-1 small">
                  нажмите сюда для просмотра всех изменений
                </div>
              )}
            </div>
          </Nav.Link>
        </LinkContainer>
        {constants.news.slice(0, count.count).map((news_elem, index) => (
          <div key={index}>
            <a
              href={news_elem.Link}
              className={
                news_elem.Status !== "active"
                  ? "list-group-item list-group-item-action py-1 lh-tight bg-secondary bg-opacity-10"
                  : "list-group-item list-group-item-action py-1 lh-tight bg-success bg-opacity-10"
              }
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1">
                  {news_elem.Title}
                  {news_elem.Link !== "#" && (
                    <small className="text-primary"> (ссылка)</small>
                  )}
                </strong>
                <small className="text-muted">
                  {news_elem.Status !== "active" ? (
                    <strong className="text-secondary text-start">
                      (в разработке)
                    </strong>
                  ) : (
                    <strong className="text-success text-start">
                      (завершено)
                    </strong>
                  )}
                </small>
              </div>
              <div className="col-10 mb-1 small">
                {news_elem.Description}
                {news_elem.Helps && (
                  <small className="text-secondary"> ({news_elem.Helps})</small>
                )}
                {news_elem.Danger && (
                  <small className="text-danger"> ({news_elem.Danger})</small>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
