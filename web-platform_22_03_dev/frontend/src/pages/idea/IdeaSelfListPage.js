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
export const IdeaSelfListPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [firstRefresh, firstRefreshSet] = useState(true);
  //////////////////////////////////////////////////////////
  const [moderate, moderateSet] = useState("на доработку");
  const [sort, sortSet] = useState("дате публикации (свежие в начале)");
  const [author, authorSet] = useState("self");
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
        moderate: moderate,
        sort: sort,
        author: author,
      };
      dispatch(actions.ideaListAction(form));
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      }
    }
  }, [dataIdeaList, firstRefresh]);
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <components.HeaderComponent />
      <main>
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
            <div className="my-1">
              <components.MessageComponent variant={"danger"}>
                Ничего не найдено!
              </components.MessageComponent>
            </div>
          ) : (
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
              {dataIdeaList.map((object, index) => (
                <div
                  key={index}
                  className="col-sm-12 col-md-6 col-lg-4 m-0 p-1"
                >
                  <Link
                    to={`/idea_change/${object.id}`}
                    className="text-decoration-none text-dark m-0 p-0"
                  >
                    <div className="card shadow custom-background-transparent-low m-0 p-0">
                      <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                        <h6 className="lead fw-bold m-0 p-0">
                          {object["name_char_field"]}
                        </h6>
                        <h6 className="text-danger lead small m-0 p-0">
                          {" [ комментарий модератора: "}
                          {utils.GetSliceString(
                            object["comment_moderate_char_field"],
                            30
                          )}
                          {" ]"}
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
                                {object["subdivision_char_field"]}
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
                                {object["sphere_char_field"]}
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
                                {object["category_char_field"]}
                              </option>
                            </select>
                          </label>
                        </div>
                        <div className="m-0 p-0">
                          <img
                            src={
                              object["image_field"]
                                ? utils.GetStaticFile(object["image_field"])
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
                                object["place_char_field"],
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
                            Автор:{" "}
                            {object["user_model"]["last_name_char_field"]}{" "}
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
                              <Nav className="me-auto dropdown m-0 p-0">
                                <NavDropdown
                                  title={
                                    utils.GetSliceString(
                                      object["total_rating"]["rate"],
                                      3,
                                      false
                                    ) +
                                    " /  " +
                                    object["total_rating"]["count"]
                                  }
                                  className={
                                    object["total_rating"]["rate"] > 7
                                      ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                                      : object["total_rating"]["rate"] > 4
                                      ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                                      : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                                  }
                                >
                                  <ul className="m-0 p-0">
                                    {object["total_rating"]["users"].map(
                                      (object2, index) => (
                                        <li
                                          key={index}
                                          className={
                                            object2.split(":")[1] > 7
                                              ? "list-group-item bg-success bg-opacity-10"
                                              : object2.split(":")[1] > 4
                                              ? "list-group-item bg-warning bg-opacity-10"
                                              : "list-group-item bg-danger bg-opacity-10"
                                          }
                                        >
                                          <small className="">{object2}</small>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </NavDropdown>
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
          ))}
      </main>
      <components.FooterComponent />
    </div>
  );
};
