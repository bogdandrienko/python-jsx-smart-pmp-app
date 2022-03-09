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
import RationalComponent from "../../components/RationalComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [preModerateAuthor, setPreModerateAuthor] = useState("");
  const [postModerateAuthor, setPostModerateAuthor] = useState("");

  const rationalDetailStore = useSelector((state) => state.rationalDetailStore); // store.js
  const {
    load: loadRationalDetail,
    data: dataRationalDetail,
    // error: errorRationalDetail,
    // fail: failRationalDetail,
  } = rationalDetailStore;

  useEffect(() => {
    if (
      dataRationalDetail &&
      dataRationalDetail.id !== undefined &&
      id !== dataRationalDetail.id
    ) {
      dispatch({ type: constants.RATIONAL_DETAIL_RESET_CONSTANT });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!dataRationalDetail && !loadRationalDetail) {
      const form = {
        "Action-type": "RATIONAL_DETAIL",
        id: id,
      };
      dispatch(actions.rationalDetailAuthAction(form));
    }
  }, [dispatch, id, dataRationalDetail, loadRationalDetail]);

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Подробности рац. предложения"}
        second={"страница содержит подробности последнего рац. предложения"}
      />
      <main className="container p-0">
        <div className="p-0 m-0">
          {StoreStatusComponent(
            rationalDetailStore,
            "rationalDetailStore",
            true,
            "Данные успешно получены!",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link to={"/rational_list"} className="btn btn-sm btn-primary">
            {"<="} назад к списку
          </Link>
        </div>
        <div className="">
          {!dataRationalDetail || dataRationalDetail.length < 1 ? (
            ""
          ) : (
            <RationalComponent
              rational={dataRationalDetail}
              shortView={false}
            />
          )}
        </div>
        <div className="container">
          <br />
          <hr />
          <br />
          <form
            action="#"
            method="POST"
            target="_self"
            encType="multipart/form-data"
            name="idea_create"
            autoComplete="on"
            className="text-center"
          >
            <div>
              <div className="bg-warning bg-opacity-10">
                <div>
                  <h4 className="lead fw-bold">Премодерация</h4>
                  <label className="w-50 form-control-sm m-1">
                    ФИО, должность:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="Ширшов А.А., зам. начальника по развитию ЭУ"
                      value={preModerateAuthor}
                      minLength="1"
                      maxLength="64"
                      className="form-control form-control-sm"
                    />
                    <small className="text-success">
                      * данные будут введены автоматически
                    </small>
                  </label>
                  <label className="w-25 form-control-sm m-1">
                    Заключение:
                    <select
                      id="category_slug_field"
                      name="category_slug_field"
                      required
                      className="form-control form-control-sm"
                    >
                      <option value="Приостановлено">Приостановлено</option>
                      <option value="Принято">Принято</option>
                      <option value="Отклонено">Отклонено</option>
                    </select>
                    <small className="text-muted">
                      обязательно выбрать одну из категорий
                    </small>
                  </label>
                  <label className="w-75 form-control-sm m-1">
                    Комментарий к заключению:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="пример: дополнить описание"
                      minLength="0"
                      maxLength="256"
                      className="form-control form-control-sm"
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                </div>
                <div className="container-fluid text-center">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        type="submit"
                      >
                        Подтвердить
                      </button>
                    </li>
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        type="reset"
                      >
                        Сбросить
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
          <br />
          <hr />
          <br />
          <form
            action="#"
            method="POST"
            target="_self"
            encType="multipart/form-data"
            name="idea_create"
            autoComplete="on"
            className="text-center"
          >
            <div>
              <div className="bg-danger bg-opacity-10">
                <div>
                  <h4 className="lead fw-bold">Постмодерация</h4>
                  <label className="w-50 form-control-sm m-1">
                    ФИО, должность:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="Ширшов А.А., зам. начальника по развитию ЭУ"
                      value={postModerateAuthor}
                      minLength="1"
                      maxLength="64"
                      className="form-control form-control-sm"
                    />
                    <small className="text-success">
                      * данные будут введены автоматически
                    </small>
                  </label>
                  <label className="w-25 form-control-sm m-1">
                    Заключение:
                    <select
                      id="category_slug_field"
                      name="category_slug_field"
                      required
                      className="form-control form-control-sm"
                    >
                      <option value="Приостановлено">Приостановлено</option>
                      <option value="Принято">Принято</option>
                      <option value="Отклонено">Отклонено</option>
                    </select>
                    <small className="text-muted">
                      обязательно выбрать одну из категорий
                    </small>
                  </label>
                  <label className="w-75 form-control-sm m-1">
                    Комментарий к заключению:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="пример: дополнить описание"
                      minLength="0"
                      maxLength="256"
                      className="form-control form-control-sm"
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                </div>
                <div className="container-fluid text-center">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        type="submit"
                      >
                        Подтвердить
                      </button>
                    </li>
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        type="reset"
                      >
                        Сбросить
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
          <br />
          <hr />
          <br />
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalDetailPage;
