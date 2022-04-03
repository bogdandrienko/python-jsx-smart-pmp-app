// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const IdeaRatingListPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [firstRefresh, firstRefreshSet] = useState(true);
  //////////////////////////////////////////////////////////
  const [detailView, detailViewSet] = useState(true);
  const [onlyMonth, onlyMonthSet] = useState(true);
  const [moderate, moderateSet] = useState("принято");
  const [sort, sortSet] = useState("рейтингу (популярные в начале)");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const ideaListStore = useSelector((state) => state.ideaListStore);
  const {
    load: loadIdeaList,
    data: dataIdeaList,
    // error: errorIdeaList,
    // fail: failIdeaList,
  } = ideaListStore;
  // TODO reset state //////////////////////////////////////////////////////////////////////////////////////////////////
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
  };
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataIdeaList) {
      const form = {
        "Action-type": "IDEA_LIST",
        onlyMonth: onlyMonth,
        moderate: moderate,
        sort: sort,
      };
      dispatch(actions.ideaListAction(form));
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      }
    }
  }, [dataIdeaList, firstRefresh]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    resetState();
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.AccordionComponent
          key_target={"accordion1"}
          isCollapse={true}
          title={
            <span>
              <i className="fa-solid fa-filter" /> Фильтрация, поиск и
              сортировка:
            </span>
          }
          text_style="text-success"
          header_style="bg-success bg-opacity-10 custom-background-transparent-low"
          body_style="bg-light bg-opacity-10 custom-background-transparent-low"
        >
          {
            <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
              <form className="m-0 p-0" onSubmit={handlerSubmit}>
                <div className="card shadow custom-background-transparent-hard m-0 p-0">
                  <div className="card-header m-0 p-0">
                    <label className="lead m-0 p-1">
                      <i className="fa-solid fa-filter" /> Выберите нужные
                      настройки фильтрации и сортировки, затем нажмите кнопку{" "}
                      <p className="fw-bold text-primary m-0 p-0">
                        "фильтровать"
                      </p>
                    </label>
                    <label className="form-control-sm form-switch text-center m-0 p-1">
                      Детальное отображение:
                      <input
                        type="checkbox"
                        className="form-check-input m-0 p-1"
                        id="flexSwitchCheckDefault"
                        defaultChecked={detailView}
                        onClick={(e) => detailViewSet(!detailView)}
                      />
                    </label>
                  </div>
                  <div className="card-body m-0 p-0">
                    <div className="m-0 p-0">
                      <label className="form-control-sm form-switch text-center m-0 p-1">
                        Сводка только за последний месяц:
                        <input
                          type="checkbox"
                          className="form-check-input m-0 p-1"
                          id="flexSwitchCheckDefault"
                          defaultChecked={onlyMonth}
                          onClick={(e) => onlyMonthSet(!onlyMonth)}
                        />
                      </label>
                      <label className="form-control-sm text-center m-0 p-1">
                        Сортировка по:
                        <div className="input-group">
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={sort}
                            onChange={(e) => sortSet(e.target.value)}
                          >
                            <option value="рейтингу (популярные в начале)">
                              рейтингу (популярные в начале)
                            </option>
                            <option value="рейтингу (популярные в конце)">
                              рейтингу (популярные в конце)
                            </option>
                            <option value="отметкам рейтинга (наибольшие в начале)">
                              отметкам рейтинга (наибольшие в начале)
                            </option>
                            <option value="отметкам рейтинга (наибольшие в конце)">
                              отметкам рейтинга (наибольшие в конце)
                            </option>
                            <option value="комментариям (наибольшие в начале)">
                              комментариям (наибольшие в начале)
                            </option>
                            <option value="комментариям (наибольшие в конце)">
                              комментариям (наибольшие в конце)
                            </option>
                          </select>
                          <button
                            className="btn btn-sm btn-primary m-0 p-2"
                            type="submit"
                          >
                            <i className="fa-solid fa-circle-check m-0 p-1" />
                            фильтровать идеи
                          </button>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </ul>
          }
        </components.AccordionComponent>
        <components.StoreStatusComponent
          storeStatus={ideaListStore}
          keyStatus={"ideaListStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {!loadIdeaList &&
          (!dataIdeaList || dataIdeaList.length < 1 ? (
            <div className="m-0 p-0 my-1">
              <components.MessageComponent variant={"danger"}>
                Ничего не найдено! Попробуйте изменить условия фильтрации и/или
                очистить строку поиска.
              </components.MessageComponent>
            </div>
          ) : !detailView ? (
            <div className="card shadow m-0 p-0 my-1">
              {dataIdeaList.map((idea, index) => (
                <Link
                  key={index}
                  to={`/idea_detail/${idea.id}`}
                  className="text-decoration-none m-0 p-0"
                >
                  <li className="border list-group-item-action text-start small m-0 p-1">
                    {utils.GetSliceString(idea["name_char_field"], 30)}
                    {utils.GetCleanDateTime(
                      " | " + idea["register_datetime_field"],
                      true
                    )}
                    {utils.GetSliceString(
                      " | " + idea["user_model"]["last_name_char_field"],
                      20
                    )}
                    {utils.GetSliceString(
                      " " + idea["user_model"]["first_name_char_field"],
                      20
                    )}
                  </li>
                </Link>
              ))}
            </div>
          ) : (
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
              {dataIdeaList.map((idea, index) => (
                <div
                  key={index}
                  className="col-sm-12 col-md-6 col-lg-4 m-0 p-1"
                >
                  <Link
                    to={`/idea_detail/${idea.id}`}
                    className="text-decoration-none text-dark m-0 p-0"
                  >
                    <div className="card shadow custom-background-transparent-low m-0 p-0">
                      <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                        <h6 className="lead fw-bold m-0 p-0">
                          {utils.GetSliceString(idea["name_char_field"], 30)}
                        </h6>
                      </div>
                      <div className="card-body m-0 p-0">
                        <div className="m-0 p-0">
                          <label className="form-control-sm text-center m-0 p-1">
                            Подразделение:
                            <select
                              className="form-control form-control-sm text-center m-0 p-1"
                              required
                            >
                              <option className="m-0 p-0" value="">
                                {idea["subdivision_char_field"]}
                              </option>
                            </select>
                          </label>
                          <label className="form-control-sm text-center m-0 p-1">
                            Сфера:
                            <select
                              className="form-control form-control-sm text-center m-0 p-1"
                              required
                            >
                              <option className="m-0 p-0" value="">
                                {idea["sphere_char_field"]}
                              </option>
                            </select>
                          </label>
                          <label className="form-control-sm text-center m-0 p-1">
                            Категория:
                            <select
                              className="form-control form-control-sm text-center m-0 p-1"
                              required
                            >
                              <option className="m-0 p-0" value="">
                                {idea["category_char_field"]}
                              </option>
                            </select>
                          </label>
                        </div>
                        <div className="m-0 p-0">
                          <img
                            src={
                              idea["image_field"]
                                ? utils.GetStaticFile(idea["image_field"])
                                : utils.GetStaticFile(
                                    "/media/default/idea/default_idea.jpg"
                                  )
                            }
                            className="img-fluid img-thumbnail w-50 m-1 p-0"
                            alt="изображение отсутствует"
                          />
                        </div>
                        <div className="m-0 p-0">
                          <label className="form-control-sm text-center w-50 m-0 p-1">
                            Место изменения:
                            <input
                              type="text"
                              className="form-control form-control-sm text-center m-0 p-1"
                              defaultValue={utils.GetSliceString(
                                idea["place_char_field"],
                                50
                              )}
                              readOnly={true}
                              placeholder="введите место изменения тут..."
                              required
                              minLength="1"
                              maxLength="300"
                            />
                          </label>
                        </div>
                        <div className="m-0 p-0">
                          <label className="form-control-sm text-center w-100 m-0 p-1">
                            Описание:
                            <textarea
                              className="form-control form-control-sm text-center m-0 p-1"
                              defaultValue={utils.GetSliceString(
                                idea["description_text_field"],
                                100
                              )}
                              readOnly={true}
                              required
                              placeholder="введите описание тут..."
                              minLength="1"
                              maxLength="3000"
                              rows="3"
                            />
                          </label>
                        </div>
                        <div className="m-0 p-0">
                          <Link
                            to={`#`}
                            className="btn btn-sm btn-warning m-0 p-2"
                          >
                            Автор: {idea["user_model"]["last_name_char_field"]}{" "}
                            {idea["user_model"]["first_name_char_field"]}{" "}
                            {idea["user_model"]["position_char_field"]}
                          </Link>
                        </div>
                        <div className="d-flex justify-content-between m-1 p-0">
                          <label className="text-muted border m-0 p-2">
                            подано:{" "}
                            <p className="m-0">
                              {utils.GetCleanDateTime(
                                idea["created_datetime_field"],
                                true
                              )}
                            </p>
                          </label>
                          <label className="text-muted border m-1 p-2">
                            зарегистрировано:{" "}
                            <p className="m-0 p-0">
                              {utils.GetCleanDateTime(
                                idea["register_datetime_field"],
                                true
                              )}
                            </p>
                          </label>
                        </div>
                      </div>
                      <div className="card-footer m-0 p-1">
                        <div className="d-flex justify-content-between m-0 p-1">
                          <span
                            className={
                              idea["ratings"]["rate"] > 7
                                ? "text-success m-0 p-1"
                                : idea["ratings"]["rate"] > 4
                                ? "custom-color-warning-1 m-0 p-1"
                                : "text-danger m-0 p-1"
                            }
                          >
                            Рейтинг
                          </span>
                          <div className="m-0 p-1">
                            <span className="btn btn-sm bg-danger bg-opacity-50 badge rounded-pill m-0 p-2">
                              {`${idea["ratings"]["rate"]}  / ${idea["ratings"]["count"]}`}
                            </span>
                          </div>
                          <span className="m-0 p-1">
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 1
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 0.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 2
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 1.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 3
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 2.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 4
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 3.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 5
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 4.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 6
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 5.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 7
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 6.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 8
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 7.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 9
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 8.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                            <i
                              style={{
                                color:
                                  idea["ratings"]["rate"] > 7
                                    ? "#00ff00"
                                    : idea["ratings"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                idea["ratings"]["rate"] >= 10
                                  ? "fas fa-star m-0 p-0"
                                  : idea["ratings"]["rate"] >= 9.5
                                  ? "fas fa-star-half-alt m-0 p-0"
                                  : "far fa-star m-0 p-0"
                              }
                            />
                          </span>
                        </div>
                        <div className="d-flex justify-content-between m-0 p-1">
                          <span className="text-secondary m-0 p-1">
                            Комментарии
                          </span>
                          <i className="fa-solid fa-comment m-0 p-1">
                            {" "}
                            {idea["comments"]["count"]}
                          </i>
                        </div>
                      </div>
                      <div className="m-0 p-0">
                        <Link
                          className="btn btn-sm btn-primary w-100 m-0 p-1"
                          to={`/idea_detail/${idea.id}`}
                        >
                          подробнее
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </ul>
          ))}
      </main>
      <components.FooterComponent />
    </div>
  );
};