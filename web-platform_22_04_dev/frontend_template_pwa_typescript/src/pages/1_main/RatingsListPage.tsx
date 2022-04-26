// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";
import * as hook from "../../components/hook";
import * as action from "../../components/action";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RatingsListPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ratingsListStore = hook.useSelectorCustom1(constant.ratingsListStore);

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // const [detailView, detailViewSet] = useState(true);
  // const [onlyMonth, onlyMonthSet] = useState(true);
  // const [sort, sortSet] = useState("количеству (наибольшие в начале)");

  const [paginationIdea, setPaginationIdea] = useState({
    page: 1,
    limit: 9,
    detailView: true,
  });

  const [filter, setFilter, resetFilter] = hook.useStateCustom1({
    sort: "рейтингу (популярные в начале)",
    onlyMonth: true,
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!ratingsListStore.data) {
      dispatch(
        action.User.ReadTopList({
          form: { ...filter, ...paginationIdea },
        })
      );
    }
  }, [ratingsListStore.data]);

  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  const handlerSubmit = (event) => {
    try {
      event.preventDefault();
    } catch (error) {}

    dispatch({ type: constant.ratingsListStore.reset });
  };

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
                      defaultChecked={detailView}
                      onClick={() => detailViewSet(!detailView)}
                    />
                  </label>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-0">
                    <label className="form-control-sm form-switch text-center m-0 p-1">
                      Сводка только за последний месяц:
                      <input
                        type="checkbox"
                        className="form-check-input m-0 p-1"
                        id="flexSwitchCheckDefault"
                        defaultChecked={onlyMonth}
                        onClick={() => onlyMonthSet(!onlyMonth)}
                      />
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Сортировка по:
                      <div className="input-group">
                        <select
                          className="form-control form-control-sm text-center m-0 p-1"
                          value={sort}
                          onChange={(e) => sortSet(e.target.value)}
                        >
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
                        <button
                          className="btn btn-sm btn-primary m-0 p-2"
                          type="submit"
                        >
                          <i className="fa-solid fa-circle-check m-0 p-1" />
                          обновить рейтинги
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </ul>
        }
      </component.Accordion1>
      <component.StoreComponent1
        stateConstant={constant.ratingsListStore}
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
      {!ratingsListStore.load &&
        (!ratingsListStore.data || ratingsListStore.data.list.length < 1 ? (
          <div className="m-0 p-0 my-1">
            <component.MessageComponent variant={"danger"}>
              Ничего не найдено! Попробуйте изменить условия фильтрации и/или
              очистить строку поиска.
            </component.MessageComponent>
          </div>
        ) : !detailView ? (
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
                      author["user_model"]["last_name_char_field"] +
                        " " +
                        author["user_model"]["first_name_char_field"],
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
        ) : (
          <ul className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
            {ratingsListStore.data.list.map(
              // @ts-ignore
              (author, index) => (
                <div key={index} className="col-sm-6 col-md-4 col-lg-4 m-0 p-1">
                  <Link
                    to={`#`}
                    className="text-decoration-none text-dark m-0 p-0"
                  >
                    <div className="card shadow custom-background-transparent-low-middle m-0 p-0">
                      <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                        <h5 className="lead fw-bold m-0 p-0">
                          {util.GetSliceString(
                            author["user_model"]["last_name_char_field"] +
                              " " +
                              author["user_model"]["first_name_char_field"],
                            50
                          )}
                        </h5>
                        <h6 className="fw-bold m-0 p-0">
                          {util.GetSliceString(
                            author["user_model"]["position_char_field"],
                            70
                          )}
                        </h6>
                      </div>
                      <div className="card-header bg-dark bg-opacity-10 m-0 p-3">
                        <h6 className="lead fw-bold m-0 p-0">
                          <div className="m-0 p-0">
                            <img
                              src={
                                author["user_model"]["image_field"] !==
                                  "/media/default/account/default_avatar.jpg" &&
                                author["user_model"]["image_field"]
                                  ? util.GetStaticFile(
                                      author["user_model"]["image_field"]
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
                                <i
                                  className={
                                    0 > 0
                                      ? "fa-solid fa-list-ol text-success m-0 p-1"
                                      : "fa-solid fa-list-ol text-danger m-0 p-1"
                                  }
                                >
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
        ))}
    </base.Base1>
  );
};
