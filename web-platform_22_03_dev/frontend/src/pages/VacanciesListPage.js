import React from "react";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import NewsComponent from "../components/NewsComponent";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { news } from "../js/constants";
import { vacancies } from "../js/constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VacanciesListPage = () => {
  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Вакансии"}
        second={"страница доступных вакансий АО 'Костанайские Минералы'."}
      />
      <main className="container text-center">
        <div className="form-control p-3 bg-opacity-10 bg-success">
          <div className="d-flex w-100 align-items-center justify-content-between">
            <div className="w-50">
              Введите часть названия вакансии (или квалификации) и нажмите
              кнопку "Искать"
            </div>
            <form className="w-50">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <input
                  type="search"
                  className="form-control m-1"
                  placeholder="Вводить сюда..."
                  aria-label="Search"
                />
                <button className="btn btn-md btn-success m-1">Искать</button>
              </div>
            </form>
          </div>
        </div>
        <div className="">
          <div className="form-control">
            {vacancies.map((subdivision, subdivision_index) => (
              <ol
                key={subdivision_index}
                className="list-group list-group-flush border-bottom scrollarea p-0 m-0"
              >
                {subdivision.Vacancies.map((vacancy, vacancy_index) => (
                  <li className="list-group-item list-group-item-action py-3 lh-tight form-control p-0 m-0">
                    <div className="card p-0 m-0">
                      <div className="card-header fw-bold lead p-0 m-0 bg-opacity-10 bg-primary">
                        {vacancy.Title}
                      </div>
                      <div className="d-flex w-100 align-items-center justify-content-between p-0 m-0">
                        <div className="w-25 shadow p-0 m-1">
                          <img
                            src={vacancy["Image"]}
                            className="img-fluid w-50 p-0 m-0"
                            alt="изображение"
                          />
                        </div>
                        <div className="w-75 bg-light bg-opacity-10">
                          <div className="card-body p-1">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                              <strong className="fw-bold text-secondary">
                                Опубликовано:
                              </strong>
                              <text className="small">{vacancy.Date}</text>
                            </div>
                          </div>
                          <div className="card-body p-1">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                              <strong className="fw-bold text-secondary">
                                Образование:
                              </strong>
                              <text className="small">{vacancy.Education}</text>
                            </div>
                          </div>
                          <div className="card-body p-1">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                              <strong className="fw-bold text-secondary">
                                Квалификация:
                              </strong>
                              <text className="small">
                                {vacancy.Qualification}
                              </text>
                            </div>
                          </div>
                          {vacancy.Rank !== "" && (
                            <div className="card-body p-1">
                              <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="fw-bold text-secondary">
                                  Разряд:
                                </strong>
                                <text className="small">{vacancy.Rank}</text>
                              </div>
                            </div>
                          )}
                          <div className="card-body d-flex w-100 align-items-center justify-content-between p-1">
                            <strong className="fw-bold text-secondary">
                              Описание:
                            </strong>
                            <text className="small">{vacancy.Description}</text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            ))}

            {/*{news.slice(0, count.count).map((news_elem, index) => (*/}
            {/*  <div key={index}>*/}
            {/*    <a*/}
            {/*      href={news_elem.Link}*/}
            {/*      className={*/}
            {/*        news_elem.Status !== "active"*/}
            {/*          ? "list-group-item list-group-item-action py-1 lh-tight bg-secondary bg-opacity-10"*/}
            {/*          : "list-group-item list-group-item-action py-1 lh-tight bg-success bg-opacity-10"*/}
            {/*      }*/}
            {/*    >*/}
            {/*      <div className="d-flex w-100 align-items-center justify-content-between">*/}
            {/*        <strong className="mb-1">*/}
            {/*          {news_elem.Title}*/}
            {/*          {news_elem.Link !== "#" ? (*/}
            {/*            <small className="text-primary"> (ссылка)</small>*/}
            {/*          ) : (*/}
            {/*            ""*/}
            {/*          )}*/}
            {/*        </strong>*/}
            {/*        <small className="text-muted">*/}
            {/*          {news_elem.Status !== "active" ? (*/}
            {/*            <strong className="text-secondary text-start">*/}
            {/*              (в разработке)*/}
            {/*            </strong>*/}
            {/*          ) : (*/}
            {/*            <strong className="text-success text-start">*/}
            {/*              (завершено)*/}
            {/*            </strong>*/}
            {/*          )}*/}
            {/*        </small>*/}
            {/*      </div>*/}
            {/*      <div className="col-10 mb-1 small">*/}
            {/*        {news_elem.Description}*/}
            {/*        {news_elem.Helps ? (*/}
            {/*          <small className="text-secondary"> ({news_elem.Helps})</small>*/}
            {/*        ) : (*/}
            {/*          ""*/}
            {/*        )}*/}
            {/*        {news_elem.Danger ? (*/}
            {/*          <small className="text-danger"> ({news_elem.Danger})</small>*/}
            {/*        ) : (*/}
            {/*          ""*/}
            {/*        )}*/}
            {/*      </div>*/}
            {/*    </a>*/}
            {/*  </div>*/}
            {/*))}*/}
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default VacanciesListPage;
