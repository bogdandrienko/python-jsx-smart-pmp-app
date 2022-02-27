import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { rationalCreateAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import FooterComponent from "../components/FooterComponent";
import { RATIONAL_CREATE_RESET_CONSTANT } from "../js/constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BankIdeaListPage = () => {
  const dispatch = useDispatch();

  const [subdivision, setSubdivision] = useState("");
  const [sphere, setSphere] = useState("");
  const [category, setCategory] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [additionalWord, setAdditionalWord] = useState("");
  const [additionalPdf, setAdditionalPdf] = useState("");
  const [additionalExcel, setAdditionalExcel] = useState(null);
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState("");
  const [user4, setUser4] = useState("");
  const [user5, setUser5] = useState("");

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  useEffect(() => {
    if (dataUserDetails) {
      if (dataUserDetails["user_model"] && user1 === "") {
        setUser1(
          `${dataUserDetails["user_model"]["last_name_char_field"]} ${dataUserDetails["user_model"]["first_name_char_field"]} ${dataUserDetails["user_model"]["patronymic_char_field"]} ${dataUserDetails["user_model"]["personnel_number_slug_field"]} 100%`
        );
      }
    } else {
    }
  }, [dispatch, dataUserDetails]);

  const rationalCreateStore = useSelector((state) => state.rationalCreateStore);
  const {
    load: loadRationalCreate,
    data: dataRationalCreate,
    error: errorRationalCreate,
    fail: failRationalCreate,
  } = rationalCreateStore;
  console.log("dataRationalCreate", dataRationalCreate);

  useEffect(() => {
    if (dataRationalCreate) {
      sleep(5000).then(() => {
        dispatch({
          type: RATIONAL_CREATE_RESET_CONSTANT,
        });
      });
    }
  }, [dataRationalCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "RATIONAL_CREATE",
      subdivision: subdivision,
      sphere: sphere,
      category: category,
      avatar: avatar,
      name: name,
      place: place,
      shortDescription: shortDescription,
      description: description,
      additionalWord: additionalWord,
      additionalPdf: additionalPdf,
      additionalExcel: additionalExcel,
      user1: user1,
      user2: user2,
      user3: user3,
      user4: user4,
      user5: user5,
    };
    dispatch(rationalCreateAction(form));
  };

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Подача рац. предложения"}
        second={
          "страница содержит форму с полями для заполнения и подачи рац. предложения."
        }
      />
      <main className="container text-center">
        <div className="text-center">
          {loadRationalCreate && <LoaderComponent />}
          {dataRationalCreate && (
            <div className="m-1">
              <MessageComponent variant="success">
                {dataRationalCreate}
              </MessageComponent>
            </div>
          )}
          {errorRationalCreate && (
            <div className="m-1">
              <MessageComponent variant="danger">
                {errorRationalCreate}
              </MessageComponent>
            </div>
          )}
          {failRationalCreate && (
            <div className="m-1">
              <MessageComponent variant="warning">
                {failRationalCreate}
              </MessageComponent>
            </div>
          )}
        </div>
        {!dataRationalCreate && (
          <div className="container-fluid text-center">
            <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
              <div className="container">
                <br />
                <form
                  method="POST"
                  target="_self"
                  encType="multipart/form-data"
                  name="RATIONAL_CREATE"
                  autoComplete="on"
                  className="text-center"
                  onSubmit={submitHandler}
                >
                  <div>
                    <div className="">
                      <div>
                        <h6 className="lead fw-bold">ЗАЯВЛЕНИЕ</h6>
                        <h6 className="lead">
                          на рационализаторское предложение
                        </h6>
                      </div>
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <label className="form-control-sm m-1">
                          Наименование структурного подразделения:
                          <select
                            id="subdivision"
                            name="subdivision"
                            required
                            className="form-control form-control-sm"
                            value={subdivision}
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
                            <option value="Энергоуправление">
                              Энергоуправление
                            </option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="w-100 form-control-sm m-1">
                          Зарегистрировано за №{" "}
                          <strong className="btn btn-light">XXX</strong> от
                          <small className="text-danger"> текущей </small>даты
                          <p>
                            <small className="text-success">
                              * номер будет создан автоматически
                            </small>
                          </p>
                        </label>
                      </div>
                      <div>
                        <label className="form-control-sm m-1">
                          Сфера рац. предложения:
                          <select
                            id="sphere"
                            name="sphere"
                            required
                            className="form-control form-control-sm"
                            value={sphere}
                            onChange={(e) => setSphere(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            <option value="Технологическая">
                              Технологическая
                            </option>
                            <option value="Не технологическая">
                              Не технологическая
                            </option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Категория:
                          <select
                            id="category"
                            name="category"
                            required
                            className="form-control form-control-sm"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            <option value="Инновации">Инновации</option>
                            <option value="Модернизация">Модернизация</option>
                            <option value="Улучшение">Улучшение</option>
                            <option value="Индустрия 4.0">Индустрия 4.0</option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Аватарка-заставка для идеи:
                          <input
                            type="file"
                            id="avatar_image_field"
                            name="avatar_image_field"
                            accept=".jpg, .png"
                            className="form-control form-control-sm"
                            onChange={(e) => setAvatar(e.target.files[0])}
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Название рац. предложения:
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            required
                            placeholder="Название"
                            value={name}
                            minLength="1"
                            maxLength="100"
                            className="form-control form-control-sm"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 100 символов
                            </small>
                          </p>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Предполагаемое место внедрения:
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            required
                            placeholder="Цех / участок / отдел / лаборатория и т.п."
                            value={place}
                            minLength="1"
                            maxLength="100"
                            className="form-control form-control-sm"
                            onChange={(e) => setPlace(e.target.value)}
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 100 символов
                            </small>
                          </p>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Краткое описание:
                          <textarea
                            id="short_description_char_field"
                            name="short_description_char_field"
                            required
                            placeholder="Краткое описание"
                            value={shortDescription}
                            minLength="1"
                            maxLength="200"
                            rows="2"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setShortDescription(e.target.value)
                            }
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 200 символов
                            </small>
                          </p>
                        </label>
                        <label className="w-100 form-control-sm m-1">
                          Полное описание:
                          <textarea
                            id="full_description_text_field"
                            name="full_description_text_field"
                            required
                            placeholder="Полное описание"
                            value={description}
                            minLength="1"
                            maxLength="5000"
                            rows="3"
                            className="form-control form-control-sm"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 5000 символов
                            </small>
                          </p>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="form-control-sm m-1">
                          Word файл-приложение:
                          <input
                            type="file"
                            id="addiction_file_field"
                            name="addiction_file_field"
                            accept=".docx, .doc"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setAdditionalWord(e.target.files[0])
                            }
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Pdf файл-приложение:
                          <input
                            type="file"
                            id="addiction_file_field"
                            name="addiction_file_field"
                            accept=".pdf"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setAdditionalPdf(e.target.files[0])
                            }
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Excel файл-приложение:
                          <input
                            type="file"
                            id="addiction_file_field"
                            name="addiction_file_field"
                            accept=".xlsx, .xls"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                              setAdditionalExcel(e.target.files[0])
                            }
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                      </div>
                      <br />
                      <div>
                        <p className="text-danger">
                          Я(мы) утверждаю(ем), что являюсь(ся) автором(и)
                          данного предложения. Мне(нам) также известно, что в
                          случае признания предложения коммерческой тайной
                          подразделения, я(мы) обязан не разглашать его
                          сущность.
                        </p>
                      </div>
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Участники:
                          <p>
                            <small className="text-danger">
                              внимание, вводить участников согласно нужного
                              формата:
                            </small>
                          </p>
                          <p>
                            <small className="fw-bold">
                              Фамилия Имя Отчество Табельный Вклад в проект %
                            </small>
                          </p>
                          {dataUserDetails && dataUserDetails["user_model"] && (
                            <div>
                              <input
                                type="text"
                                id="name_char_field"
                                name="name_char_field"
                                required
                                placeholder={`введите Ваш % вклада:`}
                                value={user1}
                                minLength="1"
                                maxLength="200"
                                className="form-control form-control-sm"
                                onChange={(e) => setUser1(e.target.value)}
                              />
                            </div>
                          )}
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 2, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={user2}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                            onChange={(e) => setUser2(e.target.value)}
                          />
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 3, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={user3}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                            onChange={(e) => setUser3(e.target.value)}
                          />
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 4, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={user4}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                            onChange={(e) => setUser4(e.target.value)}
                          />
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 5, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={user5}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                            onChange={(e) => setUser5(e.target.value)}
                          />
                          <small className="text-muted">
                            * общая сумма вклада всех участников не должна не
                            превышать 100%
                          </small>
                        </label>
                      </div>
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
                  </div>
                </form>
                <br />
              </div>
            </ul>
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default BankIdeaListPage;
