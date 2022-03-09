import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import MessageComponent from "../../components/MessageComponent";
import LoaderComponent from "../../components/LoaderComponent";
import RationalComponent from "../../components/RationalComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const [detailView, setDetailView] = useState(true);
  const [subdivision, setSubdivision] = useState("");
  const [sphere, setSphere] = useState("");
  const [premoderate, setPremoderate] = useState("Приостановлено");
  const [postmoderate, setPostmoderate] = useState("Приостановлено");

  const rationalListStore = useSelector((state) => state.rationalListStore);
  const {
    // load: loadRationalList,
    data: dataRationalList,
    // error: errorRationalList,
    // fail: failRationalList,
  } = rationalListStore;

  useEffect(() => {
    if (!dataRationalList) {
      const form = {
        "Action-type": "RATIONAL_LIST",
        sphere: sphere,
        subdivision: subdivision,
        premoderate: premoderate,
        postmoderate: postmoderate,
      };
      dispatch(actions.rationalListAuthAction(form));
    }
  }, [dispatch, dataRationalList]);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "RATIONAL_LIST",
      sphere: sphere,
      subdivision: subdivision,
      premoderate: premoderate,
      postmoderate: postmoderate,
    };
    dispatch(actions.rationalListAuthAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Список рац. предложений"}
        second={
          "страница отправленных рац. предложений с возможностью фильтрации."
        }
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            rationalListStore,
            "rationalListStore",
            true,
            "Данные успешно получены!",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="p-0 m-0">
          <div className="p-0 m-0">
            <label className="lead">
              Выберите нужные настройки фильтрации и сортировки, затем нажмите
              кнопку <p className="fw-bold text-primary">"обновить"</p>
            </label>
            <label className="form-control-md form-switch m-1">
              Детальное отображение:
              <input
                type="checkbox"
                className="form-check-input m-1"
                id="flexSwitchCheckDefault"
                defaultChecked={detailView}
                onClick={(e) => setDetailView(!detailView)}
              />
            </label>
          </div>
          <label className="form-control-sm m-1">
            Сфера рац. предложения:
            <select
              className="form-control form-control-sm"
              value={sphere}
              required
              onChange={(e) => setSphere(e.target.value)}
            >
              <option value="">Не выбрано</option>
              <option value="Технологическая">Технологическая</option>
              <option value="Не технологическая">Не технологическая</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="form-control-sm m-1">
            Наименование структурного подразделения:
            <select
              className="form-control form-control-sm"
              value={subdivision}
              required
              onChange={(e) => setSubdivision(e.target.value)}
            >
              <option value="">Не выбрано</option>
              <option value="Управление">Управление</option>
              <option value="Обогатительный комплекс">
                Обогатительный комплекс
              </option>
              <option value="Горно-транспортный комплекс">
                Горно-транспортный комплекс
              </option>
              <option value="Автотранспортное предприятие">
                Автотранспортное предприятие
              </option>
              <option value="Энергоуправление">Энергоуправление</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="w-25 form-control-sm m-1">
            Заключение премодерации:
            <select
              className="form-control form-control-sm"
              value={premoderate}
              required
              onChange={(e) => setPremoderate(e.target.value)}
            >
              <option value="Приостановлено">Приостановлено</option>
              <option value="Принято">Принято</option>
              <option value="Отклонено">Отклонено</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="w-25 form-control-sm m-1">
            Заключение постмодерации:
            <select
              className="form-control form-control-sm"
              value={postmoderate}
              required
              onChange={(e) => setPostmoderate(e.target.value)}
            >
              <option value="Приостановлено">Приостановлено</option>
              <option value="Принято">Принято</option>
              <option value="Отклонено">Отклонено</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <label className="form-control-sm m-1">
            <button
              className="btn btn-sm btn-primary"
              onClick={formHandlerSubmit}
            >
              Обновить
            </button>
          </label>
          {!dataRationalList || dataRationalList.length < 1 ? (
            <MessageComponent variant={"danger"}>
              Рац. предложения не найдены! Попробуйте изменить условия
              фильтрации или очистить строку поиска.
            </MessageComponent>
          ) : !detailView ? (
            <ul className="bg-opacity-10 bg-primary shadow">
              {dataRationalList.map((rational, index) => (
                <Link
                  key={index}
                  to={`/rational_detail/${rational.id}`}
                  className="text-decoration-none"
                >
                  <li className="lead border list-group-item-action">
                    {utils.GetSliceString(rational["name_char_field"], 30)}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="row justify-content-center p-0 m-0">
              {dataRationalList.map((rational, index) => (
                <Link
                  to={`/rational_detail/${rational.id}`}
                  className="text-decoration-none text-center p-2 m-0 col-md-6"
                >
                  <RationalComponent
                    key={index}
                    rational={rational}
                    shortView={true}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalListPage;
