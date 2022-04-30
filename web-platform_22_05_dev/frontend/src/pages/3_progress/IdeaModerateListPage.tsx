// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "../../components/constant";
import * as action from "../../components/action";
import * as util from "../../components/util";
import * as hook from "../../components/hook";

import * as component from "../../components/ui/component";
import * as message from "../../components/ui/message";
import * as base from "../../components/ui/base";
import * as paginator from "../../components/ui/paginator";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function IdeaModerateListPage(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const IdeaReadListStore = hook.useSelectorCustom1(constant.IdeaReadListStore);
  const userReadListStore = hook.useSelectorCustom1(constant.userReadListStore);

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    detailView: true,
  });

  const [filter, setFilter, resetFilter] = hook.useStateCustom1({
    sort: "дате публикации (свежие в начале)",
    query: "",
    search: "",
    subdivision: "",
    sphere: "",
    category: "",
    author: "",
    name: "",
    place: "",
    description: "",
    moderate: "на модерации",
    onlyMonth: true,
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!IdeaReadListStore.data) {
      dispatch(
        action.Idea.ReadList({
          ...filter,
          ...pagination,
        })
      );
    }
  }, [IdeaReadListStore.data]);

  useEffect(() => {
    dispatch({ type: constant.IdeaReadListStore.reset });
  }, []);

  useEffect(() => {
    dispatch({ type: constant.IdeaReadListStore.reset });
  }, [pagination.page]);

  useEffect(() => {
    setPagination({ ...pagination, page: 1 });
    dispatch({ type: constant.IdeaReadListStore.reset });
  }, [pagination.limit]);

  useEffect(() => {
    if (!userReadListStore.data) {
      dispatch(action.User.ReadList());
    }
  }, [userReadListStore.data]);

  useEffect(() => {
    dispatch({ type: constant.userReadListStore.reset });
  }, []);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <component.Accordion1
        key_target={"accordion1"}
        isCollapse={true}
        title={
          <span>
            <i className="fa-solid fa-filter" /> Фильтрация, поиск и сортировка:
          </span>
        }
        text_style="text-success"
        header_style="bg-success bg-opacity-10 custom-background-transparent-low"
        body_style="bg-light bg-opacity-10 custom-background-transparent-low"
      >
        {
          <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
            <form
              className="m-0 p-0"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setPagination({ ...pagination, page: 1 });
                dispatch({ type: constant.IdeaReadListStore.reset });
              }}
            >
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Сортировка по:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.sort}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            sort: e.target.value,
                          })
                        }
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
                    <label className="form-control-sm text-center m-0 p-1">
                      Статус:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.moderate}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            moderate: e.target.value,
                          })
                        }
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
                    <label className="form-control-sm text-center m-0 p-1">
                      Подразделение:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.subdivision}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            subdivision: e.target.value,
                          })
                        }
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
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Сфера:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.sphere}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            sphere: e.target.value,
                          })
                        }
                      >
                        <option className="m-0 p-0" value="">
                          все варианты
                        </option>
                        <option className="m-0 p-0" value="технологическая">
                          технологическая
                        </option>
                        <option className="m-0 p-0" value="не технологическая">
                          не технологическая
                        </option>
                      </select>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Категория:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.category}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            category: e.target.value,
                          })
                        }
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
                        <option className="m-0 p-0" value="социальное/персонал">
                          социальное/персонал
                        </option>
                        <option className="m-0 p-0" value="другое">
                          другое
                        </option>
                      </select>
                    </label>
                    {userReadListStore.data && (
                      <label className="form-control-sm text-center m-0 p-1">
                        Автор:
                        <select
                          className="form-control form-control-sm text-center m-0 p-1"
                          value={filter.author}
                          onChange={(e) =>
                            setFilter({
                              ...filter,
                              author: e.target.value,
                            })
                          }
                        >
                          <option className="m-0 p-0" value="">
                            все варианты
                          </option>
                          {userReadListStore.data.list.map(
                            (user = "", index = 0) => (
                              <option
                                key={index}
                                value={user}
                                className="m-0 p-0"
                              >
                                {user}
                              </option>
                            )
                          )}
                        </select>
                      </label>
                    )}
                    <component.StoreComponent1
                      stateConstant={constant.userReadListStore}
                      consoleLog={constant.DEBUG_CONSTANT}
                      showLoad={false}
                      loadText={""}
                      showData={false}
                      dataText={""}
                      showError={true}
                      errorText={""}
                      showFail={true}
                      failText={""}
                    />
                  </div>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Поле поиска по части названия:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        placeholder="введите часть названия тут..."
                        value={filter.search}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            search: e.target.value.replace(
                              util.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                                punctuationMarks: true,
                              }),
                              ""
                            ),
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="card-body m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-primary m-1 p-2"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      обновить данные
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                      onClick={() => resetFilter()}
                    >
                      <i className="fa-solid fa-pen-nib m-0 p-1" />
                      сбросить фильтры
                    </button>
                  </ul>
                </div>
                <div className="card-footer text-end m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Количество идей на странице:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={pagination.limit}
                      onChange={(event) =>
                        setPagination({
                          ...pagination,
                          // @ts-ignore
                          limit: event.target.value,
                        })
                      }
                    >
                      <option disabled defaultValue={""} value="">
                        количество на странице
                      </option>
                      <option value="9">9</option>
                      <option value="18">18</option>
                      <option value="36">36</option>
                      <option value="-1">все</option>
                    </select>
                  </label>
                  <label className="form-control-sm form-switch text-center m-0 p-1">
                    Детальное отображение:
                    <input
                      type="checkbox"
                      className="form-check-input m-0 p-1"
                      id="flexSwitchCheckDefault"
                      checked={pagination.detailView}
                      onChange={() =>
                        setPagination({
                          ...pagination,
                          detailView: !pagination.detailView,
                        })
                      }
                    />
                  </label>
                </div>
              </div>
            </form>
          </ul>
        }
      </component.Accordion1>
      {!IdeaReadListStore.load && IdeaReadListStore.data && (
        <paginator.Pagination1
          totalObjects={IdeaReadListStore.data["x-total-count"]}
          limit={pagination.limit}
          page={pagination.page}
          // @ts-ignore
          changePage={(page) =>
            setPagination({
              ...pagination,
              page: page,
            })
          }
        />
      )}
      <component.StoreComponent1
        stateConstant={constant.IdeaReadListStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showLoad={true}
        loadText={""}
        showData={false}
        dataText={""}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      {!IdeaReadListStore.load && IdeaReadListStore.data ? (
        IdeaReadListStore.data.list.length > 0 ? (
          <div className={"m-0 p-0"}>
            {" "}
            {pagination.detailView ? (
              <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
                {IdeaReadListStore.data.list.map(
                  // @ts-ignore
                  (idea, index) => (
                    <div
                      key={index}
                      className="col-sm-12 col-md-6 col-lg-4 m-0 p-1"
                    >
                      <div className="m-0 p-0">
                        <div className="card shadow custom-background-transparent-low m-0 p-0">
                          <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                            <Link
                              to={`/idea/moderate/${idea.id}`}
                              className="text-decoration-none text-dark m-0 p-0"
                            >
                              <h6 className="lead fw-bold m-0 p-0">
                                {util.GetSliceString(
                                  idea["name_char_field"],
                                  50
                                )}
                              </h6>
                              <h6 className="text-danger lead small m-0 p-0">
                                {" [ "}
                                {util.GetSliceString(
                                  idea["status_moderate_char_field"],
                                  30
                                )}
                                {" : "}
                                {util.GetSliceString(
                                  idea["comment_moderate_char_field"],
                                  30
                                )}
                                {" ]"}
                              </h6>
                            </Link>
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
                                    ? util.GetStaticFile(idea["image_field"])
                                    : util.GetStaticFile(
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
                                  defaultValue={util.GetSliceString(
                                    idea["place_char_field"],
                                    50
                                  )}
                                  readOnly={true}
                                  placeholder="введите место изменения тут..."
                                  required
                                  minLength={1}
                                  maxLength={300}
                                />
                              </label>
                            </div>
                            <div className="m-0 p-0">
                              <label className="form-control-sm text-center w-100 m-0 p-1">
                                Описание:
                                <textarea
                                  className="form-control form-control-sm text-center m-0 p-1"
                                  defaultValue={util.GetSliceString(
                                    idea["description_text_field"],
                                    100
                                  )}
                                  readOnly={true}
                                  required
                                  placeholder="введите описание тут..."
                                  minLength={1}
                                  maxLength={3000}
                                  rows={3}
                                />
                              </label>
                            </div>
                            <div className="m-0 p-0">
                              <div className="btn btn-sm btn-warning m-0 p-2">
                                Автор:{" "}
                                {idea["user_model"]["last_name_char_field"] &&
                                  idea["user_model"][
                                    "last_name_char_field"
                                  ]}{" "}
                                {idea["user_model"]["first_name_char_field"]}{" "}
                                {idea["user_model"]["position_char_field"]}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between m-1 p-0">
                              <label className="text-muted border m-0 p-2">
                                подано:{" "}
                                <p className="m-0">
                                  {util.GetCleanDateTime(
                                    idea["created_datetime_field"],
                                    true
                                  )}
                                </p>
                              </label>
                              <label className="text-muted border m-1 p-2">
                                зарегистрировано:{" "}
                                <p className="m-0 p-0">
                                  {util.GetCleanDateTime(
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
                                  idea["ratings"]["total_rate"] > 7
                                    ? "text-success m-0 p-1"
                                    : idea["ratings"]["total_rate"] > 4
                                    ? "custom-color-warning-1 m-0 p-1"
                                    : "text-danger m-0 p-1"
                                }
                              >
                                Рейтинг
                              </span>
                              <div className="m-0 p-1">
                                <span
                                  className={
                                    idea["ratings"]["total_rate"] > 7
                                      ? "btn btn-sm bg-success disabled bg-opacity-50 badge rounded-pill text-dark lead fw-bold m-0 p-2"
                                      : idea["ratings"]["total_rate"] > 4
                                      ? "btn btn-sm bg-warning disabled bg-opacity-50 badge rounded-pill text-dark lead fw-bold m-0 p-2"
                                      : "btn btn-sm bg-danger disabled bg-opacity-50 badge rounded-pill text-dark lead fw-bold m-0 p-2"
                                  }
                                >
                                  {`${idea["ratings"]["total_rate"]}  / ${idea["ratings"]["count"]}`}
                                </span>
                                <div className="m-0 p-0">
                                  <small>Рейтинг / голоса</small>
                                </div>
                              </div>
                              <span className="m-0 p-1">
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 1
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 0.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 2
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 1.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 3
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 2.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 4
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 3.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 5
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 4.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 6
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 5.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 7
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 6.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 8
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 7.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 9
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 8.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <i
                                  style={{
                                    color:
                                      idea["ratings"]["total_rate"] > 7
                                        ? "#00ff00"
                                        : idea["ratings"]["total_rate"] > 4
                                        ? "#ffaa00"
                                        : "#ff0000",
                                  }}
                                  className={
                                    idea["ratings"]["total_rate"] >= 10
                                      ? "fas fa-star m-0 p-0"
                                      : idea["ratings"]["total_rate"] >= 9.5
                                      ? "fas fa-star-half-alt m-0 p-0"
                                      : "far fa-star m-0 p-0"
                                  }
                                />
                                <div className="m-0 p-0">
                                  <small>Общий рейтинг</small>
                                </div>
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
                              to={`/idea/moderate/${idea.id}`}
                              className="btn btn-sm btn-danger w-100 m-0 p-2"
                            >
                              модерация
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </ul>
            ) : (
              <div className="card shadow m-0 p-0 my-1">
                {IdeaReadListStore.data.list.map(
                  // @ts-ignore
                  (idea, index) => (
                    <Link
                      key={index}
                      to={`/idea/${idea.id}`}
                      className="text-decoration-none m-0 p-0"
                    >
                      <li className="border list-group-item-action text-start small m-0 p-1">
                        {util.GetSliceString(idea["name_char_field"], 50)}
                        {util.GetCleanDateTime(
                          " | " + idea["register_datetime_field"],
                          true
                        )}
                        {util.GetSliceString(
                          " | " + idea["user_model"]["last_name_char_field"],
                          20
                        )}
                        {util.GetSliceString(
                          " " + idea["user_model"]["first_name_char_field"],
                          20
                        )}
                        {util.GetSliceString(
                          " | " + idea["ratings"]["total_rate"],
                          20
                        )}
                        {util.GetSliceString(
                          " / " + idea["ratings"]["count"],
                          20
                        )}
                        {util.GetSliceString(
                          " | " + idea["status_moderate_char_field"],
                          20
                        )}
                        {util.GetSliceString(
                          " : " + idea["comment_moderate_char_field"],
                          20
                        )}
                      </li>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          <message.Message.Secondary>
            Идеи не найдены! Попробуйте изменить условия фильтрации и/или
            очистить строку поиска.
          </message.Message.Secondary>
        )
      ) : (
        ""
      )}
      {!IdeaReadListStore.load && IdeaReadListStore.data && (
        <paginator.Pagination1
          totalObjects={IdeaReadListStore.data["x-total-count"]}
          limit={pagination.limit}
          page={pagination.page}
          // @ts-ignore
          changePage={(page) =>
            setPagination({
              ...pagination,
              page: page,
            })
          }
        />
      )}
    </base.Base1>
  );
}
