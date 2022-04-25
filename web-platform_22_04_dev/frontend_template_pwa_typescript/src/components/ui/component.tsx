// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav, Spinner, Alert } from "react-bootstrap";
// @ts-ignore
import { LinkContainer } from "react-router-bootstrap";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as button from "./button";
import * as input from "./input";
import * as select from "./select";
import * as message from "./message";
import * as hook from "../hook";
import * as constant from "../constant";
import * as router from "../router";
import * as util from "../util";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const PostItem = (props) => {
  const navigate = useNavigate();

  // @ts-ignore
  const deletePost = (e) => {
    e.stopPropagation();

    props.remove(props.post);
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="post" onClick={() => navigate("/posts/" + props.post.id)}>
      <div className="post__content">
        <h5>{props.post.name}</h5>
        <strong>{props.post.place}</strong>
        <div>{props.post.body}</div>
        <div>{props.post.sphere}</div>
        <div className="post__btns">
          <button.Button1 onClick={deletePost}>delete</button.Button1>
        </div>
      </div>
    </div>
  );
};

// @ts-ignore
export const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Post not found!</h1>;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup className="post-list">
        {posts.map(
          // @ts-ignore
          (post, index) => (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <PostItem remove={remove} number={index + 1} post={post} />
            </CSSTransition>
          )
        )}
      </TransitionGroup>
    </div>
  );
};

// @ts-ignore
export const PostForm = ({ create }) => {
  const [post, setPost] = useState({
    name: "",
    place: "",
    sphere: "",
  });

  // @ts-ignore
  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({
      name: "",
      place: "",
      sphere: "",
    });
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <form>
      <h5>Create post</h5>
      <input.Input1
        // @ts-ignore
        value={post.name}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, name: e.target.value })}
        type="text"
        placeholder="Title..."
      />
      <input.Input1
        // @ts-ignore
        value={post.place}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, place: e.target.value })}
        type="text"
        placeholder="Body..."
      />
      <input.Input1
        // @ts-ignore
        value={post.sphere}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, sphere: e.target.value })}
        type="text"
        placeholder="Body..."
      />
      <button.Button1 onClick={addNewPost}>create</button.Button1>
    </form>
  );
};

// @ts-ignore
export const PostFilter = ({ filter, setFilter }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <input.Input1
        // @ts-ignore
        value={filter.query}
        // @ts-ignore
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
      <select.Select2
        value={filter.sort}
        // @ts-ignore
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue={"sort By"}
        options={[
          { value: "title", name: "by Name" },
          { value: "body", name: "by Description" },
        ]}
      />
    </div>
  );
};

export const TestComponent1 = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [count, countSet] = useState(0);
  const [value, valueSet] = useState(1);
  function plus() {
    countSet(count + value);
  }
  function minus() {
    countSet(count - value);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card text-center m-0 p-0">
      <div className="card-header text-center m-0 p-0">
        <h6 className="lead fw-bold text-center m-0 p-0">{count}</h6>
      </div>
      <div className="card-body text-center m-0 p-0">
        <div className="d-flex justify-content-between text-center m-0 p-0">
          <button
            onClick={plus}
            className="btn btn-lg w-25 btn-outline-success m-1 p-1"
          >
            +
          </button>
          <input
            type="number"
            className="form-control form-control-sm text-center m-1 p-1"
            value={value}
            required
            placeholder="пример: 70%"
            min="-100"
            max="100"
            onChange={(e) => valueSet(parseInt(e.target.value))}
          />
          <button
            onClick={minus}
            className="btn btn-lg w-25 btn-outline-danger m-1 p-1"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export class TestComponent2 extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      value: 1,
    };
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  plus() {
    this.setState({
      // @ts-ignore
      count: this.state.count + this.state.value,
    });
  }
  minus() {
    this.setState({
      // @ts-ignore
      count: this.state.count - this.state.value,
    });
  }
  // @ts-ignore
  setValue(value) {
    this.setState({
      value: value,
    });
  }
  render() {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div className="card text-center m-0 p-0">
        <div className="card-header text-center m-0 p-0">
          <h6 className="lead fw-bold text-center m-0 p-0">
            {
              // @ts-ignore
              this.state.count
            }
          </h6>
        </div>
        <div className="card-body text-center m-0 p-0">
          <div className="d-flex justify-content-between text-center m-0 p-0">
            <button
              onClick={this.plus}
              className="btn btn-lg w-25 btn-outline-success m-1 p-1"
            >
              +
            </button>
            <input
              type="number"
              className="form-control form-control-sm text-center m-1 p-1"
              value={
                // @ts-ignore
                this.state.value
              }
              required
              placeholder="пример: 70%"
              min="-100"
              max="100"
              onChange={(e) => this.setValue(parseInt(e.target.value))}
            />
            <button
              onClick={this.minus}
              className="btn btn-lg w-25 btn-outline-danger m-1 p-1"
            >
              -
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const TestComponent3 = function () {
  const [count, countSet] = useState(0);
  const [value, valueSet] = useState("");

  function increment() {
    countSet(count + 1);
  }
  function decrement() {
    countSet(count - 1);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h1>{count}</h1>
      <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange={(event) => valueSet(event.target.value)}
      />
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export class TestComponent4 extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      value: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    // @ts-ignore
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    // @ts-ignore
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div>
        <h1>
          {
            // @ts-ignore
            this.state.count
          }
        </h1>
        <h1>
          {
            // @ts-ignore
            this.state.value
          }
        </h1>
        <input
          type="text"
          value={
            // @ts-ignore
            this.state.value
          }
          onChange={(event) => this.setState({ value: event.target.value })}
        />
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
      </div>
    );
  }
}

