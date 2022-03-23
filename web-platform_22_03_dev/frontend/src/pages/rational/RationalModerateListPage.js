///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const RationalModerateListPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [detailView, detailViewSet] = useState(true);
  const [subdivision, subdivisionSet] = useState("");
  const [category, categorySet] = useState("");
  const [author, authorSet] = useState("");
  const [search, searchSet] = useState("");
  const [sort, sortSet] = useState("дате публикации (свежие в начале)");
  const [moderate, moderateSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userListAllStore = useSelector((state) => state.userListAllStore);
  const {
    // load: loadUserListAll,
    data: dataUserListAll,
    // error: errorUserListAll,
    // fail: failUserListAll,
  } = userListAllStore;
  //////////////////////////////////////////////////////////
  const rationalListStore = useSelector((state) => state.rationalListStore);
  const {
    load: loadRationalList,
    data: dataRationalList,
    // error: errorRationalList,
    // fail: failRationalList,
  } = rationalListStore;
  //////////////////////////////////////////////////////////
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (!dataUserListAll) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAction(form));
    }
  }, [dispatch, dataUserListAll]);
  //////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
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
    dispatch(actions.rationalListAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  //////////////////////////////////////////////////////////
  const handlerReset = async (e) => {
    e.preventDefault();
    categorySet("");
    authorSet("");
    searchSet("");
    sortSet("дате публикации (свежие в начале)");
    getData();
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <components.AccordionComponent
          key_target={"accordion1"}
          isCollapse={true}
          title={"Фильтрация, поиск и сортировка:"}
          text_style="text-success"
          header_style="bg-success bg-opacity-10 custom-background-transparent-low"
          body_style="bg-light bg-opacity-10 custom-background-transparent-low"
        >
          {
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center  ">
              <form autoComplete="on" className="" onSubmit={handlerSubmit}>
                <div className="">
                  <label className="lead">
                    Выберите нужные настройки фильтрации и сортировки, затем
                    нажмите кнопку{" "}
                    <p className="fw-bold text-primary">"фильтровать"</p>
                  </label>
                  <label className="form-control-sm form-switch text-center m-0 p-1">
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
                <div className="">
                  {utils.CheckAccess(userDetailsStore, "rational_admin") ||
                  utils.CheckAccess(
                    userDetailsStore,
                    "rational_moderator_no_tech_post"
                  ) ||
                  utils.CheckAccess(
                    userDetailsStore,
                    "rational_moderator_tech_post"
                  ) ? (
                    <label className="form-control-sm text-center m-0 p-1">
                      Подразделение:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
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
                  <label className="form-control-sm text-center m-0 p-1">
                    Категория:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={category}
                      onChange={(e) => categorySet(e.target.value)}
                    >
                      <option value="">все варианты</option>
                      <option value="Индустрия 4.0">Индустрия 4.0</option>
                      <option value="Инвестиции">Инвестиции</option>
                      <option value="Инновации">Инновации</option>
                      <option value="Модернизация">Модернизация</option>
                      <option value="Экология">Экология</option>
                    </select>
                  </label>
                  {dataUserListAll && (
                    <label className="form-control-sm text-center m-0 p-1">
                      Автор:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
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
                  <components.StoreStatusComponent
                    storeStatus={userListAllStore}
                    key={"userListAllStore"}
                    consoleLog={constants.DEBUG_CONSTANT}
                    showLoad={false}
                    loadText={""}
                    showData={false}
                    dataText={""}
                    showError={true}
                    errorText={""}
                    showFail={true}
                    failText={""}
                  />
                  {utils.CheckAccess(userDetailsStore, "rational_admin") && (
                    <label className="form-control-sm text-center m-0 p-1">
                      Статус:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
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
                <div className="">
                  <label className="w-50 form-control-sm">
                    Поле поиска по части названия:
                    <input
                      type="text"
                      className="form-control"
                      placeholder="вводите часть названия тут..."
                      value={search}
                      onChange={(e) =>
                        searchSet(
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
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Сортировка по:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
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
                      <option value="названию (с конца алфавита">
                        названию (с конца алфавита
                      </option>
                    </select>
                  </label>
                </div>
                <div className="btn-group p-1 m-0 text-start w-100">
                  <button className="btn btn-sm btn-primary" type="submit">
                    фильтровать
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    type="button"
                    onClick={handlerReset}
                  >
                    сбросить фильтры
                  </button>
                </div>
              </form>
            </ul>
          }
        </components.AccordionComponent>
        <components.StoreStatusComponent
          storeStatus={rationalListStore}
          key={"rationalListStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={false}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {!dataRationalList || dataRationalList.length < 1 ? (
          <components.MessageComponent variant={"danger"}>
            Рац. предложения не найдены! Попробуйте изменить условия фильтрации
            или очистить строку поиска.
          </components.MessageComponent>
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
                  {utils.GetSliceString(rational["subdivision_char_field"], 30)}
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
          <div className="row justify-content-center  ">
            {dataRationalList.map((rational, index) => (
              <Link
                key={index}
                to={`/rational_moderate_detail/${rational.id}`}
                className="text-decoration-none text-center p-2 m-0 col-md-6"
              >
                <components.RationalComponent
                  key={index}
                  object={rational}
                  shortView={true}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
