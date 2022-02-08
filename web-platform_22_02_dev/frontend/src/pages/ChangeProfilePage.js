import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import {
  userChangeProfileAction,
  userDetailsAction,
  userLogoutAction,
} from "../actions/userActions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import FormContainerComponent from "../components/FormContainerComponent";

const ChangeProfilePage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("userInfo: ", userInfo);

  const userChange = useSelector((state) => state.userChange);
  const {
    userChangeLoadingReducer,
    userChangeDataReducer,
    userChangeErrorReducer,
  } = userChange;
  console.log("userChangeLoadingReducer: ", userChangeLoadingReducer);
  console.log("userChangeDataReducer: ", userChangeDataReducer);
  console.log("userChangeErrorReducer: ", userChangeErrorReducer);

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  console.log("loading: ", loading);
  console.log("user: ", user);
  console.log("error: ", error);

  useEffect(() => {
    if (user && loading === false) {
      if (user["user_model"]) {
        if (user["user_model"]["email_field"]) {
          setEmail(user["user_model"]["email_field"]);
        }
        if (user["user_model"]["secret_question_char_field"]) {
          setSecretQuestion(user["user_model"]["secret_question_char_field"]);
        }
        if (user["user_model"]["secret_answer_char_field"]) {
          setSecretAnswer(user["user_model"]["secret_answer_char_field"]);
        }
        if (user["user_model"]["password_slug_field"]) {
          setPassword("");
          setPassword2("");
        }
      }
    } else {
      dispatch(userDetailsAction());
      setPassword("");
      setPassword2("");
    }
  }, [dispatch, loading, user]);

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);

  const submitHandler = (e) => {
    // e.preventDefault();
    dispatch(
      userChangeProfileAction({
        email: email,
        secretQuestion: secretQuestion,
        secretAnswer: secretAnswer,
        password: password,
        password2: password2,
      })
    );
    dispatch(userDetailsAction());
    dispatch(userLogoutAction());
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
        first={"Изменение профиля"}
        second={"страница редактирования Вашего личного профиля."}
      />
      <main className="container text-center">
        <div className="m-1">
          <div>
            <h2 className="text-danger display-6 lead">
              Внимание, все эти поля необходимо заполнить!
            </h2>
            <h5>
              Идентификатор пользователя: '{userInfo ? (userInfo.username) : ('')}'
            </h5>
          </div>
          <FormContainerComponent>
            {userChangeErrorReducer && (
              <MessageComponent variant="danger">
                {userChangeErrorReducer}
              </MessageComponent>
            )}
            {userChangeLoadingReducer && <LoaderComponent />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Почта для восстановления доступа:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="пример: bogdandrienko@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="none"
                  aria-autocomplete="none"
                  minLength="1"
                  maxLength="64"
                />
              </Form.Group>

              <Form.Group controlId="secret_question_char_field">
                <Form.Label>
                  Секретный вопрос для восстановления пароля:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="пример: 2+2?"
                  value={secretQuestion}
                  onChange={(e) => setSecretQuestion(e.target.value)}
                  autoComplete="none"
                  aria-autocomplete="none"
                  minLength="4"
                  maxLength="32"
                />
              </Form.Group>

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

export default ChangeProfilePage;
