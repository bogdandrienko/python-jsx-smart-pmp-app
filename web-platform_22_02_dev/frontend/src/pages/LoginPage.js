import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";

import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
import FormContainerComponent from "../components/FormContainerComponent";
import { userLoginAction } from "../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [capcha, setCapcha] = useState("");
  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: errorvar,
    loading: loadingvar,
    userInfo: userInfovar,
  } = userLogin;
  console.log("loadingvar: ", loadingvar);
  console.log("userInfovar: ", userInfovar);
  console.log("errorvar: ", errorvar);

  useEffect(() => {
    if (userInfovar) {
      sleep(1000).then(() => {
        navigate("/news");
      });
    }
  }, [navigate, userInfovar]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (capcha !== "") {
      dispatch(userLoginAction(username, password));
    } else {
      setError('Введите капчу!')
      sleep(3000).then(() => {
        setError('')
      });
    }
  };

  const changeVisibility = () => {
    const password = document.getElementById("password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  function changeCapcha(value) {
    setCapcha(value);
  }

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Вход в систему"}
        second={"страница для входа в систему."}
        logic={true}
      />
      <main className="container text-center">
        <div>
          {userInfovar && (
            <MessageComponent variant="success">Вы успешно вошли!</MessageComponent>
          )}
          {error && (
            <MessageComponent variant="danger">Пройдите проверку на робота!</MessageComponent>
          )}
          {errorvar && (
            <MessageComponent variant="danger">{errorvar}</MessageComponent>
          )}
          {loadingvar && <LoaderComponent />}
        </div>

        <form 
              method="POST"
              target="_self"
              enctype="multipart/form-data"
              name="account_login"
              autocomplete="on"
              class="text-center p-1 m-1"
              onSubmit={submitHandler}
        >
            <div>
                <label class="form-control-lg m-1">
                    Введите Ваш идентификатор пользователя:
                    <input type="text"
                          id="username"
                          name="username"
                          required=""
                          placeholder=""
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          minlength="12"
                          maxlength="12"
                          class="form-control form-control-lg"
                    />
                    <small class="text-muted">ИИН: 12 цифр</small>
                </label>
                <label class="form-control-lg m-1">
                    Введите пароль для входа в аккаунт:
                    <input type="password"
                          id="password"
                          name="password"
                          required=""
                          placeholder=""
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          minlength="8"
                          maxlength="32"
                          class="form-control form-control-lg"
                    />
                    <small class="text-muted">пароль: от 8 до 32 символов</small>
                </label>
                <label class="form-control-lg m-1">
                      <small className="lead text-danger">Докажите, что Вы не робот!</small>
                      <ReCAPTCHA
                        sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                        onChange={changeCapcha}
                      />
                </label>
            </div>
            <hr/>
            <div class="container text-center">
                <ul class="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                    <div class="m-1">
                        <button href=""
                                type="submit"
                                class="btn btn-lg btn-outline-primary form-control"
                        >Войти в систему</button>
                    </div>
                    <div class="m-1">
                        <button href=""
                                type="reset"
                                onClick={(e) => {setPassword(''); setUsername('');}}
                                class="btn btn-lg btn-outline-warning form-control"
                        >Сбросить данные</button>
                    </div>
                    <div class="m-1">
                        <button href=""
                                type="button"
                                onClick={changeVisibility}
                                class="btn btn-lg btn-outline-danger form-control"
                        >Видимость пароля</button>
                    </div>
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-outline-success form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                </ul>
            </div>
            <hr/>
            <br/>
            <br/>
            <div class="container text-center">
                <ul class="container-fluid btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-outline-light form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-outline-dark form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-outline-secondary form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                    <div class="m-1">
                        <button href=""
                                type="submit"
                                class="btn btn-lg btn-primary form-control"
                        >Подтвердить</button>
                    </div>
                    <div class="m-1">
                        <button href=""
                                type="reset"
                                onClick={(e) => {setPassword(''); setUsername('');}}
                                class="btn btn-lg btn-warning form-control"
                        >Сбросить</button>
                    </div>
                    <div class="m-1">
                        <button href=""
                                type="button"
                                onClick={changeVisibility}
                                class="btn btn-lg btn-danger form-control"
                        >Видимость пароля</button>
                    </div>
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-success form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-light form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-dark form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                    <div class="m-1">
                        <a href="/recover_password"
                                type="button"
                                class="btn btn-lg btn-secondary form-control"
                        >Восстановить доступ к аккаунту</a>
                    </div>
                </ul>
            </div>
        </form>


        <FormContainerComponent>
          {/* <Form onSubmit={submitHandler}>
            <div className="form-control">
              <small className="lead text-danger">Пройдите проверку!</small>
              <ReCAPTCHA
                sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                onChange={changeCapcha}
              />
            </div>

            <Form.Group controlId="email">
              <Form.Label>Имя пользователя:</Form.Label>
              <Form.Control
                type="text"
                placeholder="пример: 970801351179"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="12"
                maxLength="12"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Пароль от аккаунта:</Form.Label>
              <Form.Control
                type="password"
                placeholder="пример: 12345Qq$"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                controlid="password"
                minLength="8"
                maxLength="64"
              />
            </Form.Group>

            <div className="btn-group">
              <Button type="submit" variant="outline-primary" className="m-1">
                Войти
              </Button>

              <Button
                onClick={changeVisibility}
                type="button"
                variant="outline-warning"
                className="m-1"
              >
                видимость пароля
              </Button>

              <Button type="button" variant="outline-danger" className="m-1">
                <LinkContainer to="/recover_password">
                  <Nav.Link className="text-danger">
                    восстановить пароль
                  </Nav.Link>
                </LinkContainer>
              </Button>
            </div>
          </Form> */}
        </FormContainerComponent>
      </main>
      <FooterComponent />
    </div>
  );
}

export default LoginScreen;
