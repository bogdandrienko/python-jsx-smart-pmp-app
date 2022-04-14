// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const IdeaChangePage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [firstRefresh, firstRefreshSet] = useState(true);
  //////////////////////////////////////////////////////////
  const [subdivision, subdivisionSet] = useState("");
  const [sphere, sphereSet] = useState("");
  const [category, categorySet] = useState("");
  const [avatar, avatarSet] = useState(null);
  const [clearImage, clearImageSet] = useState(false);
  const [name, nameSet] = useState("");
  const [place, placeSet] = useState("");
  const [description, descriptionSet] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const ideaDetailStore = useSelector((state) => state.ideaDetailStore);
  const {
    // load: loadIdeaDetail,
    data: dataIdeaDetail,
    // error: errorIdeaDetail,
    // fail: failIdeaDetail,
  } = ideaDetailStore;
  //////////////////////////////////////////////////////////
  const ideaChangeStore = useSelector((state) => state.ideaChangeStore);
  const {
    // load: loadIdeaChange,
    data: dataIdeaChange,
    // error: errorIdeaChange,
    // fail: failIdeaChange,
  } = ideaChangeStore;
  //////////////////////////////////////////////////////////
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  //////////////////////////////////////////////////////////
  const ideaModerateStore = useSelector((state) => state.ideaModerateStore);
  const {
    load: loadIdeaModerate,
    data: dataIdeaModerate,
    // error: errorIdeaModerate,
    // fail: failIdeaModerate,
  } = ideaModerateStore;
  // TODO reset state //////////////////////////////////////////////////////////////////////////////////////////////////
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    clearImageSet(false);
    dispatch({ type: constants.IDEA_DETAIL.reset });
    dispatch({
      type: constants.IDEA_MODERATE.reset,
    });
    dispatch({
      type: constants.IDEA_CHANGE.reset,
    });
  };
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataIdeaDetail) {
      const form = {
        "Action-type": "IDEA_DETAIL",
        id: id,
      };
      dispatch(actions.ideaDetailAction(form));
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      } else {
        subdivisionSet(dataIdeaDetail["subdivision_char_field"]);
        sphereSet(dataIdeaDetail["sphere_char_field"]);
        categorySet(dataIdeaDetail["category_char_field"]);
        avatarSet(null);
        nameSet(dataIdeaDetail["name_char_field"]);
        placeSet(dataIdeaDetail["place_char_field"]);
        descriptionSet(dataIdeaDetail["description_text_field"]);
      }
    }
  }, [dataIdeaDetail, firstRefreshSet]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataIdeaChange) {
      utils.Sleep(10).then(() => {
        navigate("/idea_self_list");
        resetState();
      });
    }
  }, [dataIdeaChange]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataIdeaModerate) {
      utils.Sleep(10).then(() => {
        navigate("/idea_self_list");
        resetState();
      });
    }
  }, [dataIdeaModerate]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerChangeSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_CHANGE",
      id: id,
      subdivision: subdivision,
      sphere: sphere,
      category: category,
      avatar: avatar,
      clearImage: clearImage,
      name: name,
      place: place,
      description: description,
      moderate: "на модерации",
      moderateComment: "автор внёс изменения",
    };
    dispatch(actions.ideaChangeAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerChangeReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    resetState();
  };
  //////////////////////////////////////////////////////////
  const handlerHideSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_MODERATE",
      id: id,
      moderate: "скрыто",
      moderateComment: "скрыто автором",
    };
    let isConfirm = window.confirm("Вы действительно хотите скрыть свою идею?");
    if (isConfirm) {
      dispatch(actions.ideaModerateAction(form));
    }
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <div className="btn-group text-start w-100 m-0 p-0">
          <Link
            to={"/idea_self_list"}
            className="btn btn-sm btn-primary m-1 p-2"
          >
            {"<="} назад к списку
          </Link>
          <components.StoreStatusComponent
            storeStatus={userDetailsStore}
            keyStatus={"userDetailsStore"}
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
          {dataUserDetails &&
            !loadIdeaModerate &&
            dataUserDetails["user_model"]["id"] &&
            dataIdeaDetail &&
            dataIdeaDetail["user_model"]["id"] &&
            dataUserDetails["user_model"]["id"] ===
              dataIdeaDetail["user_model"]["id"] && (
              <button
                type="button"
                className="btn btn-sm btn-warning m-1 p-2"
                onClick={handlerHideSubmit}
              >
                скрыть
              </button>
            )}
        </div>
        <components.StoreStatusComponent
          storeStatus={ideaDetailStore}
          keyStatus={"ideaDetailStore"}
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
        <components.StoreStatusComponent
          storeStatus={ideaChangeStore}
          keyStatus={"ideaChangeStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {dataIdeaDetail && !dataIdeaModerate && !loadIdeaModerate && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerChangeSubmit}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                  <h6 className="lead fw-bold m-0 p-0">
                    {dataIdeaDetail["name_char_field"]}
                  </h6>
                  <h6 className="text-danger lead small m-0 p-0">
                    {" [ комментарий модератора: "}
                    {dataIdeaDetail["comment_moderate_char_field"]}
                    {" ]"}
                  </h6>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center m-0 p-1">
                      Подразделение:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={subdivision}
                        required
                        onChange={(e) => subdivisionSet(e.target.value)}
                      >
                        <option className="m-0 p-0" value="">
                          не указано
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
                        <option
                          className="m-0 p-0"
                          value="управление предприятия"
                        >
                          управление предприятия
                        </option>
                        <option className="m-0 p-0" value="энергоуправление">
                          энергоуправление
                        </option>
                      </select>
                      <small className="text-danger m-0 p-0">
                        * обязательно
                      </small>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Сфера:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={sphere}
                        required
                        onChange={(e) => sphereSet(e.target.value)}
                      >
                        <option className="m-0 p-0" value="">
                          не указано
                        </option>
                        <option className="m-0 p-0" value="технологическая">
                          технологическая
                        </option>
                        <option className="m-0 p-0" value="не технологическая">
                          не технологическая
                        </option>
                      </select>
                      <small className="text-danger m-0 p-0">
                        * обязательно
                      </small>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Категория:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={category}
                        required
                        onChange={(e) => categorySet(e.target.value)}
                      >
                        <option className="m-0 p-0" value="">
                          не указано
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
                        <option className="m-0 p-0" value="социальное/персонал">
                          социальное/персонал
                        </option>
                        <option className="m-0 p-0" value="другое">
                          другое
                        </option>
                      </select>
                      <small className="text-danger m-0 p-0">
                        * обязательно
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <img
                      src={utils.GetStaticFile(dataIdeaDetail["image_field"])}
                      className="card-img-top img-fluid w-25 m-0 p-1"
                      alt="изображение отсутствует"
                    />
                    <label className="form-control-sm form-switch text-center m-0 p-1">
                      Удалить текущее изображение:
                      <input
                        type="checkbox"
                        className="form-check-input m-0 p-1"
                        id="flexSwitchCheckDefault"
                        defaultChecked={clearImage}
                        onClick={(e) => clearImageSet(!clearImage)}
                      />
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Аватарка-заставка:
                      <input
                        type="file"
                        className="form-control form-control-sm text-center m-0 p-1"
                        accept=".jpg, .png"
                        onChange={(e) => avatarSet(e.target.files[0])}
                      />
                      <small className="text-muted m-0 p-0">
                        * не обязательно
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Название:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={name}
                        placeholder="введите название тут..."
                        required
                        minLength="1"
                        maxLength="300"
                        onChange={(e) =>
                          nameSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                                punctuationMarks: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
                          {" "}
                          * только кириллица, цифры, пробел и знаки препинания
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 300 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="w-50 form-control-sm m-0 p-1">
                      Место изменения:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={place}
                        placeholder="введите место изменения тут..."
                        required
                        minLength="1"
                        maxLength="300"
                        onChange={(e) =>
                          placeSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                                punctuationMarks: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
                          {" "}
                          * только кириллица, цифры, пробел и знаки препинания
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 300 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="w-100 form-control-sm m-0 p-1">
                      Описание:
                      <textarea
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={description}
                        required
                        placeholder="введите описание тут..."
                        minLength="1"
                        maxLength="3000"
                        rows="3"
                        onChange={(e) =>
                          descriptionSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                latin: true,
                                cyrillic: true,
                                space: true,
                                punctuationMarks: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 3000 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="card-footer m-0 p-1">
                    <div className="d-flex justify-content-between m-0 p-1">
                      <span
                        className={
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "text-success"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "custom-color-warning-1"
                            : "text-danger"
                        }
                      >
                        Рейтинг
                      </span>
                      {dataIdeaDetail["ratings"] &&
                      dataIdeaDetail["ratings"]["ratings"].length > 0 ? (
                        <Navbar className="text-center m-0 p-0">
                          <Container className="m-0 p-0">
                            <Nav className="me-auto dropdown m-0 p-0">
                              <NavDropdown
                                title={
                                  utils.GetSliceString(
                                    dataIdeaDetail["ratings"]["rate"],
                                    3,
                                    false
                                  ) +
                                  " /  " +
                                  dataIdeaDetail["ratings"]["count"]
                                }
                                className={
                                  dataIdeaDetail["ratings"]["rate"] > 7
                                    ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                                    : dataIdeaDetail["ratings"]["rate"] > 4
                                    ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                                    : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                                }
                              >
                                <ul className="m-0 p-0">
                                  {dataIdeaDetail["ratings"]["ratings"].map(
                                    (object, index) => (
                                      <li
                                        key={index}
                                        className={
                                          object["rating_integer_field"] > 7
                                            ? "list-group-item bg-success bg-opacity-10"
                                            : object["rating_integer_field"] > 4
                                            ? "list-group-item bg-warning bg-opacity-10"
                                            : "list-group-item bg-danger bg-opacity-10"
                                        }
                                      >
                                        <small className="">{object}</small>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </NavDropdown>
                            </Nav>
                          </Container>
                        </Navbar>
                      ) : (
                        <div className="m-0 p-1">
                          <span className="btn btn-sm bg-danger bg-opacity-50 badge rounded-pill m-0 p-2">
                            {"0  / 0"}
                          </span>
                        </div>
                      )}
                      <span>
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 1
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 0.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 2
                              ? "fas fa- m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 1.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 3
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 2.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 4
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 3.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 5
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 4.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 6
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 5.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 7
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 6.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 8
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 7.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 9
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 8.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["ratings"]["rate"] >= 10
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["ratings"]["rate"] >= 9.5
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
                        {dataIdeaDetail["comments"]["count"]}
                      </i>
                    </div>
                  </div>
                </div>
                <div className="card-footer m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-primary m-1 p-2"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      отправить на модерацию
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                      onClick={(e) => handlerChangeReset(e)}
                    >
                      <i className="fa-solid fa-pen-nib m-0 p-1" />
                      сбросить данные
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
