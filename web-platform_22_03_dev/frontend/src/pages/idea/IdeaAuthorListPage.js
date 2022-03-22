///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const IdeaAuthorListPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [firstRefresh, firstRefreshSet] = useState(true);
  const [detailView, detailViewSet] = useState(true);
  const [onlyMonth, onlyMonthSet] = useState(true);
  const [sort, sortSet] = useState("количеству (наибольшие в начале)");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const ideaAuthorListStore = useSelector((state) => state.ideaAuthorListStore);
  const {
    load: loadIdeaAuthorList,
    data: dataIdeaAuthorList,
    // error: errorIdeaAuthorList,
    // fail: failIdeaAuthorList,
  } = ideaAuthorListStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO reset state
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.IDEA_AUTHOR_LIST_RESET_CONSTANT });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
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
  }, [dataIdeaAuthorList, dispatch, firstRefresh]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    resetState();
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
        <div className="accordion accordion-flush shadow m-0 p-0 mb-2">
          <div className="accordion-item custom-background-transparent-low m-0 p-0">
            <h2 className="accordion-header m-0 p-0" id="headingOne">
              <button
                className="accordion-button bg-success bg-opacity-10 m-0 p-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
                onClick={(e) => utils.ChangeAccordionCollapse(["collapseOne"])}
              >
                <h4 className="lead fw-bold text-success m-0 p-0">
                  Фильтрация, поиск и сортировка{" "}
                  <small className="text-muted m-0 p-0">
                    (нажмите сюда, для переключения)
                  </small>
                </h4>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
                <form className="m-0 p-0" onSubmit={handlerSubmit}>
                  <div className="card shadow custom-background-transparent-hard m-0 p-0">
                    <div className="card-header m-0 p-0">
                      <label className="lead m-0 p-1">
                        Выберите нужные настройки фильтрации и сортировки, затем
                        нажмите кнопку{" "}
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
                              обновить рейтинги
                            </button>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </ul>
            </div>
          </div>
        </div>
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
              {dataIdeaAuthorList.map((object, index) => (
                <Link
                  key={index}
                  to={`/idea_detail/${object.id}`}
                  className="text-decoration-none m-0 p-0"
                >
                  <li className="border list-group-item-action small m-0 p-1">
                    {utils.GetSliceString(object["username"], 20)}
                    {" | количество идей: "}
                    {utils.GetSliceString(object["idea_count"], 20)}
                    {" | общий рейтинг: "}
                    {utils.GetSliceString(object["idea_rating"], 20)}
                    {" | количество отметок: "}
                    {utils.GetSliceString(object["idea_rating_count"], 20)}
                    {" | количество комментариев: "}
                    {utils.GetSliceString(object["idea_comment_count"], 20)}
                  </li>
                </Link>
              ))}
            </div>
          ) : (
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
              {dataIdeaAuthorList.map((object, index) => (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3 m-0 p-1">
                  <Link
                    to={`#`}
                    className="text-decoration-none text-dark m-0 p-0"
                  >
                    <div className="card shadow custom-background-transparent-low m-0 p-0">
                      <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                        <h6 className="lead fw-bold m-0 p-0">
                          {object["username"]}
                        </h6>
                      </div>
                      <div className="card-body m-0 p-0">
                        <table className="table table-sm table-hover table-borderless table-striped m-0 p-0">
                          <tbody>
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Количество идей:
                              </td>
                              <td className="small text-end">
                                {object["idea_count"]}
                              </td>
                            </tr>
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Общий рейтинг:
                              </td>
                              <td className="small text-end">
                                {object["idea_rating"]}
                              </td>
                            </tr>
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Количество отметок:
                              </td>
                              <td className="small text-end">
                                {object["idea_rating_count"]}
                              </td>
                            </tr>
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Количество комментариев:
                              </td>
                              <td className="small text-end">
                                {object["idea_comment_count"]}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </ul>
          ))}
      </main>
      <components.FooterComponent />
    </body>
  );
};