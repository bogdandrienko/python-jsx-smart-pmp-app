///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const RationalModerateDetailPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [moderate, moderateSet] = useState("");
  const [comment, commentSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const rationalDetailStore = useSelector((state) => state.rationalDetailStore);
  const {
    load: loadRationalDetail,
    data: dataRationalDetail,
    // error: errorRationalDetail,
    // fail: failRationalDetail,
  } = rationalDetailStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (
      dataRationalDetail &&
      dataRationalDetail.id !== undefined &&
      id !== dataRationalDetail.id
    ) {
      dispatch({ type: constants.RATIONAL_DETAIL_RESET_CONSTANT });
    }
  }, [dispatch, id]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataRationalDetail && !loadRationalDetail) {
      const form = {
        "Action-type": "RATIONAL_DETAIL",
        id: id,
      };
      dispatch(actions.rationalDetailAction(form));
    }
  }, [dispatch, id, dataRationalDetail, loadRationalDetail]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "RATIONAL_MODERATE",
      rationalId: id,
      moderate: moderate,
      comment: comment,
    };
    dispatch(actions.rationalCreateAction(form));
    navigate("/rational_moderate_list");
    dispatch({ type: constants.RATIONAL_LIST_RESET_CONSTANT });
    dispatch({ type: constants.RATIONAL_DETAIL_RESET_CONSTANT });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent
        logic={true}
        redirect={true}
        title={"Подробности рационализаторского предложения"}
        description={" подробности рационализаторского предложения"}
      />
      <main className="container  ">
        <div className="">
          <components.StoreStatusComponent
            storeStatus={rationalDetailStore}
            key={"rationalDetailStore"}
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
        </div>
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link
            to={"/rational_moderate_list"}
            className="btn btn-sm btn-primary"
          >
            {"<="} назад к списку
          </Link>
        </div>
        <div className="">
          {!dataRationalDetail || dataRationalDetail.length < 1 ? (
            ""
          ) : (
            <components.RationalComponent
              object={dataRationalDetail}
              shortView={false}
            />
          )}
        </div>
        <div className="container">
          <hr />
          <form autoComplete="on" className="" onSubmit={handlerSubmit}>
            <div className="bg-danger bg-opacity-10">
              <h4 className="lead fw-bold">Модерация</h4>
              <label className="form-control-sm text-center m-0 p-1">
                Заключение:
                <select
                  required
                  className="form-control form-control-sm text-center m-0 p-1"
                  value={moderate}
                  onChange={(e) => moderateSet(e.target.value)}
                >
                  <option value="">Не выбрано</option>
                  <option value="Принято">Принято</option>
                  <option value="Отклонено">Отклонено</option>
                </select>
                <small className="text-danger">* обязательно</small>
              </label>
              <label className="w-50 form-control-sm m-1">
                Комментарий к отклонению:
                <input
                  type="text"
                  value={comment}
                  placeholder="пример: дополнить описание"
                  minLength="0"
                  maxLength="256"
                  className="form-control form-control-sm text-center m-0 p-1"
                  onChange={(e) =>
                    commentSet(
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
                <small className="text-muted">* не обязательно</small>
              </label>
              <div className="container-fluid text-center">
                <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                  <li className="m-1">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      type="submit"
                    >
                      Отправить
                    </button>
                  </li>
                  <li className="m-1">
                    <button
                      className="btn btn-sm btn-outline-warning"
                      type="reset"
                    >
                      Сбросить все данные
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
      <components.FooterComponent />
    </body>
  );
};
