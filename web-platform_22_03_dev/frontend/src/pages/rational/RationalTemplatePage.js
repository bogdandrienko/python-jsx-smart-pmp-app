import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { rationalDetailAction } from "../../js/actions";
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import LoaderComponent from "../../components/LoaderComponent";
import MessageComponent from "../../components/MessageComponent";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalTemplatePage = () => {
  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Шаблон рац. предложения"}
        second={"страница содержит шаблон для рац. предложения"}
      />
      <main className="container-fluid text-center">
        <div className="">
          <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-2 nav justify-content-center">
            <li className="container-fluid m-1">
              <div className="card shadow">
                <div>
                  <div className="">
                    <div className="card-header">
                      <h6 className="lead fw-bold">
                        Внедрение солнечных панелей.
                      </h6>
                    </div>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <label className="form-control-sm m-1">
                        Наименование структурного подразделения:
                        <select
                          id="subdivision"
                          name="subdivision"
                          required
                          className="form-control form-control-sm"
                        >
                          <option value="">Энергоуправление</option>
                        </select>
                      </label>
                      <label className="w-100 form-control-sm m-1">
                        Зарегистрировано за №{" "}
                        <strong className="btn btn-light disabled">
                          001-09-03-2022
                        </strong>
                      </label>
                    </div>
                    <div>
                      <label className="form-control-sm m-1">
                        Сфера рац. предложения:
                        <select
                          id="sphere"
                          name="sphere"
                          required
                          className="form-control form-control-sm"
                        >
                          <option value="">Технологическая</option>
                        </select>
                      </label>
                      <label className="form-control-sm m-1">
                        Категория:
                        <select
                          id="category"
                          name="category"
                          required
                          className="form-control form-control-sm"
                        >
                          <option value="">Инновации</option>
                        </select>
                      </label>
                      <div>
                        <label className="form-control-sm m-1">
                          <img
                            src="/static/img/modules/3_module_progress/2_section_rational/sectional_rational.png"
                            className="card-img-top img-fluid w-50"
                            alt="id"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="w-100 form-control-sm m-1">
                        Предполагаемое место внедрения:
                        <input
                          type="text"
                          id="name_char_field"
                          name="name_char_field"
                          required
                          placeholder="Цех / участок / отдел / лаборатория и т.п."
                          value="Участок связи"
                          minLength="1"
                          maxLength="100"
                          className="form-control form-control-sm"
                        />
                      </label>
                    </div>
                    <div>
                      <label className="w-100 form-control-sm m-1">
                        Краткое описание:
                        <textarea
                          required
                          placeholder="Краткое описание"
                          value="Зелёная экономика предлагает современные средства энергообеспечения"
                          minLength="1"
                          maxLength="200"
                          rows="2"
                          className="form-control form-control-sm"
                        />
                      </label>
                      <label className="w-100 form-control-sm m-1">
                        Полное описание:
                        <textarea
                          id="full_description_text_field"
                          name="full_description_text_field"
                          required
                          placeholder="Полное описание"
                          value="Зелёная экономика предлагает современные средства энергообеспечения"
                          minLength="1"
                          maxLength="5000"
                          rows="3"
                          className="form-control form-control-sm"
                        />
                      </label>
                    </div>
                    <div>
                      <label className="form-control-sm m-1">
                        Word файл-приложение:
                        <a className="btn btn-sm btn-primary m-1" href="">
                          Скачать документ
                        </a>
                      </label>
                      <label className="form-control-sm m-1">
                        Pdf файл-приложение:
                        <a className="btn btn-sm btn-danger m-1" href="">
                          Скачать документ
                        </a>
                      </label>
                      <label className="form-control-sm m-1">
                        Excel файл-приложение:
                        <a className="btn btn-sm btn-success m-1" href="">
                          Скачать документ
                        </a>
                      </label>
                    </div>
                    <div>
                      <label className="w-100 form-control-sm m-1">
                        Участники:
                        <input
                          type="text"
                          id="name_char_field"
                          name="name_char_field"
                          placeholder="участник № 1, пример: Андриенко Богдан Николаевич 931777 70%"
                          value="Андриенко Богдан Николаевич 931777 70%"
                          minLength="0"
                          maxLength="200"
                          className="form-control form-control-sm"
                        />
                        <input
                          type="text"
                          id="name_char_field"
                          name="name_char_field"
                          placeholder="участник № 2, пример: Андриенко Богдан Николаевич 931777 30%"
                          value="пример: Андриенко Богдан Николаевич 931777 30%"
                          minLength="0"
                          maxLength="200"
                          className="form-control form-control-sm"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="container-fluid text-center">
                    <a className="btn btn-sm btn-warning m-1" href="#">
                      Автор: Андриенко Богдан Николаевич
                    </a>
                  </div>
                  <div className="container-fluid d-flex justify-content-between p-0">
                    <small className="text-muted border">
                      подано: <p>09-03-22 11:20</p>
                    </small>
                    <small className="text-muted border">
                      зарегистрировано: <p>09-03-22 11:55</p>
                    </small>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalTemplatePage;
