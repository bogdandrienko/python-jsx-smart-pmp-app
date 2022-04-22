// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import { BaseComponent1 } from "../components/ui/base";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as constants from "../components/constants";
import * as actions from "../components/actions";
import * as utils from "../components/utils";
import * as components from "../components/components";
import { useStateCustom1 } from "../components/hooks";
import * as hooks from "../components/hooks";

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////

export const IdeaListPage = () => {
  const dispatch = useDispatch();

  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////

  const [filter, setFilter, resetFilter] = useStateCustom1({
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
    moderate: "принято",
    detailView: true,
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const IdeaReadListStore = hooks.useSelectorCustom1(
    constants.IdeaReadListStore
  );
  const UserReadListStore = hooks.useSelectorCustom1(
    constants.UserReadListStore
  );

  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch({ type: constants.UserReadListStore.reset });
  }, []);

  useEffect(() => {
    dispatch({ type: constants.IdeaReadListStore.reset });
  }, [page]);

  useEffect(() => {
    setPage(1);
    dispatch({ type: constants.IdeaReadListStore.reset });
  }, [limit]);

  useEffect(() => {
    if (!IdeaReadListStore.data) {
      dispatch(
        actions.Idea.IdeaReadListAction(
          constants.IdeaReadListStore,
          page,
          limit
        )
      );
    }
  }, [IdeaReadListStore.data]);

  useEffect(() => {
    if (!UserReadListStore.data) {
      dispatch(
        actions.Users.UserReadListAction(
          constants.UserReadListStore,
          page,
          limit
        )
      );
    }
  }, [UserReadListStore.data]);

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    setPage(1);
    dispatch({ type: constants.IdeaReadListStore.reset });
  };

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <BaseComponent1>
      <components.AccordionComponent
        key_target={"accordion1"}
        isCollapse={false}
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
                      value={filter.detailView}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          detailView: !filter.detailView,
                        })
                      }
                    />
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Количество идей на странице:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                    >
                      <option disabled defaultValue value="">
                        количество на странице
                      </option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="-1">все</option>
                    </select>
                  </label>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-0">
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
                    {UserReadListStore.data && (
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
                          {UserReadListStore.data.list.map((user, index) => (
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
                  <components.StoreComponent
                    storeStatus={constants.UserReadListStore}
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
                            author: e.target.value.replace(
                              utils.GetRegexType({
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
                          названию (с конца алфавита
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
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      фильтровать идеи
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
              </div>
            </form>
          </ul>
        }
      </components.AccordionComponent>
      {!IdeaReadListStore.load && IdeaReadListStore.data && (
        <div className="page__wrapper">
          {utils
            .GetPagesArray(IdeaReadListStore.data["x-total-count"], limit)
            .map((p) => (
              <span
                onClick={() => setPage(p)}
                key={p}
                className={page === p ? "page page__current" : "page"}
              >
                {p}
              </span>
            ))}
        </div>
      )}
      <components.StoreComponent
        storeStatus={constants.IdeaReadListStore}
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
      {IdeaReadListStore.data && (
        <div>
          {IdeaReadListStore.data.list ? (
            <div>
              <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
                {IdeaReadListStore.data.list.map((idea, index) => (
                  <div
                    key={index}
                    className="col-sm-12 col-md-6 col-lg-4 m-0 p-1"
                  >
                    <div className="m-0 p-0">
                      <div className="card shadow custom-background-transparent-low m-0 p-0">
                        <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                          <Link
                            to={`/idea/${idea.id}`}
                            className="text-decoration-none text-dark m-0 p-0"
                          >
                            <h6 className="lead fw-bold m-0 p-0">
                              {utils.GetSliceString(
                                idea["name_char_field"],
                                50
                              )}
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
                            <div className="btn btn-sm btn-warning m-0 p-2">
                              Автор:{" "}
                              {idea["user_model"]["last_name_char_field"] &&
                                idea["user_model"]["last_name_char_field"]}{" "}
                              {idea["user_model"]["first_name_char_field"]}{" "}
                              {idea["user_model"]["position_char_field"]}
                            </div>
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
                                    ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill m-0 p-2"
                                    : idea["ratings"]["total_rate"] > 4
                                    ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill m-0 p-2"
                                    : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill m-0 p-2"
                                }
                              >
                                {`${idea["ratings"]["total_rate"]}  / ${idea["ratings"]["count"]}`}
                              </span>
                            </div>
                            <span className="m-0 p-1">
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 1
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 0.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 2
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 1.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 3
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 2.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 4
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 3.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 5
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 4.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 6
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 5.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 7
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 6.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 8
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 7.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 9
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 8.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <i
                                style={{
                                  color:
                                    idea["ratings"]["self_rate"] > 7
                                      ? "#00ff00"
                                      : idea["ratings"]["self_rate"] > 4
                                      ? "#ffaa00"
                                      : "#ff0000",
                                }}
                                className={
                                  idea["ratings"]["self_rate"] >= 10
                                    ? "fas fa-star m-0 p-0"
                                    : idea["ratings"]["self_rate"] >= 9.5
                                    ? "fas fa-star-half-alt m-0 p-0"
                                    : "far fa-star m-0 p-0"
                                }
                              />
                              <div className="m-0 p-0">Ваша оценка</div>
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
                            to={`/idea/${idea.id}`}
                          >
                            подробнее
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <h1>Idea not found!</h1>
          )}
        </div>
      )}
      {!IdeaReadListStore.load && IdeaReadListStore.data && (
        <div className="page__wrapper">
          {utils
            .GetPagesArray(IdeaReadListStore.data["x-total-count"], limit)
            .map((p) => (
              <span
                onClick={() => setPage(p)}
                key={p}
                className={page === p ? "page page__current" : "page"}
              >
                {p}
              </span>
            ))}
        </div>
      )}
    </BaseComponent1>
  );
};
