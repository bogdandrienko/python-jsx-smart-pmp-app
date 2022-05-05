// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as util from "../../components/util";
import * as slice from "../../components/slice";
import * as hook from "../../components/hook";

import * as base from "../../components/ui/base";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UsersRatingsListPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ratingsListStore = hook.useSelectorCustom2(
    slice.rating.ratingsListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    detailView: true,
  });

  const [filter, setFilter, resetFilter] = hook.useStateCustom1({
    sort: "отметкам рейтинга (наибольшие в начале)",
    onlyMonth: true,
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!ratingsListStore.data) {
      dispatch(
        slice.rating.ratingsListStore.action({
          form: { ...filter, ...pagination },
        })
      );
    }
  }, [ratingsListStore.data]);

  useEffect(() => {
    dispatch({
      type: slice.rating.ratingsListStore.constant.reset,
    });
  }, []);

  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////

  const ResetList = () => {
    dispatch({
      type: slice.rating.ratingsListStore.constant.reset,
    });
  };

  console.log("ratingsListStore: ", ratingsListStore);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <component.Accordion1
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
            <form
              className="m-0 p-0"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                ResetList();
              }}
            >
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <label className="form-control-sm form-switch text-center m-0 p-1">
                    Сводка только за последний месяц:
                    <input
                      type="checkbox"
                      className="form-check-input m-0 p-1"
                      id="flexSwitchCheckDefault"
                      defaultChecked={filter.onlyMonth}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          onlyMonth: !filter.onlyMonth,
                        })
                      }
                    />
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Сортировка по:
                    <div className="input-group">
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.sort}
                        onChange={(event) =>
                          setFilter({
                            ...filter,
                            sort: event.target.value,
                          })
                        }
                      >
                        <option value="отметкам рейтинга (наибольшие в начале)">
                          отметкам рейтинга (наибольшие в начале)
                        </option>
                        <option value="отметкам рейтинга (наибольшие в конце)">
                          отметкам рейтинга (наибольшие в конце)
                        </option>
                        <option value="количеству (наибольшие в начале)">
                          количеству (наибольшие в начале)
                        </option>
                        <option value="количеству (наибольшие в конце)">
                          количеству (наибольшие в конце)
                        </option>
                        <option value="рейтингу (популярные в начале)">
                          рейтингу (популярные в начале)
                        </option>
                        <option value="рейтингу (популярные в конце)">
                          рейтингу (популярные в конце)
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
                    Количество участников на странице:
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
                      defaultChecked={pagination.detailView}
                      onClick={() =>
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
      <component.StatusStore1
        slice={slice.rating.ratingsListStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      {!ratingsListStore.load && ratingsListStore.data ? (
        ratingsListStore.data.list.length > 0 ? (
          <div className={"m-0 p-0"}>
            {" "}
            {pagination.detailView ? (
              <ul className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
                {ratingsListStore.data.list.map(
                  // @ts-ignore
                  (author, index) => (
                    <div
                      key={index}
                      className="col-sm-6 col-md-4 col-lg-4 m-0 p-1"
                    >
                      <Link
                        to={`#`}
                        className="text-decoration-none text-dark m-0 p-0"
                      >
                        <div className="card shadow custom-background-transparent-low-middle m-0 p-0">
                          <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                            <h5 className="lead fw-bold m-0 p-0">
                              {util.GetSliceString(
                                author["user_model"]["last_name"] +
                                  " " +
                                  author["user_model"]["first_name"],
                                50
                              )}
                            </h5>
                            <h6 className="fw-bold m-0 p-0">
                              {util.GetSliceString(
                                author["user_model"]["position"],
                                70
                              )}
                            </h6>
                          </div>
                          <div className="card-header bg-dark bg-opacity-10 m-0 p-3">
                            <h6 className="lead fw-bold m-0 p-0">
                              <div className="m-0 p-0">
                                <img
                                  src={
                                    author["user_model"]["image"] !==
                                      "/media/default/account/default_avatar.jpg" &&
                                    author["user_model"]["image"]
                                      ? util.GetStaticFile(
                                          author["user_model"]["image"]
                                        )
                                      : util.GetStaticFile(
                                          "/media/default/top/default_user.png"
                                        )
                                  }
                                  className="img-fluid w-50 m-1 p-0"
                                  alt="изображение отсутствует"
                                />
                              </div>
                            </h6>
                          </div>
                          <div className="card-body m-0 p-0">
                            <table className="table table-sm table-hover table-borderless table-striped m-0 p-0">
                              <tbody>
                                <tr className="">
                                  <td className="fw-bold text-secondary text-start">
                                    "Общий балл" участника:
                                  </td>
                                  <td className="small text-end">
                                    <i className="fa-solid fa-circle-question text-muted m-0 p-1">
                                      {`  0`}
                                    </i>
                                  </td>
                                </tr>
                                <tr className="">
                                  <td className="fw-bold text-secondary text-start">
                                    Количество предложений:
                                  </td>
                                  <td className="small text-end">
                                    <i
                                      className={
                                        author["idea_count"] > 0
                                          ? "fa-solid fa-list text-success m-0 p-1"
                                          : "fa-solid fa-list text-danger m-0 p-1"
                                      }
                                    >
                                      {`  ${author["idea_count"]}`}
                                    </i>
                                  </td>
                                </tr>
                                <tr className="">
                                  <td className="fw-bold text-secondary text-start">
                                    Рейтинг всех предложений:
                                  </td>
                                  <td className="small text-end">
                                    <i
                                      className={
                                        author["idea_rating"] > 7
                                          ? "fas fa-star text-success m-0 p-0"
                                          : author["idea_rating"] > 4
                                          ? "fas fa-star custom-color-warning-1 m-0 p-0"
                                          : "fas fa-star text-danger m-0 p-0"
                                      }
                                    >
                                      {`  ${author["idea_rating"]}`}
                                    </i>
                                  </td>
                                </tr>
                                <tr className="">
                                  <td className="fw-bold text-secondary text-start">
                                    Количество всех отметок рейтинга:
                                  </td>
                                  <td className="small text-end">
                                    <i
                                      className={
                                        author["idea_rating_count"] > 0
                                          ? "far fa-star text-success m-0 p-1"
                                          : "far fa-star text-danger m-0 p-1"
                                      }
                                    >
                                      {`  ${author["idea_rating_count"]}`}
                                    </i>
                                  </td>
                                </tr>
                                <tr className="">
                                  <td className="fw-bold text-secondary text-start">
                                    Количество комментариев:
                                  </td>
                                  <td className="w-25 small text-end">
                                    <i
                                      className={
                                        author["idea_comment_count"] > 0
                                          ? "fa-solid fa-comment text-success m-0 p-1"
                                          : "fa-solid fa-comment text-danger m-0 p-1"
                                      }
                                    >
                                      {`  ${author["idea_comment_count"]}`}
                                    </i>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="card-footer bg-success bg-opacity-10 m-0 p-0">
                            <h6 className="lead text-end m-0 p-1">
                              {index + 1 === 1 ? (
                                <i className="fa-solid custom-color-warning-1 fa-trophy">
                                  золото
                                </i>
                              ) : index + 1 === 2 ? (
                                <i className="fa-solid text-primary fa-trophy">
                                  серебро
                                </i>
                              ) : index + 1 === 3 ? (
                                <i className="fa-solid fa-trophy">бронза</i>
                              ) : (
                                ""
                              )}
                              {` # ${index + 1}`}
                            </h6>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                )}
              </ul>
            ) : (
              <div className="card shadow m-0 p-0 my-1">
                {ratingsListStore.data.list.map(
                  // @ts-ignore
                  (author, index) => (
                    <Link
                      key={index}
                      to={`#`}
                      className="text-decoration-none m-0 p-0"
                    >
                      <li className="border list-group-item-action text-start small m-0 p-1">
                        {util.GetSliceString(
                          author["user_model"]["last_name"] +
                            " " +
                            author["user_model"]["first_name"],
                          50
                        )}
                        {" | количество идей: " +
                          util.GetSliceString(author["idea_count"], 20)}
                        {" | общий рейтинг: " +
                          util.GetSliceString(author["idea_rating"], 20)}
                        {" | количество отметок: " +
                          util.GetSliceString(author["idea_rating_count"], 20)}
                        {" | количество комментариев: " +
                          util.GetSliceString(author["idea_comment_count"], 20)}
                      </li>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          <message.Message.Secondary>
            Ничего не найдено! Попробуйте изменить условия фильтрации и/или
            очистить строку поиска.
          </message.Message.Secondary>
        )
      ) : (
        ""
      )}
    </base.Base1>
  );
};