export const StoreStatusComponent = ({
  // @ts-ignore
  storeStatus,
  keyStatus = "StoreStatus",
  consoleLog = false,
  showLoad = true,
  loadText = "",
  showData = true,
  dataText = "",
  showError = true,
  errorText = "",
  showFail = true,
  failText = "",
}) => {
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
  const {
    load: loadStatus,
    data: dataStatus,
    error: errorStatus,
    fail: failStatus,
  } = storeStatus;
  if (consoleLog) {
    console.log(`${keyStatus}`, storeStatus);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div key={keyStatus} className="m-0 p-0">
      {showLoad && loadStatus && (
        <div className="row justify-content-center m-0 p-0">
          {loadText !== "" ? (
            <Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </Alert>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{
                height: "50px",
                width: "50px",
                margin: "auto",
                display: "block",
              }}
              className="text-center m-0 p-0"
            >
              <small className="m-0 p-0">ждите</small>
              <span className="sr-only m-0 p-0" />
            </Spinner>
          )}
        </div>
      )}
      {showData && dataStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"success"} className="text-center m-0 p-1">
            {dataText !== "" ? dataText : dataStatus}
          </Alert>
        </div>
      )}
      {showError && errorStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText !== "" ? errorText : errorStatus}
          </Alert>
        </div>
      )}
      {showFail && failStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"warning"} className="text-center m-0 p-1">
            {failText !== "" ? failText : failStatus}
          </Alert>
        </div>
      )}
    </div>
  );
};

export const StoreComponent = ({
  // @ts-ignore
  storeStatus: storeStore,
  consoleLog = false,
  showLoad = true,
  loadText = "",
  showData = true,
  dataText = "",
  showError = true,
  errorText = "",
  showFail = true,
  failText = "",
}) => {
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
  const storeConstant = storeStore.data.split("_")[0];
  const {
    load: loadStore,
    data: dataStore,
    error: errorStore,
    fail: failStore,
    // @ts-ignore
  } = useSelector((state) => state[storeConstant]);
  if (consoleLog) {
    console.log(`${storeConstant}`, {
      load: loadStore,
      data: dataStore,
      error: errorStore,
      fail: failStore,
    });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div key={storeConstant} className="m-0 p-0">
      {showLoad && loadStore && (
        <div className="row justify-content-center m-0 p-0">
          {loadText ? (
            <Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </Alert>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{
                height: "40px",
                width: "40px",
                margin: "auto",
                display: "block",
              }}
              className="text-center m-0 p-0"
            >
              <span className="sr-only m-0 p-0" />
            </Spinner>
          )}
        </div>
      )}
      {showData && dataStore && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"success"} className="text-center m-0 p-1">
            {dataText
              ? dataText
              : typeof dataStore === "string"
              ? dataStore
              : "произошла ошибка"}
          </Alert>
        </div>
      )}
      {showError && errorStore && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText ? errorText : errorStore}
          </Alert>
        </div>
      )}
      {showFail && failStore && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"warning"} className="text-center m-0 p-1">
            {failText ? failText : failStore}
          </Alert>
        </div>
      )}
    </div>
  );
};

