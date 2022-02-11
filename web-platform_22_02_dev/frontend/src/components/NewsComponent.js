import React from "react";
import { news } from "../js/constants";

const NewsComponent = (count = 100) => {
  return (
    <div className="">
      <div className="list-group list-group-flush border-bottom scrollarea">
        <a
          href="/news"
          className="list-group-item list-group-item-action active py-3 lh-tight"
          aria-current="true"
        >
          <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1 lead">Информация</strong>
            <strong className="text-warning">Свежие сверху</strong>
          </div>
          <div className="col-10 mb-1 small">
            нажмите для перехода на страницу со всеми новостями
          </div>
        </a>

        {news.slice(0, count.count).map((news_elem, index) => (
          <div>
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
                  {news_elem.Link !== "#" ? (
                    <small className="text-primary"> (ссылка)</small>
                  ) : (
                    ""
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
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
