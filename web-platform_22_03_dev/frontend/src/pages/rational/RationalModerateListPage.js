import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import ReactPlayer from "react-player";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import MessageComponent from "../../components/MessageComponent";
import RationalComponent from "../../components/RationalComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [detailView, detailViewSet] = useState(true);
  const [subdivision, subdivisionSet] = useState("");
  const [category, categorySet] = useState("");
  const [author, authorSet] = useState("");
  const [search, searchSet] = useState("");
  const [sort, sortSet] = useState("Дате публикации (сначала свежие)");
  const [moderate, moderateSet] = useState("");

  const userListAllStore = useSelector((state) => state.userListAllStore); // store.js
  const {
    // load: loadUserListAll,
    data: dataUserListAll,
    // error: errorUserListAll,
    // fail: failUserListAll,
  } = userListAllStore;
  const rationalListStore = useSelector((state) => state.rationalListStore); // store.js
  const {
    load: loadRationalList,
    data: dataRationalList,
    // error: errorRationalList,
    // fail: failRationalList,
  } = rationalListStore;
  const userDetailsStore = useSelector((state) => state.userDetailsStore); // store.js
  const {
    load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  const getData = () => {
    const form = {
      "Action-type": "RATIONAL_LIST",
      subdivision: subdivision,
      category: category,
      author: author,
      search: search,
      sort: sort,
      moderate: moderate,
    };
    dispatch(actions.rationalListAuthAction(form));
  };

  useEffect(() => {
    if (!dataUserListAll) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAuthAction(form));
    }
  }, [dispatch, dataUserListAll]);

  useEffect(() => {
    if (
      !dataRationalList &&
      !loadRationalList &&
      dataUserDetails &&
      !loadUserDetails &&
      dataUserListAll
    ) {
      getData();
    }
  }, [
    dispatch,
    dataRationalList,
    loadRationalList,
    dataUserDetails,
    loadUserDetails,
    dataUserListAll,
  ]);

  useEffect(() => {
    if (dataUserDetails) {
      if (
        utils.CheckAccess(userDetailsStore, "rational_moderator_no_tech_post")
      ) {
        moderateSet("Постнетехмодерация");
      } else {
        if (
          utils.CheckAccess(userDetailsStore, "rational_moderator_tech_post")
        ) {
          moderateSet("Посттехмодерация");
        } else {
          if (
            utils.CheckAccess(
              userDetailsStore,
              "rational_moderator_tech_pre_atp"
            )
          ) {
            moderateSet("Предтехмодерация");
            subdivisionSet("Автотранспортное предприятие");
          }
          if (
            utils.CheckAccess(
              userDetailsStore,
              "rational_moderator_tech_pre_gtk"
            )
          ) {
            moderateSet("Предтехмодерация");
            subdivisionSet("Горно-транспортный комплекс");
          }
          if (
            utils.CheckAccess(
              userDetailsStore,
              "rational_moderator_tech_pre_ok"
            )
          ) {
            moderateSet("Предтехмодерация");
            subdivisionSet("Обогатительный комплекс");
          }
          if (
            utils.CheckAccess(
              userDetailsStore,
              "rational_moderator_tech_pre_uprav"
            )
          ) {
            moderateSet("Предтехмодерация");
            subdivisionSet("Управление предприятия");
          }
          if (
            utils.CheckAccess(
              userDetailsStore,
              "rational_moderator_tech_pre_energouprav"
            )
          ) {
            moderateSet("Предтехмодерация");
            subdivisionSet("Энергоуправление");
          }
        }
      }
    }
  }, [dispatch, dataUserDetails]);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const formHandlerReset = async (e) => {
    e.preventDefault();
    categorySet("");
    authorSet("");
    searchSet("");
    sortSet("Дате публикации (сначала свежие)");
    getData();
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Модератор рац. предложений"}
        second={"страница модерации рац. предложений."}
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            userListAllStore,
            "userListAllStore",
            false,
            "",
            constants.DEBUG_CONSTANT
          )}
          {StoreStatusComponent(
            rationalListStore,
            "rationalListStore",
            false,
            "",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="p-0 m-0">
          <div className="container-fluid form-control bg-opacity-10 bg-success">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center p-0 m-0">
              <form autoComplete="on" className="" onSubmit={formHandlerSubmit}>
                <div className="p-0 m-0">
                  <label className="lead">
                    Выберите нужные настройки фильтрации и сортировки, затем
                    нажмите кнопку{" "}
                    <p className="fw-bold text-primary">
                      "фильтровать рац. предложения"
                    </p>
                  </label>
                  <label className="form-control-sm form-switch m-1">
                    Детальное отображение:
                    <input
                      type="checkbox"
                      className="form-check-input m-1"
                      id="flexSwitchCheckDefault"
                      defaultChecked={detailView}
                      onClick={(e) => detailViewSet(!detailView)}
                    />
                  </label>
                </div>
                <div className="p-0 m-0">
                  {utils.CheckAccess(userDetailsStore, "rational_admin") ||
                  utils.CheckAccess(
                    userDetailsStore,
                    "rational_moderator_no_tech_post"
                  ) ||
                  utils.CheckAccess(
                    userDetailsStore,
                    "rational_moderator_tech_post"
                  ) ? (
                    <label className="form-control-sm m-1">
                      Наименование структурного подразделения:
                      <select
                        className="form-control form-control-sm"
                        value={subdivision}
                        onChange={(e) => subdivisionSet(e.target.value)}
                      >
                        <option value="">все варианты</option>
                        <option value="Автотранспортное предприятие">
                          Автотранспортное предприятие
                        </option>
                        <option value="Горно-транспортный комплекс">
                          Горно-транспортный комплекс
                        </option>
                        <option value="Обогатительный комплекс">
                          Обогатительный комплекс
                        </option>
                        <option value="Управление">
                          Управление предприятия
                        </option>
                        <option value="Энергоуправление">
                          Энергоуправление
                        </option>
                      </select>
                    </label>
                  ) : (
                    ""
                  )}
                  <label className="form-control-sm">
                    Категория:
                    <select
                      className="form-control form-control-sm"
                      value={category}
                      onChange={(e) => categorySet(e.target.value)}
                    >
                      <option value="">все варианты</option>
                      <option value="Индустрия 4.0">Индустрия 4.0</option>
                      <option value="Инвестиционное">Инвестиционное</option>
                      <option value="Инновационное">Инновационное</option>
                      <option value="Модернизационное">Модернизационное</option>
                    </select>
                  </label>
                  {dataUserListAll && (
                    <label className="form-control-sm m-1">
                      Автор:
                      <select
                        className="form-control form-control-sm"
                        value={author}
                        onChange={(e) => authorSet(e.target.value)}
                      >
                        <option value="">все варианты</option>
                        {dataUserListAll.map((user, index) => (
                          <option key={index} value={user}>
                            {user}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  {utils.CheckAccess(userDetailsStore, "rational_admin") && (
                    <label className="form-control-sm m-1">
                      Статус:
                      <select
                        className="form-control form-control-sm"
                        value={moderate}
                        onChange={(e) => moderateSet(e.target.value)}
                      >
                        <option value="">все варианты</option>
                        <option value="Предтехмодерация">
                          Предтехмодерация
                        </option>
                        <option value="Посттехмодерация">
                          Посттехмодерация
                        </option>
                        <option value="Постнетехмодерация">
                          Постнетехмодерация
                        </option>
                        <option value="Отклонено">Отклонено</option>
                        <option value="Принято">Принято</option>
                      </select>
                    </label>
                  )}
                </div>
                <div className="p-0 m-0">
                  <label className="w-50 form-control-sm">
                    Поле поиска по части названия:
                    <input
                      type="text"
                      className="form-control"
                      placeholder="вводите часть названия тут..."
                      value={search}
                      onChange={(e) => searchSet(e.target.value)}
                    />
                  </label>
                  <label className="form-control-sm m-1">
                    Сортировка по:
                    <select
                      className="form-control form-control-sm"
                      value={sort}
                      onChange={(e) => sortSet(e.target.value)}
                    >
                      <option value="Дате публикации (сначала свежие)">
                        Дате публикации (сначала свежие)
                      </option>
                      <option value="Дате публикации (сначала старые)">
                        Дате публикации (сначала старые)
                      </option>
                      <option value="Названию (С начала алфавита)">
                        Названию (С начала алфавита)
                      </option>
                      <option value="Названию (С конца алфавита)">
                        Названию (С конца алфавита)
                      </option>
                    </select>
                  </label>
                </div>
                <div className="btn-group p-1 m-0 text-start w-100">
                  <button className="btn btn-sm btn-primary" type="submit">
                    фильтровать рац. предложения
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    type="button"
                    onClick={formHandlerReset}
                  >
                    сбросить фильтры
                  </button>
                </div>
              </form>
            </ul>
          </div>
          {!dataRationalList || dataRationalList.length < 1 ? (
            <MessageComponent variant={"danger"}>
              Рац. предложения не найдены! Попробуйте изменить условия
              фильтрации или очистить строку поиска.
            </MessageComponent>
          ) : !detailView ? (
            <ul className="bg-opacity-10 bg-primary shadow">
              {dataRationalList.map((rational, index) => (
                <Link
                  key={index}
                  to={`/rational_moderate_detail/${rational.id}`}
                  className="text-decoration-none"
                >
                  <li className="lead border list-group-item-action">
                    {utils.GetSliceString(rational["name_char_field"], 20)}
                    {" | "}
                    {utils.GetSliceString(rational["number_char_field"], 20)}
                    {" | "}
                    {utils.GetSliceString(
                      rational["subdivision_char_field"],
                      30
                    )}
                    {" | "}
                    {utils.GetSliceString(
                      rational["user_model"]["last_name_char_field"],
                      30
                    )}{" "}
                    {utils.GetSliceString(
                      rational["user_model"]["first_name_char_field"],
                      30
                    )}
                    {" | "}
                    {utils.GetSliceString(
                      rational["status_moderate_char_field"],
                      30
                    )}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="row justify-content-center p-0 m-0">
              {dataRationalList.map((rational, index) => (
                <Link
                  key={index}
                  to={`/rational_moderate_detail/${rational.id}`}
                  className="text-decoration-none text-center p-2 m-0 col-md-6"
                >
                  <RationalComponent
                    key={index}
                    rational={rational}
                    shortView={true}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalListPage;