export const StoreComponent1 = ({
  // @ts-ignore
  stateConstant,
  consoleLog = false,
  showLoad = true,
  loadText = "",
  showData = true,
  dataText = "",
  showError = true,
  errorText = "",
  showFail = true,
  failText = "",
}) => {
  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const Constant = stateConstant.data.split("_")[0];
  // @ts-ignore
  const StoreConstant = useSelector((state) => state[Constant]);
  if (consoleLog) {
    console.log(`${Constant}`, StoreConstant);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div key={`${new Date().getMilliseconds()}`} className="m-0 p-0">
      {showLoad &&
        StoreConstant.load &&
        (loadText ? (
          <message.Message.Secondary>{loadText}</message.Message.Secondary>
        ) : (
          <div className="row justify-content-center m-0 p-0">
            <Spinner
              animation="border"
              role="status"
              style={{
                height: "40px",
                width: "40px",
                margin: "auto",
                display: "block",
              }}
              className="text-center m-0 p-0"
            >
              <span className="sr-only m-0 p-0" />
            </Spinner>
          </div>
        ))}
      {showData && StoreConstant.data && (
        <message.Message.Success>
          {dataText
            ? dataText
            : typeof StoreConstant.data === "string"
            ? StoreConstant.data
            : "произошла ошибка"}
        </message.Message.Success>
      )}
      {showError && StoreConstant.error && (
        <message.Message.Danger>
          {errorText ? errorText : StoreConstant.error}
        </message.Message.Danger>
      )}
      {showFail && StoreConstant.fail && (
        <message.Message.Warning>
          {failText ? failText : StoreConstant.fail}
        </message.Message.Warning>
      )}
    </div>
  );
};

export const StoreStatus1 = ({
  // @ts-ignore
  storeConstant,
  consoleLog = false,
  showLoad = true,
  loadText = "",
  showData = true,
  dataText = "",
  showError = true,
  errorText = "",
  showFail = true,
  failText = "",
}) => {
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
  const {
    load: loadStore,
    data: dataStore,
    error: errorStore,
    fail: failStore,
    // @ts-ignore
  } = storeConstant;
  if (consoleLog) {
    console.log(`${storeConstant}`, {
      load: loadStore,
      data: dataStore,
      error: errorStore,
      fail: failStore,
    });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div key={storeConstant} className="m-0 p-0">
      {showLoad && loadStore && (
        <div className="row justify-content-center m-0 p-0">
          {loadText ? (
            <Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </Alert>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{
                height: "40px",
                width: "40px",
                margin: "auto",
                display: "block",
              }}
              className="text-center m-0 p-0"
            >
              <span className="sr-only m-0 p-0" />
            </Spinner>
          )}
        </div>
      )}
      {showData && dataStore && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"success"} className="text-center m-0 p-1">
            {dataText
              ? dataText
              : typeof dataStore === "string"
              ? dataStore
              : "произошла ошибка"}
          </Alert>
        </div>
      )}
      {showError && errorStore && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText ? errorText : errorStore}
          </Alert>
        </div>
      )}
      {showFail && failStore && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"warning"} className="text-center m-0 p-1">
            {failText ? failText : failStore}
          </Alert>
        </div>
      )}
    </div>
  );
};
// @ts-ignore
export const MessageComponent = ({ variant, children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="row justify-content-center m-0 p-1">
      <Alert variant={variant} className="text-center m-0 p-1">
        {children}
      </Alert>
    </div>
  );
};

export const LoaderComponent = () => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "50px",
        width: "50px",
        margin: "auto",
        display: "block",
      }}
    >
      ЖДИТЕ<span className="sr-only">ЖДИТЕ</span>
    </Spinner>
  );
};

