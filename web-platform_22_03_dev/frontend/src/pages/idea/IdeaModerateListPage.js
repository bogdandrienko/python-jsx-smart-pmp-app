///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const IdeaModerateListPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [firstRefresh, firstRefreshSet] = useState(true);
  const [detailView, detailViewSet] = useState(true);
  const [subdivision, subdivisionSet] = useState("");
  const [sphere, sphereSet] = useState("");
  const [category, categorySet] = useState("");
  const [author, authorSet] = useState("");
  const [search, searchSet] = useState("");
  const [sort, sortSet] = useState("дате публикации (свежие в начале)");
  const [moderate, moderateSet] = useState("на модерации");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userListAllStore = useSelector((state) => state.userListAllStore);
  const {
    // load: loadUserListAll,
    data: dataUserListAll,
    // error: errorUserListAll,
    // fail: failUserListAll,
  } = userListAllStore;
  //////////////////////////////////////////////////////////
  const ideaListStore = useSelector((state) => state.ideaListStore);
  const {
    // load: loadIdeaList,
    data: dataIdeaList,
    // error: errorIdeaList,
    // fail: failIdeaList,
  } = ideaListStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO reset state
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (!dataUserListAll) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAction(form));
    }
  }, [dataUserListAll, dispatch]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataIdeaList) {
      const form = {
        "Action-type": "IDEA_LIST",
        subdivision: subdivision,
        sphere: sphere,
        category: category,
        author: author,
        search: search,
        sort: sort,
        moderate: moderate,
      };
      dispatch(actions.ideaListAction(form));
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      }
    }
  }, [dataIdeaList, dispatch, firstRefresh]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    resetState();
  };
  //////////////////////////////////////////////////////////
  const handlerReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    subdivisionSet("");
    sphereSet("");
    categorySet("");
    authorSet("");
    searchSet("");
    sortSet("дате публикации (свежие в начале)");
    resetState();
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent
        logic={true}
        redirect={true}
        title={"Модерация идей"}
        description={
          "модерация списка идей в банке идей с возможностью поиска и фильтрации"
        }
      />
      <main>
        <div className="accordion accordion-flush shadow m-0 p-0 mb-2">
          <div className="accordion-item custom-background-transparent-low m-0 p-0">
            <h2 className="accordion-header m-0 p-0" id="headingOne">
              <button
                className="accordion-button bg-success bg-opacity-10 m-0 p-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
                onClick={(e) => utils.ChangeAccordionCollapse(["collapseOne"])}
              >
                <h4 className="lead fw-bold text-success m-0 p-0">
                  Фильтрация, поиск и сортировка{" "}
                  <small className="text-muted m-0 p-0">
                    (нажмите сюда, для переключения)
                  </small>
                </h4>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
                <form className="m-0 p-0" onSubmit={handlerSubmit}>
                  <div className="card shadow custom-background-transparent-hard m-0 p-0">
                    <div className="card-header m-0 p-0">
                      <label className="lead m-0 p-1">
                        Выберите нужные настройки фильтрации и сортировки, затем
                        нажмите кнопку{" "}
                        <p className="fw-bold text-primary m-0 p-0">
                          "фильтровать"
                        </p>
                      </label>
                      <label className="form-control-sm form-switch m-0 p-1">
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
                        <label className="form-control-sm m-0 p-1">
                          Статус:
                          <select
                            className="form-control form-control-sm m-0 p-1"
                            value={moderate}
                            onChange={(e) => moderateSet(e.target.value)}
                          >
                            <option className="m-0 p-0" value="">
                              все варианты
                            </option>
                            <option className="m-0 p-0" value="на модерации">
                              на модерации
                            </option>
                            <option className="m-0 p-0" value="на доработку">
                              на доработку
                            </option>
                            <option className="m-0 p-0" value="скрыто">
                              скрыто
                            </option>
                            <option className="m-0 p-0" value="принято">
                              принято
                            </option>
                          </select>
                        </label>
                        <label className="form-control-sm m-0 p-1">
                          Подразделение:
                          <select
                            className="form-control form-control-sm m-0 p-1"
                            value={subdivision}
                            onChange={(e) => subdivisionSet(e.target.value)}
                          >
                            <option className="m-0 p-0" value="">
                              все варианты
                            </option>
                            <option
                              className="m-0 p-0"
                              value="автотранспортное предприятие"
                            >
                              автотранспортное предприятие
                            </option>
                            <option
                              className="m-0 p-0"
                              value="горно-транспортный комплекс"
                            >
                              горно-транспортный комплекс
                            </option>
                            <option
                              className="m-0 p-0"
                              value="обогатительный комплекс"
                            >
                              обогатительный комплекс
                            </option>
                            <option className="m-0 p-0" value="управление">
                              управление предприятия
                            </option>
                            <option
                              className="m-0 p-0"
                              value="энергоуправление"
                            >
                              энергоуправление
                            </option>
                          </select>
                        </label>
                        <label className="form-control-sm m-0 p-1">
                          Сфера:
                          <select
                            className="form-control form-control-sm m-0 p-1"
                            value={sphere}
                            onChange={(e) => sphereSet(e.target.value)}
                          >
                            <option className="m-0 p-0" value="">
                              все варианты
                            </option>
                            <option className="m-0 p-0" value="технологическая">
                              технологическая
                            </option>
                            <option
                              className="m-0 p-0"
                              value="не технологическая"
                            >
                              не технологическая
                            </option>
                          </select>
                        </label>
                        <label className="form-control-sm m-0 p-1">
                          Категория:
                          <select
                            className="form-control form-control-sm m-0 p-1"
                            value={category}
                            onChange={(e) => categorySet(e.target.value)}
                          >
                            <option className="m-0 p-0" value="">
                              все варианты
                            </option>
                            <option className="m-0 p-0" value="индустрия 4.0">
                              индустрия 4.0
                            </option>
                            <option className="m-0 p-0" value="инвестиции">
                              инвестиции
                            </option>
                            <option className="m-0 p-0" value="инновации">
                              инновации
                            </option>
                            <option className="m-0 p-0" value="модернизация">
                              модернизация
                            </option>
                            <option className="m-0 p-0" value="экология">
                              экология
                            </option>
                            <option className="m-0 p-0" value="спорт/культура">
                              спорт/культура
                            </option>
                            <option className="m-0 p-0" value="другое">
                              другое
                            </option>
                          </select>
                        </label>
                        {dataUserListAll && (
                          <label className="form-control-sm m-0 p-1">
                            Автор:
                            <select
                              className="form-control form-control-sm m-0 p-1"
                              value={author}
                              onChange={(e) => authorSet(e.target.value)}
                            >
                              <option className="m-0 p-0" value="">
                                все варианты
                              </option>
                              {dataUserListAll.map((user, index) => (
                                <option
                                  key={index}
                                  value={user}
                                  className="m-0 p-0"
                                >
                                  {user}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                      </div>
                      <components.StoreStatusComponent
                        storeStatus={userListAllStore}
                        keyStatus={"userListAllStore"}
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
                      <div className="m-0 p-0">
                        <label className="form-control-sm w-75 m-0 p-1">
                          Поле поиска по части названия:
                          <input
                            type="text"
                            className="form-control m-0 p-1"
                            value={search}
                            placeholder="введите часть названия тут..."
                            onChange={(e) => searchSet(e.target.value)}
                          />
                        </label>
                        <label className="form-control-sm m-0 p-1">
                          Сортировка по:
                          <select
                            className="form-control form-control-sm m-0 p-1"
                            value={sort}
                            onChange={(e) => sortSet(e.target.value)}
                          >
                            <option value="дате публикации (свежие в начале)">
                              дате публикации (свежие в начале)
                            </option>
                            <option value="дате публикации (свежие в конце)">
                              дате публикации (свежие в конце)
                            </option>
                            <option value="названию (с начала алфавита)">
                              названию (с начала алфавита)
                            </option>
                            <option value="названию (с конца алфавита)">
                              названию (с конца алфавита)
                            </option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="card-footer m-0 p-0">
                      <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                        <button
                          className="btn btn-sm btn-primary m-1 p-2"
                          type="submit"
                        >
                          фильтровать идеи
                        </button>
                        <button
                          className="btn btn-sm btn-warning m-1 p-2"
                          type="reset"
                          onClick={(e) => handlerReset(e)}
                        >
                          сбросить фильтры
                        </button>
                      </ul>
                    </div>
                  </div>
                </form>
              </ul>
            </div>
          </div>
        </div>
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
        {!dataIdeaList || dataIdeaList.length < 1 ? (
          <div className="my-1">
            <components.MessageComponent variant={"danger"}>
              Ничего не найдено! Попробуйте изменить условия фильтрации и/или
              очистить строку поиска.
            </components.MessageComponent>
          </div>
        ) : !detailView ? (
          <div className="bg-opacity-10 bg-primary shadow my-1">
            {dataIdeaList.map((object, index) => (
              <Link
                key={index}
                to={`/idea_moderate_change/${object.id}`}
                className="text-decoration-none"
              >
                <li className="border list-group-item-action text-start small">
                  {utils.GetSliceString(object["name_char_field"], 20)}
                  {" | "}
                  {utils.GetCleanDateTime(
                    object["register_datetime_field"],
                    true
                  )}
                  {" | "}
                  {utils.GetSliceString(
                    object["user_model"]["last_name_char_field"],
                    20
                  )}{" "}
                  {utils.GetSliceString(
                    object["user_model"]["first_name_char_field"],
                    20
                  )}
                  {utils.GetSliceString(
                    " | " + object["status_moderate_char_field"],
                    20
                  )}
                  {utils.GetSliceString(
                    " : " + object["comment_moderate_char_field"],
                    20
                  )}
                </li>
              </Link>
            ))}
          </div>
        ) : (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
            {dataIdeaList.map((object, index) => (
              <div key={index} className="col-sm-12 col-md-6 col-lg-4 m-0 p-1">
                <Link
                  to={`/idea_moderate_change/${object.id}`}
                  className="text-decoration-none text-dark m-0 p-0"
                >
                  <div className="card shadow custom-background-transparent-low m-0 p-0">
                    <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                      <h6 className="lead fw-bold m-0 p-0">
                        {object["name_char_field"]}
                      </h6>
                      <h6 className="text-danger lead small m-0 p-0">
                        {" [ "}
                        {utils.GetSliceString(
                          object["status_moderate_char_field"],
                          30
                        )}
                        {" : "}
                        {utils.GetSliceString(
                          object["comment_moderate_char_field"],
                          30
                        )}
                        {" ]"}
                      </h6>
                    </div>
                    <div className="card-body m-0 p-0">
                      <div className="m-0 p-0">
                        <label className="form-control-sm m-0 p-1">
                          Подразделение:
                          <select
                            className="form-control form-control-sm m-0 p-2"
                            required
                          >
                            <option className="m-0 p-0" value="">
                              {object["subdivision_char_field"]}
                            </option>
                          </select>
                        </label>
                        <label className="form-control-sm m-0 p-1">
                          Сфера:
                          <select
                            className="form-control form-control-sm m-0 p-2"
                            required
                          >
                            <option className="m-0 p-0" value="">
                              {object["sphere_char_field"]}
                            </option>
                          </select>
                        </label>
                        <label className="form-control-sm m-0 p-1">
                          Категория:
                          <select
                            className="form-control form-control-sm m-0 p-2"
                            required
                          >
                            <option className="m-0 p-0" value="">
                              {object["category_char_field"]}
                            </option>
                          </select>
                        </label>
                      </div>
                      <div className="m-0 p-0">
                        <img
                          src={
                            object["avatar_image_field"]
                              ? utils.GetStaticFile(
                                  object["avatar_image_field"]
                                )
                              : utils.GetStaticFile(
                                  "/media/default/idea/default_idea.jpg"
                                )
                          }
                          className="img-fluid img-thumbnail w-50 m-1 p-0"
                          alt="изображение отсутствует"
                        />
                      </div>
                      <div className="m-0 p-0">
                        <label className="form-control-sm w-50 m-0 p-1">
                          Место изменения:
                          <input
                            type="text"
                            className="form-control form-control-sm m-0 p-1"
                            defaultValue={utils.GetSliceString(
                              object["place_char_field"],
                              50
                            )}
                            readOnly={true}
                            placeholder="введите место изменения тут..."
                            required
                            minLength="1"
                            maxLength="100"
                          />
                        </label>
                      </div>
                      <div className="m-0 p-0">
                        <label className="form-control-sm w-100 m-0 p-1">
                          Описание:
                          <textarea
                            className="form-control form-control-sm m-0 p-1"
                            defaultValue={utils.GetSliceString(
                              object["description_text_field"],
                              50
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
                          Автор: {object["user_model"]["last_name_char_field"]}{" "}
                          {object["user_model"]["first_name_char_field"]}{" "}
                          {object["user_model"]["position_char_field"]}
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between m-1 p-0">
                        <label className="text-muted border m-0 p-2">
                          подано:{" "}
                          <p className="m-0">
                            {utils.GetCleanDateTime(
                              object["created_datetime_field"],
                              true
                            )}
                          </p>
                        </label>
                        <label className="text-muted border m-1 p-2">
                          зарегистрировано:{" "}
                          <p className="m-0 p-0">
                            {utils.GetCleanDateTime(
                              object["register_datetime_field"],
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
                            object["total_rating"]["rate"] > 7
                              ? "text-success m-0 p-1"
                              : object["total_rating"]["rate"] > 4
                              ? "text-warning m-0 p-1"
                              : "text-danger m-0 p-1"
                          }
                        >
                          Рейтинг
                        </span>
                        <Navbar className="text-center m-0 p-0">
                          <Container className="m-0 p-0">
                            <Nav className="me-auto m-0 p-0">
                              <p
                                className={
                                  object["total_rating"]["rate"] > 7
                                    ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill m-0 p-2"
                                    : object["total_rating"]["rate"] > 4
                                    ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill m-0 p-2"
                                    : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill m-0 p-2"
                                }
                              >
                                {utils.GetSliceString(
                                  object["total_rating"]["rate"],
                                  3,
                                  false
                                )}
                                <small className="align-text-top m-0 p-0">
                                  {" \\ " + object["total_rating"]["count"]}
                                </small>
                              </p>
                            </Nav>
                          </Container>
                        </Navbar>
                        <span className="m-0 p-1">
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 1
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 0.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 2
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 1.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 3
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 2.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 4
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 3.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 5
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 4.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 6
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 5.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 7
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 6.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 8
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 7.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 9
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 8.5
                                ? "fas fa-star-half-alt m-0 p-0"
                                : "far fa-star m-0 p-0"
                            }
                          />
                          <i
                            style={{
                              color:
                                object["total_rating"]["rate"] > 7
                                  ? "#00ff00"
                                  : object["total_rating"]["rate"] > 4
                                  ? "#ffaa00"
                                  : "#ff0000",
                            }}
                            className={
                              object["total_rating"]["rate"] >= 10
                                ? "fas fa-star m-0 p-0"
                                : object["total_rating"]["rate"] >= 9.5
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
                        <span className="badge bg-secondary rounded-pill m-0 p-2">
                          {object["comment_count"]}
                        </span>
                      </div>
                    </div>
                    <div className="m-0 p-0">
                      <p className="btn btn-sm btn-primary w-100 m-0 p-1">
                        редактировать
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </ul>
        )}
      </main>
      <components.FooterComponent />
    </body>
  );
};
