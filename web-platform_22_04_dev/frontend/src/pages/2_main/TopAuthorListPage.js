// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TopAuthorListPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [firstRefresh, firstRefreshSet] = useState(true);
  //////////////////////////////////////////////////////////
  const [detailView, detailViewSet] = useState(true);
  const [onlyMonth, onlyMonthSet] = useState(true);
  const [sort, sortSet] = useState("количеству (наибольшие в начале)");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const ideaAuthorListStore = useSelector((state) => state.ideaAuthorListStore);
  const {
    load: loadIdeaAuthorList,
    data: dataIdeaAuthorList,
    // error: errorIdeaAuthorList,
    // fail: failIdeaAuthorList,
  } = ideaAuthorListStore;
  // TODO reset state //////////////////////////////////////////////////////////////////////////////////////////////////
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.IDEA_AUTHOR_LIST_RESET_CONSTANT });
  };
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataIdeaAuthorList) {
      const form = {
        "Action-type": "IDEA_AUTHOR_LIST",
        onlyMonth: onlyMonth,
        sort: sort,
      };
      dispatch(actions.ideaAuthorListAction(form));
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      }
    }
  }, [dataIdeaAuthorList, firstRefresh]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    resetState();
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.AccordionComponent
          key_target={"accordion1"}
          isCollapse={true}
          title={
            <span>
              <i className="fa-solid fa-filter" /> Фильтрация, поиск и
              сортировка:
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
                        onClick={(e) => detailViewSet(!detailView)}
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
                          onClick={(e) => onlyMonthSet(!onlyMonth)}
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
        </components.AccordionComponent>
        <components.StoreStatusComponent
          storeStatus={ideaAuthorListStore}
          keyStatus={"ideaAuthorListStore"}
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
        {!loadIdeaAuthorList &&
          (!dataIdeaAuthorList || dataIdeaAuthorList.length < 1 ? (
            <div className="m-0 p-0 my-1">
              <components.MessageComponent variant={"danger"}>
                Ничего не найдено! Попробуйте изменить условия фильтрации и/или
                очистить строку поиска.
              </components.MessageComponent>
            </div>
          ) : !detailView ? (
            <div className="card shadow m-0 p-0 my-1">
              {dataIdeaAuthorList.map((author, index) => (
                <Link
                  key={index}
                  to={`#`}
                  className="text-decoration-none m-0 p-0"
                >
                  <li className="border list-group-item-action text-start small m-0 p-1">
                    {utils.GetSliceString(
                      author["user_model"]["last_name_char_field"] +
                        " " +
                        author["user_model"]["first_name_char_field"],
                      50
                    )}
                    {" | количество идей: " +
                      utils.GetSliceString(author["idea_count"], 20)}
                    {" | общий рейтинг: " +
                      utils.GetSliceString(author["idea_rating"], 20)}
                    {" | количество отметок: " +
                      utils.GetSliceString(author["idea_rating_count"], 20)}
                    {" | количество комментариев: " +
                      utils.GetSliceString(author["idea_comment_count"], 20)}
                  </li>
                </Link>
              ))}
            </div>
          ) : (
            <ul className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
              {dataIdeaAuthorList.map((author, index) => (
                <div key={index} className="col-sm-6 col-md-4 col-lg-4 m-0 p-1">
                  <Link
                    to={`#`}
                    className="text-decoration-none text-dark m-0 p-0"
                  >
                    <div className="card shadow custom-background-transparent-low-middle m-0 p-0">
                      <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                        <h5 className="lead fw-bold m-0 p-0">
                          {utils.GetSliceString(
                            author["user_model"]["last_name_char_field"] +
                              " " +
                              author["user_model"]["first_name_char_field"],
                            50
                          )}
                        </h5>
                        <h6 className="fw-bold m-0 p-0">
                          {utils.GetSliceString(
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
                                  ? utils.GetStaticFile(
                                      author["user_model"]["image_field"]
                                    )
                                  : utils.GetStaticFile(
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
              ))}
            </ul>
          ))}
      </main>
      <components.FooterComponent />
    </div>
  );
};