export const ModulesComponent = () => {
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////

  const NotificationReadListStore = hook.useSelectorCustom1(
    constant.NotificationReadListStore
  );
  const userDetailStore = hook.useSelectorCustom1(constant.userDetailStore);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="shadow text-center m-0 p-0">
      {router.modules && (
        <div className="m-0 p-0">
          <h6 className="display-6 text-center card-header bg-light bg-opacity-100 m-0 p-1">
            Модули:
          </h6>
          <div className="m-0 p-0">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 m-0 p-0">
              {router.modules.map(
                (module, module_i) =>
                  util.CheckAccess(userDetailStore, module.Access) &&
                  module.ShowInModules && (
                    <div key={module_i} className="text-center m-0 p-1">
                      <div className="lead card-header border shadow bg-light bg-opacity-100 custom-background-transparent-hard m-0 p-0">
                        {module["Header"]}
                      </div>
                      <div className="text-center custom-background-transparent-middle m-0 p-0">
                        <img
                          src={module["Image"]}
                          className="img-fluid w-25 m-0 p-0"
                          alt="id"
                        />
                      </div>
                      {module["Sections"]
                        ? module["Sections"].map(
                            (section, section_i) =>
                              util.CheckAccess(
                                userDetailStore,
                                section.Access
                              ) && (
                                <div
                                  key={section_i}
                                  className="card-body text-end m-0 p-0"
                                >
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled bg-primary bg-opacity-75 d-flex m-0 p-1">
                                      <div className="m-0 p-0">
                                        <img
                                          src={section["Image"]}
                                          className="img-fluid w-25 m-0 p-0"
                                          alt="id"
                                        />
                                      </div>
                                      <LinkContainer
                                        to="#"
                                        className="disabled m-0 p-3"
                                      >
                                        <Nav.Link>
                                          <small className="fw-bold text-light m-0 p-0">
                                            {section["Header"]}
                                          </small>
                                        </Nav.Link>
                                      </LinkContainer>
                                    </li>
                                    <ul className="list-group-flush m-0 p-0">
                                      {section["Links"]
                                        ? section["Links"].map((link, link_i) =>
                                            link["Active"]
                                              ? link.ShowLink &&
                                                util.CheckAccess(
                                                  userDetailStore,
                                                  link.Access
                                                ) && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action m-0 p-0"
                                                  >
                                                    {link.ExternalLink ? (
                                                      <a
                                                        key={link_i}
                                                        className={
                                                          link["Active"]
                                                            ? "text-dark dropdown-item m-0 p-0"
                                                            : "disabled m-0 p-1"
                                                        }
                                                        href={link["Link"]}
                                                        target="_self"
                                                      >
                                                        <i
                                                          className={
                                                            link.LinkIcon
                                                          }
                                                        />
                                                        {link["Header"]}
                                                      </a>
                                                    ) : (
                                                      <LinkContainer
                                                        to={link["Link"]}
                                                      >
                                                        <Nav.Link className="m-0 p-1">
                                                          <small
                                                            className={
                                                              link.Style !== ""
                                                                ? `${link.Style} m-0 p-1`
                                                                : "text-dark m-0 p-1"
                                                            }
                                                          >
                                                            <i
                                                              className={
                                                                link.LinkIcon
                                                              }
                                                            />
                                                            {link["Header"]}
                                                            {"  "}
                                                            {link.Header ===
                                                              "Уведомления" &&
                                                              NotificationReadListStore.data &&
                                                              NotificationReadListStore
                                                                .data.list
                                                                .length > 0 && (
                                                                <span className="badge rounded-pill text-danger m-0 p-1">
                                                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                                                  {
                                                                    NotificationReadListStore
                                                                      .data[
                                                                      "x-total-count"
                                                                    ]
                                                                  }
                                                                </span>
                                                              )}
                                                          </small>
                                                        </Nav.Link>
                                                      </LinkContainer>
                                                    )}
                                                  </li>
                                                )
                                              : link.ShowLink &&
                                                util.CheckAccess(
                                                  userDetailStore,
                                                  link.Access
                                                ) && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action disabled m-0 p-0"
                                                  >
                                                    <LinkContainer
                                                      to={
                                                        link["Link"]
                                                          ? link["Link"]
                                                          : "#"
                                                      }
                                                      className="disabled m-0 p-0"
                                                    >
                                                      <Nav.Link>
                                                        <small className="text-muted m-0 p-0">
                                                          {link["Header"]} (
                                                          <small className="text-danger m-0 p-0">
                                                            В РАЗРАБОТКЕ
                                                          </small>
                                                          )
                                                        </small>
                                                      </Nav.Link>
                                                    </LinkContainer>
                                                  </li>
                                                )
                                          )
                                        : ""}
                                    </ul>
                                  </div>
                                </div>
                              )
                          )
                        : ""}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export const NewsComponent = ({ count = 100 }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card list-group list-group-item-action list-group-flush custom-background-transparent-low-middle m-0 p-0">
      <div className="border-bottom scrollarea m-0 p-0">
        <LinkContainer to="/news" className="m-0 p-0">
          <Nav.Link className="m-0 p-0">
            <div
              className="list-group-item active shadow m-0 p-2"
              aria-current="true"
            >
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="lead m-0 p-0 mb-1">
                  <i className="fa-solid fa-newspaper m-0 p-1" />
                  Лента
                </strong>
                <strong className="text-warning m-0 p-0">Свежие сверху</strong>
              </div>
              {count !== 100 && (
                <div className="small m-0 p-0 mb-1">
                  (нажмите сюда для просмотра всех изменений)
                </div>
              )}
            </div>
          </Nav.Link>
        </LinkContainer>
        {constant.news.slice(0, count).map((news_elem, index) => (
          <div key={index} className="custom-hover m-0 p-0">
            <Link
              to={news_elem.Link}
              className={
                news_elem.Status !== "active"
                  ? "list-group-item list-group-item-action bg-secondary bg-opacity-10 m-0 p-1"
                  : "list-group-item list-group-item-action bg-success bg-opacity-10 m-0 p-1"
              }
            >
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="m-0 p-0">
                  {news_elem.Title}
                  {news_elem.Link !== "#" && (
                    <small className="custom-color-primary-1 m-0 p-0">
                      {" "}
                      (нажмите сюда для перехода)
                    </small>
                  )}
                </strong>
                <small className="text-muted m-0 p-0">
                  {news_elem.Status !== "active" ? (
                    <strong className="text-secondary text-start m-0 p-0">
                      (в разработке)
                    </strong>
                  ) : (
                    <strong className="text-success text-start m-0 p-0">
                      (завершено)
                    </strong>
                  )}
                </small>
              </div>
              <div className="small m-0 p-0">
                {news_elem.Description}
                {news_elem.Helps && (
                  <small className="text-secondary m-0 p-0">
                    {" "}
                    ({news_elem.Helps})
                  </small>
                )}
                {news_elem.Danger && (
                  <small className="text-danger m-0 p-0">
                    {" "}
                    ({news_elem.Danger})
                  </small>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Accordion1 = ({
  // @ts-ignore
  key_target,
  isCollapse = true,
  // @ts-ignore
  title,
  text_style = "text-danger",
  header_style = "bg-danger bg-opacity-10",
  body_style = "bg-danger bg-opacity-10",
  // @ts-ignore
  children,
}) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="m-0 p-0">
      <div className="accordion m-0 p-0" id="accordionExample">
        <div className="accordion-item custom-background-transparent-middle m-0 p-0">
          <h2
            className="accordion-header custom-background-transparent-low m-0 p-0"
            id="accordion_heading_1"
          >
            <button
              className={`accordion-button m-0 p-0 ${header_style}`}
              type="button"
              data-bs-toggle=""
              data-bs-target={`#${key_target}`}
              aria-expanded="false"
              aria-controls={key_target}
              onClick={(e) => util.ChangeAccordionCollapse([key_target])}
            >
              <h6 className={`lead m-0 p-3 ${text_style}`}>
                {title}{" "}
                <small className="text-muted m-0 p-0">
                  (нажмите сюда, для переключения)
                </small>
              </h6>
            </button>
          </h2>
          <div
            id={key_target}
            className={
              isCollapse
                ? "accordion-collapse collapse m-0 p-0"
                : "accordion-collapse m-0 p-0"
            }
            aria-labelledby={key_target}
            data-bs-parent="#accordionExample"
          >
            <div className={`accordion-body m-0 p-0 ${body_style}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
