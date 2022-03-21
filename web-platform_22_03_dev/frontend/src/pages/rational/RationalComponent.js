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
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalComponent = ({ object, shortView = false }) => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userDetailsStore = useSelector((state) => state.userDetailsStore);

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div
      className={
        shortView ? "card list-group-item-action shadow  " : "card shadow  "
      }
    >
      <div className="card-header m-0 p-0   bg-opacity-10 bg-primary">
        <h6 className="lead fw-bold">
          {object["name_char_field"]}{" "}
          {utils.CheckAccess(userDetailsStore, "rational_admin") && (
            <small className="text-danger">
              [{utils.GetSliceString(object["status_moderate_char_field"], 30)}]
            </small>
          )}
        </h6>
      </div>
      <div className="card-body m-0 p-0  ">
        <label className="form-control-sm m-1">
          Подразделение:
          <select
            id="subdivision"
            name="subdivision"
            required
            className="form-control form-control-sm"
          >
            <option value="">{object["subdivision_char_field"]}</option>
          </select>
        </label>
        <label className="form-control-sm m-1">
          Зарегистрировано за №{" "}
          <strong className="btn btn-light disabled">
            {object["number_char_field"]}
          </strong>
        </label>
      </div>

      <div className="card-body m-0 p-0  ">
        <label className="form-control-sm m-1">
          Сфера:
          <select
            id="sphere"
            name="sphere"
            required
            className="form-control form-control-sm"
          >
            <option value="">{object["sphere_char_field"]}</option>
          </select>
        </label>
        <label className="form-control-sm m-1">
          Категория:
          <select
            id="category"
            name="category"
            required
            className="form-control form-control-sm"
          >
            <option value="">{object["category_char_field"]}</option>
          </select>
        </label>
      </div>
      <div className="card-body m-0 p-0  ">
        <img
          src={utils.GetStaticFile(object["avatar_image_field"])}
          className={
            shortView
              ? "card-img-top img-fluid w-25"
              : "card-img-top img-fluid w-100"
          }
          alt="id"
        />
      </div>
      <div className="card-body m-0 p-0  ">
        <label className="w-100 form-control-sm">
          Место внедрения:
          <input
            type="text"
            id="name_char_field"
            name="name_char_field"
            required
            placeholder="Цех / участок / отдел / лаборатория и т.п."
            defaultValue={object["place_char_field"]}
            readOnly={true}
            minLength="1"
            maxLength="100"
            className="form-control form-control-sm"
          />
        </label>
      </div>
      <div className="card-body m-0 p-0  ">
        <label className="w-100 form-control-sm m-1">
          Описание:
          <textarea
            required
            placeholder="Описание"
            defaultValue={
              !shortView
                ? utils.GetSliceString(object["description_text_field"], 50)
                : object["description_text_field"]
            }
            readOnly={true}
            minLength="1"
            maxLength="5000"
            rows="3"
            className="form-control form-control-sm"
          />
        </label>
      </div>
      {!shortView && (
        <div className="card-body m-0 p-0  ">
          <label className="form-control-sm m-1">
            Word файл-приложение:
            <a
              className="btn btn-sm btn-primary m-1"
              href={utils.GetStaticFile(object["additional_word_file_field"])}
            >
              Скачать документ
            </a>
          </label>
          <label className="form-control-sm m-1">
            Pdf файл-приложение:
            <a
              className="btn btn-sm btn-danger m-1"
              href={utils.GetStaticFile(object["additional_pdf_file_field"])}
            >
              Скачать документ
            </a>
          </label>
          <label className="form-control-sm m-1">
            Excel файл-приложение:
            <a
              className="btn btn-sm btn-success m-1"
              href={utils.GetStaticFile(object["additional_excel_file_field"])}
            >
              Скачать документ
            </a>
          </label>
        </div>
      )}
      <div className="card-body m-0 p-0  ">
        <Link to={`#`} className="text-decoration-none btn btn-sm btn-warning">
          Автор: {object["user_model"]["last_name_char_field"]}{" "}
          {object["user_model"]["first_name_char_field"]}{" "}
          {object["user_model"]["patronymic_char_field"]}
        </Link>
      </div>
      {!shortView && (
        <label className="w-100 form-control-sm m-1">
          Участники:
          {object["user1_char_field"] &&
            object["user1_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user1_char_field"]}
                placeholder="участник № 1"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user2_char_field"] &&
            object["user2_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user2_char_field"]}
                placeholder="участник № 2"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user3_char_field"] &&
            object["user3_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user3_char_field"]}
                placeholder="участник № 3"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user4_char_field"] &&
            object["user4_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user4_char_field"]}
                placeholder="участник № 4"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {object["user5_char_field"] &&
            object["user5_char_field"].length > 1 && (
              <input
                type="text"
                value={object["user5_char_field"]}
                placeholder="участник № 5"
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
        </label>
      )}
      <div className="card-body m-0 p-0  ">
        <label className="text-muted border p-1 m-1">
          подано:{" "}
          <p className=" ">
            {utils.GetCleanDateTime(object["created_datetime_field"], true)}
          </p>
        </label>
        <label className="text-muted border p-1 m-1">
          зарегистрировано:{" "}
          <p className=" ">
            {utils.GetCleanDateTime(object["register_datetime_field"], true)}
          </p>
        </label>
      </div>
      {shortView && (
        <div className="card-header m-0 p-0  ">
          <Link
            className="btn btn-sm btn-primary w-100"
            to={`/rational_detail/${object.id}`}
          >
            Подробнее
          </Link>
        </div>
      )}
    </div>
  );
};

export default RationalComponent;
