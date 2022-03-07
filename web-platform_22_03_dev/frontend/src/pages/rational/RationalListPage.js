import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { rationalListAction, userDetailsAction } from "../../js/actions";
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import LoaderComponent from "../../components/LoaderComponent";
import MessageComponent from "../../components/MessageComponent";
import { Link } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalListPage = () => {
  const dispatch = useDispatch();

  const [subdivision, setSubdivision] = useState("");
  const [sphere, setSphere] = useState("");
  const [premoderate, setPremoderate] = useState("Приостановлено");
  const [postmoderate, setPostmoderate] = useState("Приостановлено");

  const [preModerateAuthor, setPreModerateAuthor] = useState("");
  const [postModerateAuthor, setPostModerateAuthor] = useState("");

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  useEffect(() => {
    if (dataUserDetails) {
      if (dataUserDetails["user_model"] && preModerateAuthor === "") {
        setPreModerateAuthor(
          `${dataUserDetails["user_model"]["last_name_char_field"]} ${dataUserDetails["user_model"]["first_name_char_field"]} ${dataUserDetails["user_model"]["patronymic_char_field"]} ${dataUserDetails["user_model"]["personnel_number_slug_field"]} ${dataUserDetails["user_model"]["position_char_field"]}`
        );
        setPostModerateAuthor(
          `${dataUserDetails["user_model"]["last_name_char_field"]} ${dataUserDetails["user_model"]["first_name_char_field"]} ${dataUserDetails["user_model"]["patronymic_char_field"]} ${dataUserDetails["user_model"]["personnel_number_slug_field"]} ${dataUserDetails["user_model"]["position_char_field"]}`
        );
      }
    } else {
      dispatch(userDetailsAction());
    }
  }, [dispatch, dataUserDetails]);

  const rationalListStore = useSelector((state) => state.rationalListStore);
  const {
    load: loadRationalList,
    data: dataRationalList,
    error: errorRationalList,
    fail: failRationalList,
  } = rationalListStore;

  useEffect(() => {
    if (dataRationalList) {
    } else {
      const form = {
        "Action-type": "RATIONAL_LIST",
        sphere: sphere,
        subdivision: subdivision,
        premoderate: premoderate,
        postmoderate: postmoderate,
      };
      dispatch(rationalListAction(form));
    }
  }, [dispatch, dataRationalList]);

  function getStaticFile(str) {
    return `/static${str}`;
  }

  function getCleanDateTime(dateTime) {
    try {
      return `${dateTime.split("T")[0]} ${dateTime
        .split("T")[1]
        .slice(0, -16)}`;
    } catch (error) {
      return "ошибка даты";
    }
  }

  const submitUpdateHandler = (e) => {
    e.preventDefault();

    const form = {
      "Action-type": "RATIONAL_LIST",
      sphere: sphere,
      subdivision: subdivision,
      premoderate: premoderate,
      postmoderate: postmoderate,
    };
    dispatch(rationalListAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Все рац. предложения"}
        second={
          "страница содержит форму для фильтрации всех рац. предложений по разным категориям."
        }
      />
      <main className="container-fluid text-center">
        <div className="text-center">
          {loadRationalList && <LoaderComponent />}
          {dataRationalList && (
            <div className="m-1">
              <MessageComponent variant="success">
                Данные успешно получены!
              </MessageComponent>
            </div>
          )}
          {errorRationalList && (
            <div className="m-1">
              <MessageComponent variant="danger">
                {errorRationalList}
              </MessageComponent>
            </div>
          )}
          {failRationalList && (
            <div className="m-1">
              <MessageComponent variant="warning">
                {failRationalList}
              </MessageComponent>
            </div>
          )}
        </div>
        <div className="">
          <label className="form-control-sm m-1">
            Сфера рац. предложения:
            <select
              id="sphere"
              name="sphere"
              required
              className="form-control form-control-sm"
              value={sphere}
              onChange={(e) => setSphere(e.target.value)}
            >
              <option value="">Не выбрано</option>
              <option value="Технологическая">Технологическая</option>
              <option value="Не технологическая">Не технологическая</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="form-control-sm m-1">
            Наименование структурного подразделения:
            <select
              id="subdivision"
              name="subdivision"
              required
              className="form-control form-control-sm"
              value={subdivision}
              onChange={(e) => setSubdivision(e.target.value)}
            >
              <option value="">Не выбрано</option>
              <option value="Управление">Управление</option>
              <option value="Обогатительный комплекс">
                Обогатительный комплекс
              </option>
              <option value="Горно-транспортный комплекс">
                Горно-транспортный комплекс
              </option>
              <option value="Автотранспортное предприятие">
                Автотранспортное предприятие
              </option>
              <option value="Энергоуправление">Энергоуправление</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="w-25 form-control-sm m-1">
            Заключение премодерации:
            <select
              id="category_slug_field"
              name="category_slug_field"
              required
              className="form-control form-control-sm"
              value={premoderate}
              onChange={(e) => setPremoderate(e.target.value)}
            >
              <option value="Приостановлено">Приостановлено</option>
              <option value="Принято">Принято</option>
              <option value="Отклонено">Отклонено</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="w-25 form-control-sm m-1">
            Заключение постмодерации:
            <select
              id="category_slug_field"
              name="category_slug_field"
              required
              className="form-control form-control-sm"
              value={postmoderate}
              onChange={(e) => setPostmoderate(e.target.value)}
            >
              <option value="Приостановлено">Приостановлено</option>
              <option value="Принято">Принято</option>
              <option value="Отклонено">Отклонено</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="form-control-sm m-1">
            <button
              onClick={submitUpdateHandler}
              className="btn btn-sm btn-primary"
            >
              Обновить
            </button>
          </label>
          <ul className="row row-cols-1 row-cols-md-3 row-cols-lg-4 nav justify-content-center">
            {!dataRationalList || dataRationalList.length < 1 ? (
              <div className="text-center text-danger lead">
                Рац. предложения не получены! Попробуйте обновить страницу или
                зайдите позже!
              </div>
            ) : (
              dataRationalList.map(
                (rational, index) =>
                  rational && (
                    <li key={index} className="container-fluid m-1">
                      <div className="card shadow">
                        <div>
                          <div className="">
                            <div className="card-header">
                              <Link
                                to={`/rational_detail/${rational.id}`}
                                className="btn btn-lg btn-outline-primary"
                              >
                                <h6 className="lead fw-bold">
                                  {rational["name_char_field"]}
                                </h6>
                              </Link>
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
                                  <option value="">
                                    {rational["subdivision_char_field"]}
                                  </option>
                                </select>
                              </label>
                              <label className="w-100 form-control-sm m-1">
                                Зарегистрировано за №{" "}
                                <strong className="btn btn-light disabled">
                                  {rational["number_char_field"]}
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
                                  <option value="">
                                    {rational["sphere_char_field"]}
                                  </option>
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
                                  <option value="">
                                    {rational["category_char_field"]}
                                  </option>
                                </select>
                              </label>
                              <div>
                                <label className="form-control-sm m-1">
                                  {rational["avatar_image_field"] ? (
                                    <img
                                      src={getStaticFile(
                                        rational["avatar_image_field"]
                                      )}
                                      className="card-img-top img-fluid w-50"
                                      alt="id"
                                    />
                                  ) : (
                                    <img
                                      src="/static/media/uploads/rational/default_rational.jpg"
                                      className="card-img-top img-fluid w-50"
                                      alt="id"
                                    />
                                  )}
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="w-100 form-control-sm">
                                Предполагаемое место внедрения:
                                <input
                                  type="text"
                                  id="name_char_field"
                                  name="name_char_field"
                                  required
                                  placeholder="Цех / участок / отдел / лаборатория и т.п."
                                  value={rational["place_char_field"]}
                                  minLength="1"
                                  maxLength="100"
                                  className="form-control form-control-sm"
                                />
                              </label>
                            </div>
                            <div>
                              <label className="w-100 form-control-sm">
                                Краткое описание:
                                <textarea
                                  id="short_description_char_field"
                                  name="short_description_char_field"
                                  required
                                  placeholder="Краткое описание"
                                  value={
                                    rational["short_description_char_field"]
                                  }
                                  minLength="1"
                                  maxLength="200"
                                  rows="2"
                                  className="form-control form-control-sm"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="container-fluid text-center">
                            <a
                              className="btn btn-sm btn-outline-warning m-1"
                              href="#"
                            >
                              Автор:{" "}
                              {rational["user_model"]["last_name_char_field"]}{" "}
                              {rational["user_model"]["first_name_char_field"]}{" "}
                              {rational["user_model"]["patronymic_char_field"]}
                            </a>
                          </div>
                          <div className="container-fluid d-flex justify-content-between p-0">
                            <small className="text-muted border">
                              подано:{" "}
                              <p>
                                {getCleanDateTime(
                                  rational["created_datetime_field"]
                                )}
                              </p>
                            </small>
                            <small className="text-muted border">
                              зарегистрировано:{" "}
                              <p>
                                {getCleanDateTime(
                                  rational["register_datetime_field"]
                                )}
                              </p>
                            </small>
                          </div>
                        </div>
                        <div className="card-header">
                          <Link
                            to={`/rational_detail/${rational.id}`}
                            className="btn btn-sm btn-primary w-100"
                          >
                            Подробнее
                          </Link>
                        </div>
                      </div>
                    </li>
                  )
              )
            )}
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalListPage;
