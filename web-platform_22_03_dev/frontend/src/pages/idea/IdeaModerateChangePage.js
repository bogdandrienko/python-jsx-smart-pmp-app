///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const IdeaModerateChangePage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const id = useParams().id;
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [firstRefresh, firstRefreshSet] = useState(true);
  const [subdivision, subdivisionSet] = useState("");
  const [sphere, sphereSet] = useState("");
  const [category, categorySet] = useState("");
  const [avatar, avatarSet] = useState(null);
  const [clearImage, clearImageSet] = useState(false);
  const [name, nameSet] = useState("");
  const [place, placeSet] = useState("");
  const [description, descriptionSet] = useState("");
  const [moderate, moderateSet] = useState("");
  const [moderateComment, moderateCommentSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const ideaDetailStore = useSelector((state) => state.ideaDetailStore);
  const {
    // load: loadIdeaDetail,
    data: dataIdeaDetail,
    // error: errorIdeaDetail,
    // fail: failIdeaDetail,
  } = ideaDetailStore;
  //////////////////////////////////////////////////////////
  const ideaModerateStore = useSelector((state) => state.ideaModerateStore);
  const {
    // load: loadIdeaModerate,
    data: dataIdeaModerate,
    // error: errorIdeaModerate,
    // fail: failIdeaModerate,
  } = ideaModerateStore;
  //////////////////////////////////////////////////////////
  const ideaChangeStore = useSelector((state) => state.ideaChangeStore);
  const {
    // load: loadIdeaChange,
    data: dataIdeaChange,
    // error: errorIdeaChange,
    // fail: failIdeaChange,
  } = ideaChangeStore;
  //////////////////////////////////////////////////////////
  const ideaCommentListStore = useSelector(
    (state) => state.ideaCommentListStore
  );
  const {
    // load: loadIdeaCommentList,
    data: dataIdeaCommentList,
    // error: errorIdeaCommentList,
    // fail: failIdeaCommentList,
  } = ideaCommentListStore;
  //////////////////////////////////////////////////////////
  const ideaCommentDeleteStore = useSelector(
    (state) => state.ideaCommentDeleteStore
  );
  const {
    // load: loadIdeaCommentDelete,
    data: dataIdeaCommentDelete,
    // error: errorIdeaCommentDelete,
    // fail: failIdeaCommentDelete,
  } = ideaCommentDeleteStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO reset state
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    clearImageSet(false);
    dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
    dispatch({ type: constants.IDEA_DETAIL_RESET_CONSTANT });
    dispatch({
      type: constants.IDEA_MODERATE_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_CHANGE_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_COMMENT_LIST_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_COMMENT_DELETE_RESET_CONSTANT,
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
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
  }, [dataIdeaDetail, id, dispatch, firstRefreshSet]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataIdeaCommentList) {
      const form = {
        "Action-type": "IDEA_COMMENT_LIST",
        id: id,
      };
      dispatch(actions.ideaCommentListAction(form));
    }
  }, [dataIdeaCommentList, id, dispatch]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataIdeaModerate) {
      utils.Sleep(10).then(() => {
        resetState();
      });
    }
  }, [dataIdeaModerate]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataIdeaChange) {
      utils.Sleep(10).then(() => {
        resetState();
      });
    }
  }, [dataIdeaChange]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataIdeaCommentDelete) {
      utils.Sleep(10).then(() => {
        resetState();
      });
    }
  }, [dataIdeaCommentDelete]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerModerateSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "IDEA_MODERATE",
      id: id,
      moderate: moderate,
      moderateComment: moderateComment,
    };
    dispatch(actions.ideaModerateAction(form));
  };
  //////////////////////////////////////////////////////////
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
  const handlerCommentDelete = async ({ commentId }) => {
    const form = {
      "Action-type": "IDEA_COMMENT_DELETE",
      commentId: commentId,
    };
    let isConfirm = window.confirm("Удалить выбранный комментарий?");
    if (isConfirm) {
      dispatch(actions.ideaCommentDeleteAction(form));
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main className="container">
        <div className="btn-group m-0 p-1 text-start w-100">
          <Link
            to={"/idea_moderate_list"}
            className="btn btn-sm btn-primary m-1 p-2"
          >
            {"<="} назад к списку
          </Link>
        </div>
        <components.AccordionComponent
          key_target={"accordion1"}
          isCollapse={true}
          title={"Модерация:"}
          text_style="text-danger"
          header_style="bg-danger bg-opacity-10 custom-background-transparent-low"
          body_style="bg-light bg-opacity-10 custom-background-transparent-low"
        >
          {
            <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
              <form className="m-0 p-0" onSubmit={handlerModerateSubmit}>
                <div className="card shadow custom-background-transparent-hard m-0 p-0">
                  <div className="card-header m-0 p-0">
                    <label className="lead m-0 p-1">
                      Выберите заключение по идеи{" "}
                      <p className="fw-bold text-secondary m-0 p-0">
                        заполните комментарий "на доработку", чтобы автор идеи
                        его увидел
                      </p>
                    </label>
                  </div>
                  <div className="card-body m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Заключение:
                      <select
                        required
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={moderate}
                        onChange={(e) => moderateSet(e.target.value)}
                      >
                        <option value="">не выбрано</option>
                        <option value="на модерации">на модерации</option>
                        <option value="на доработку">на доработку</option>
                        <option value="скрыто">скрыто</option>
                        <option value="принято">принято</option>
                      </select>
                      <small className="text-danger">* обязательно</small>
                    </label>
                    {moderate === "на доработку" && (
                      <label className="w-75 form-control-sm">
                        Комментарий:
                        <input
                          type="text"
                          className="form-control form-control-sm text-center m-0 p-1"
                          value={moderateComment}
                          placeholder="вводите комментарий тут..."
                          minLength="1"
                          maxLength="200"
                          onChange={(e) =>
                            moderateCommentSet(
                              e.target.value.replace(
                                utils.GetRegexType({
                                  numbers: true,
                                  cyrillic: true,
                                  space: true,
                                }),
                                ""
                              )
                            )
                          }
                        />
                        <small className="text-danger m-0 p-0">
                          * обязательно
                          <small className="text-warning m-0 p-0">
                            {" "}
                            * только кириллические буквы и цифры
                          </small>
                          <small className="text-muted m-0 p-0">
                            {" "}
                            * длина: не более 200 символов
                          </small>
                        </small>
                      </label>
                    )}
                  </div>
                  <components.StoreStatusComponent
                    storeStatus={ideaModerateStore}
                    keyStatus={"ideaModerateStore"}
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
                  <div className="card-footer m-0 p-0">
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                      <button
                        className="btn btn-sm btn-danger m-1 p-2"
                        type="submit"
                      >
                        вынести заключение
                      </button>
                    </ul>
                  </div>
                </div>
              </form>
            </ul>
          }
        </components.AccordionComponent>
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
        {dataIdeaDetail && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerChangeSubmit}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                  <h6 className="lead fw-bold m-0 p-0">
                    {dataIdeaDetail["name_char_field"]}
                  </h6>
                  <h6 className="text-danger lead small m-0 p-0">
                    {" [ "}
                    {utils.GetSliceString(
                      dataIdeaDetail["status_moderate_char_field"],
                      30
                    )}
                    {" : "}
                    {utils.GetSliceString(
                      dataIdeaDetail["comment_moderate_char_field"],
                      30
                    )}
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
                        <option className="m-0 p-0" value="управление">
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
                      src={utils.GetStaticFile(
                        dataIdeaDetail["avatar_image_field"]
                      )}
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
                        maxLength="200"
                        onChange={(e) =>
                          nameSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="text-warning m-0 p-0">
                          {" "}
                          * только кириллические буквы и цифры
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 200 символов
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
                        maxLength="100"
                        onChange={(e) =>
                          placeSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="text-warning m-0 p-0">
                          {" "}
                          * только кириллические буквы и цифры
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 200 символов
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
                  <div className="m-0 p-0">
                    <Link to={`#`} className="btn btn-sm btn-warning m-0 p-2">
                      Автор:{" "}
                      {dataIdeaDetail["user_model"]["last_name_char_field"]}{" "}
                      {dataIdeaDetail["user_model"]["first_name_char_field"]}{" "}
                      {dataIdeaDetail["user_model"]["position_char_field"]}
                    </Link>
                  </div>
                  <div className="d-flex justify-content-between m-0 p-1">
                    <label className="text-muted border p-1 m-0 p-1">
                      подано:{" "}
                      <p className="m-0 p-0">
                        {utils.GetCleanDateTime(
                          dataIdeaDetail["created_datetime_field"],
                          true
                        )}
                      </p>
                    </label>
                    <label className="text-muted border p-1 m-0 p-1">
                      зарегистрировано:{" "}
                      <p className="m-0 p-0">
                        {utils.GetCleanDateTime(
                          dataIdeaDetail["register_datetime_field"],
                          true
                        )}
                      </p>
                    </label>
                  </div>
                  <div className="card-footer m-0 p-1">
                    <div className="d-flex justify-content-between m-0 p-1">
                      <span
                        className={
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "text-success"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "text-warning"
                            : "text-danger"
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
                                  dataIdeaDetail["total_rating"]["rate"],
                                  3,
                                  false
                                ) +
                                " /  " +
                                dataIdeaDetail["total_rating"]["count"]
                              }
                              className={
                                dataIdeaDetail["total_rating"]["rate"] > 7
                                  ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                                  : dataIdeaDetail["total_rating"]["rate"] > 4
                                  ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                                  : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                              }
                            >
                              <ul className="m-0 p-0">
                                {dataIdeaDetail["total_rating"]["users"].map(
                                  (object, index) => (
                                    <li
                                      key={index}
                                      className={
                                        object.split("|")[1] > 7
                                          ? "list-group-item bg-success bg-opacity-10"
                                          : object.split("|")[1] > 4
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
                      <span>
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 1
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 0.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 2
                              ? "fas fa- m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 1.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 3
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 2.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 4
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 3.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 5
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 4.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 6
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 5.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 7
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 6.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 8
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 7.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 9
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 8.5
                              ? "fas fa-star-half-alt m-0 p-0"
                              : "far fa-star m-0 p-0"
                          }
                        />
                        <i
                          style={{
                            color:
                              dataIdeaDetail["total_rating"]["rate"] > 7
                                ? "#00ff00"
                                : dataIdeaDetail["total_rating"]["rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                          }}
                          className={
                            dataIdeaDetail["total_rating"]["rate"] >= 10
                              ? "fas fa-star m-0 p-0"
                              : dataIdeaDetail["total_rating"]["rate"] >= 9.5
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
                      <span className="badge bg-secondary rounded-pill m-0 p-1">
                        {dataIdeaDetail["comment_count"]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-footer m-0 p-0">
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
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-primary m-1 p-2"
                      type="submit"
                    >
                      заменить данные
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                      onClick={(e) => handlerChangeReset(e)}
                    >
                      сбросить данные
                    </button>
                  </ul>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <div className="card m-0 p-2">
                  <div className="order-md-last m-0 p-0">
                    <components.StoreStatusComponent
                      storeStatus={ideaCommentListStore}
                      keyStatus={"ideaCommentListStore"}
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
                      storeStatus={ideaCommentDeleteStore}
                      keyStatus={"ideaCommentDeleteStore"}
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
                    {!dataIdeaCommentList ||
                    (dataIdeaCommentList && dataIdeaCommentList.length) < 1 ? (
                      <div className="my-1">
                        <components.MessageComponent variant={"warning"}>
                          Комментарии не найдены!
                        </components.MessageComponent>
                      </div>
                    ) : (
                      <ul className="list-group m-0 p-0">
                        {dataIdeaCommentList.map((object, index) => (
                          <li className="list-group-item m-0 p-1">
                            <div className="d-flex justify-content-between m-0 p-0">
                              <h6 className="btn btn-outline-warning m-0 p-2">
                                {object["user_model"]["last_name_char_field"]}{" "}
                                {object["user_model"]["first_name_char_field"]}
                              </h6>
                              <span className="text-muted m-0 p-0">
                                {utils.GetCleanDateTime(
                                  object["datetime_field"],
                                  true
                                )}
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger m-1 p-1"
                                  onClick={(e) =>
                                    handlerCommentDelete({
                                      commentId: object["id"],
                                    })
                                  }
                                >
                                  удалить комментарий
                                </button>
                              </span>
                            </div>
                            <div className="d-flex justify-content-center m-0 p-1">
                              <small className="text-muted m-0 p-1">
                                {object["comment_text_field"]}
                              </small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
