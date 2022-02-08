import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import news from "../constants/newsConstants";

const NewsComponent = (count = 100) => {
  return (
    <div className="">
      <ul className="list-group">
        <li className="lead list-group-item active">
          <strong className="lead list-group-item active">Информация: </strong>
        </li>
        {news.slice(0, count.count).map((news_elem, index) => (
          <li
            key={index}
            className={
              news_elem.Status !== "active"
                ? "list-group-item bg-secondary bg-opacity-10"
                : "list-group-item bg-success bg-opacity-10"
            }
          >
            <div className="d-flex">
              {news_elem.Status !== "active" ? (
                <strong className="text-secondary text-start">
                  (в разработке)
                </strong>
              ) : (
                <strong className="text-success text-start">(завершено)</strong>
              )}
              <LinkContainer
                to={news_elem.Link}
                className={
                  news_elem.Link !== "#"
                    ? "text-secondary text-end"
                    : "text-secondary text-end disabled"
                }
              >
                <Nav.Link className="">
                  {news_elem.Title}
                  {news_elem.Link !== "#" ? (
                    <small className="text-primary"> (ссылка)</small>
                  ) : (
                    ""
                  )}
                </Nav.Link>
              </LinkContainer>
            </div>
            <small>
              {news_elem.Description}
              {news_elem.Helps ? (
                <small className="text-secondary"> ({news_elem.Helps})</small>
              ) : (
                ""
              )}
              {news_elem.Danger ? (
                <small className="text-danger"> ({news_elem.Danger})</small>
              ) : (
                ""
              )}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;
