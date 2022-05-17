// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../../components/ui/base";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function FormPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let username1 = "";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const switchPasswordVisibility = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <base.Base1>
      <hr />
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <form className="m-0 p-0" onSubmit={submit}>
          <div className="card shadow custom-background-transparent-low m-0 p-0">
            <div className="card-header m-0 p-0">Form Header</div>
            <div className="card-body m-0 p-0">
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-id-card m-0 p-1" />
                  username:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={username}
                    placeholder="введите ИИН тут..."
                    required
                    minLength={12}
                    maxLength={12}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="current-username"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
                <hr />
                <label className="form-control-sm text-center w-75 m-0 p-1">
                  <i className="fa-solid fa-key m-0 p-1" />
                  password:
                  <div className="input-group form-control-sm m-0 p-1">
                    <input
                      type="password"
                      className="form-control form-control-sm text-center m-0 p-1"
                      id="password"
                      value={password}
                      placeholder="введите пароль тут..."
                      required
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      minLength={8}
                      maxLength={16}
                    />
                    <span className="m-0 p-1">
                      <i
                        className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
                        onClick={(event) => switchPasswordVisibility(event)}
                      />
                    </span>
                  </div>
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  checkbox:
                  <input
                    type="checkbox"
                    className="form-check form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  file:
                  <input
                    type="file"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  hidden:
                  <input
                    type="hidden"
                    className="form-check form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  image:
                  <input
                    type="image"
                    className="form-control form-control-sm text-center m-0 p-1"
                    alt={"image"}
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  radio:
                  <input
                    type="radio"
                    className="form-check form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  reset:
                  <input
                    type="reset"
                    className="form-check form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  submit:
                  <input
                    type="submit"
                    className="form-check form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  text:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  textarea:
                  <textarea className="form-control form-control-sm text-center m-0 p-1" />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  color:
                  <input
                    type="color"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  date:
                  <input
                    type="date"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  datetime:
                  <input
                    type="datetime"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  datetime-local:
                  <input
                    type="datetime-local"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  email:
                  <input
                    type="email"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  number:
                  <input
                    type="number"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  range:
                  <input
                    type="range"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  search:
                  <input
                    type="search"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  tel:
                  <input
                    type="tel"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  time:
                  <input
                    type="time"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  url:
                  <input
                    type="url"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  month:
                  <input
                    type="month"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
              <hr />
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  <i className="fa-solid fa-cab m-0 p-1" />
                  week:
                  <input
                    type="week"
                    className="form-control form-control-sm text-center m-0 p-1"
                  />
                  <small className="text-danger m-0 p-0">
                    * first
                    <small className="text-warning m-0 p-0"> * second</small>
                    <small className="text-muted m-0 p-0"> * third</small>
                  </small>
                </label>
              </div>
            </div>
            <div className="card-footer m-0 p-0">
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <button
                  className="btn btn-sm btn-primary m-1 p-2"
                  type="submit"
                >
                  <i className="fa-solid fa-circle-check m-0 p-1" />
                  submit
                </button>
                <button className="btn btn-sm btn-warning m-1 p-2" type="reset">
                  <i className="fa-solid fa-pen-nib m-0 p-1" />
                  reset
                </button>
              </ul>
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <Link to="/" className="btn btn-sm btn-success m-1 p-2">
                  <i className="fa-solid fa-universal-access m-0 p-1" />
                  link
                </Link>
              </ul>
            </div>
          </div>
        </form>
      </ul>
      <hr />
    </base.Base1>
  );
}
