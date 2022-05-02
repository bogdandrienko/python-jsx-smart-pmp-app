// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "../../components/constant";
import * as util from "../../components/util";
import * as hook from "../../components/hook";
import * as slice from "../../components/slice";

import * as component from "../../components/ui/component";
import * as message from "../../components/ui/message";
import * as base from "../../components/ui/base";
import * as paginator from "../../components/ui/paginator";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function IdeaRatingListPage(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ideaReadListStore = hook.useSelectorCustom2(
    slice.idea.ideaReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [
    paginationIdeaListForm,
    setPaginationIdeaListForm,
    resetPaginationIdeaListForm,
  ] = hook.useStateCustom1({
    page: 1,
    limit: 9,
    detailView: true,
  });

  const [filterIdeaListForm, setFilterIdeaListForm, resetFilterIdeaListForm] =
    hook.useStateCustom1({
      sort: "рейтингу (популярные в начале)",
      onlyMonth: true,
      moderate: "принято",
    });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!ideaReadListStore.data) {
      dispatch(
        slice.idea.ideaReadListStore.action({
          form: { ...filterIdeaListForm, ...paginationIdeaListForm },
        })
      );
    }
  }, [ideaReadListStore.data]);

  useEffect(() => {
    resetPaginationIdeaListForm();
    resetFilterIdeaListForm();
    dispatch({ type: slice.idea.ideaReadListStore.constant.reset });
  }, []);

  useEffect(() => {
    dispatch({ type: slice.idea.ideaReadListStore.constant.reset });
  }, [paginationIdeaListForm.page]);

  useEffect(() => {
    setPaginationIdeaListForm({ ...paginationIdeaListForm, page: 1 });
    dispatch({ type: slice.idea.ideaReadListStore.constant.reset });
  }, [paginationIdeaListForm.limit]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  function FormIdeaListSubmit(event: FormEvent<HTMLFormElement>) {
    util.EventForm1(event, true, true, () => {
      setPaginationIdeaListForm({ ...paginationIdeaListForm, page: 1 });
      dispatch({ type: slice.idea.ideaReadListStore.constant.reset });
    });
  }

  function FormIdeaListReset(event: FormEvent<HTMLFormElement>) {
    util.EventForm1(event, false, true, () => {
      resetPaginationIdeaListForm();
      resetFilterIdeaListForm();
      dispatch({ type: slice.idea.ideaReadListStore.constant.reset });
    });
  }

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
                FormIdeaListSubmit(event);
              }}
              onReset={(event) => {
                FormIdeaListReset(event);
              }}
            >
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Сортировка по:
                    <div className="input-group">
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filterIdeaListForm.sort}
                        onChange={(e) =>
                          setFilterIdeaListForm({
                            ...filterIdeaListForm,
                            sort: e.target.value,
                          })
                        }
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
                    </div>
                  </label>
                  <label className="form-control-sm form-switch text-center m-0 p-1">
                    Сводка только за последний месяц:
                    <input
                      type="checkbox"
                      className="form-check-input m-0 p-1"
                      id="flexSwitchCheckDefault"
                      checked={filterIdeaListForm.onlyMonth}
                      onChange={() =>
                        setFilterIdeaListForm({
                          ...filterIdeaListForm,
                          onlyMonth: !filterIdeaListForm.onlyMonth,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="card-body m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-primary m-1 p-2"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      обновить
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                    >
                      <i className="fa-solid fa-pen-nib m-0 p-1" />
                      сбросить
                    </button>
                  </ul>
                </div>
                <div className="card-footer text-end m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Количество идей на странице:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={paginationIdeaListForm.limit}
                      onChange={(event) =>
                        setPaginationIdeaListForm({
                          ...paginationIdeaListForm,
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
                      checked={paginationIdeaListForm.detailView}
                      onChange={() =>
                        setPaginationIdeaListForm({
                          ...paginationIdeaListForm,
                          detailView: !paginationIdeaListForm.detailView,
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
      {!ideaReadListStore.load && ideaReadListStore.data && (
        <paginator.Pagination1
          totalObjects={ideaReadListStore.data["x-total-count"]}
          limit={paginationIdeaListForm.limit}
          page={paginationIdeaListForm.page}
          // @ts-ignore
          changePage={(page) =>
            setPaginationIdeaListForm({
              ...paginationIdeaListForm,
              page: page,
            })
          }
        />
      )}
      {!ideaReadListStore.load && ideaReadListStore.data ? (
        ideaReadListStore.data.list.length > 0 ? (
          <div className={"m-0 p-0"}>
            {" "}
            {paginationIdeaListForm.detailView ? (
              <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
                {ideaReadListStore.data.list.map(
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
                              to={`/idea/public/${idea.id}`}
                              className="text-decoration-none text-dark m-0 p-0"
                            >
                              <h6 className="lead fw-bold m-0 p-0">
                                {util.GetSliceString(idea["name"], 50)}
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
                                    {idea["subdivision"]}
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
                                    {idea["sphere"]}
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
                                    {idea["category"]}
                                  </option>
                                </select>
                              </label>
                            </div>
                            <div className="m-0 p-0">
                              <img
                                src={
                                  idea["image"]
                                    ? util.GetStaticFile(idea["image"])
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
                                    idea["place"],
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
                                    idea["description"],
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
                                {idea["author"]["last_name"] &&
                                  idea["author"]["last_name"]}{" "}
                                {idea["author"]["first_name"]}{" "}
                                {idea["author"]["position"]}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between m-1 p-0">
                              <label className="text-muted border m-0 p-2">
                                подано:{" "}
                                <p className="m-0">
                                  {util.GetCleanDateTime(idea["created"], true)}
                                </p>
                              </label>
                              <label className="text-muted border m-1 p-2">
                                зарегистрировано:{" "}
                                <p className="m-0 p-0">
                                  {util.GetCleanDateTime(idea["updated"], true)}
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
                              to={`/idea/public/${idea.id}`}
                              className="btn btn-sm btn-primary w-100 m-0 p-2"
                            >
                              подробнее
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
                {ideaReadListStore.data.list.map(
                  // @ts-ignore
                  (idea, index) => (
                    <Link
                      key={index}
                      to={`/idea/public/${idea.id}`}
                      className="text-decoration-none m-0 p-0"
                    >
                      <li className="border list-group-item-action text-start small m-0 p-1">
                        {util.GetSliceString(idea["name"], 50)}
                        {util.GetCleanDateTime(" | " + idea["updated"], true)}
                        {util.GetSliceString(
                          " | " + idea["author"]["last_name"],
                          20
                        )}
                        {util.GetSliceString(
                          " " + idea["author"]["first_name"],
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
      <component.StatusStore1
        slice={slice.idea.ideaReadListStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      {!ideaReadListStore.load && ideaReadListStore.data && (
        <paginator.Pagination1
          totalObjects={ideaReadListStore.data["x-total-count"]}
          limit={paginationIdeaListForm.limit}
          page={paginationIdeaListForm.page}
          // @ts-ignore
          changePage={(page) =>
            setPaginationIdeaListForm({
              ...paginationIdeaListForm,
              page: page,
            })
          }
        />
      )}
    </base.Base1>
  );
}
