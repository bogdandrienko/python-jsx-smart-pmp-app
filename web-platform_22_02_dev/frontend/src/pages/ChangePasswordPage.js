import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import {
  changeUserProfileAction,
  userChangeAction,
  userLogoutAction,
} from "../actions/userActions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import FormContainerComponent from "../components/FormContainerComponent";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("userInfo: ", userInfo);

  const userChange = useSelector((state) => state.userChange);
  const {
    userChangeLoadingReducer,
    userChangeDataReducer,
    userChangeErrorReducer,
  } = userChange;
  // console.log("userChangeLoadingReducer: ", userChangeLoadingReducer);
  // console.log("userChangeDataReducer: ", userChangeDataReducer);
  // console.log("userChangeErrorReducer: ", userChangeErrorReducer);

  useEffect(() => {
    if (userChangeDataReducer) {
      if (userChangeDataReducer["email_field"]) {
        // setEmail(userChangeDataReducer["email_field"]);
        setSecretQuestion(userChangeDataReducer["secret_question_char_field"]);
        setSecretAnswer(userChangeDataReducer["secret_answer_char_field"]);
      }
    } else {
      dispatch(userChangeAction());
    }
  }, [dispatch, userChangeDataReducer]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      changeUserProfileAction({
        password: password,
        password2: password2,
      })
    );
    dispatch(userChangeAction());
    dispatch(userLogoutAction());
    navigate("/login");
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    password2.setAttribute("type", type);
  };

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Изменение пароля"}
        second={"страница редактирования Вашего пароля от аккаунта."}
      />
      <main className="container text-center">
        <div className="m-1">
          <h1>
            {userInfo
              ? `Идентификатор пользователя: '${userInfo.username}'`
              : "Идентификатор пользователя: ''"}
          </h1>
          <FormContainerComponent>
            {userChangeErrorReducer && (
              <MessageComponent variant="danger">
                {userChangeErrorReducer}
              </MessageComponent>
            )}
            {userChangeLoadingReducer && <LoaderComponent />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="secret_answer_char_field">
                <Form.Label>Ответ на секретный вопрос:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="пример: 4"
                  value={secretAnswer}
                  onChange={(e) => setSecretAnswer(e.target.value)}
                  autoComplete="none"
                  aria-autocomplete="none"
                  minLength="1"
                  maxLength="32"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Новый пароль от аккаунта:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="пример: 12345Qq$"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="none"
                  aria-autocomplete="none"
                  minLength="8"
                  maxLength="16"
                />
              </Form.Group>

              <Form.Group controlId="password2">
                <Form.Label>Повторите Пароль от аккаунта:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="пример: 12345Qq$"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="none"
                  aria-autocomplete="none"
                  minLength="8"
                  maxLength="16"
                />
              </Form.Group>

              <Form.Group controlId="button">
                <Button type="submit" variant="outline-primary" className="m-1">
                  Сохранить
                </Button>
                <Button
                  onClick={changeVisibility}
                  type="button"
                  variant="outline-warning"
                  className="m-1"
                >
                  видимость паролей
                </Button>
              </Form.Group>
            </Form>
          </FormContainerComponent>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ChangePasswordPage;
