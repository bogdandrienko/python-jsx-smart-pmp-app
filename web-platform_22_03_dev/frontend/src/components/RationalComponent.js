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
import * as constants from "../js/constants";
import * as actions from "../js/actions";
import * as utils from "../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalComponent = ({ rational, shortView = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div
      className={
        shortView
          ? "card list-group-item-action shadow p-0 m-0"
          : "card shadow p-0 m-0"
      }
    >
      <div className="card-header p-0 m-0 bg-opacity-10 bg-primary">
        <h6 className="lead fw-bold">{rational["name_char_field"]}</h6>
      </div>
      <div className="card-body p-0 m-0">
        <label className="form-control-sm m-1">
          Наименование структурного подразделения:
          <select
            id="subdivision"
            name="subdivision"
            required
            className="form-control form-control-sm"
          >
            <option value="">{rational["subdivision_char_field"]}</option>
          </select>
        </label>
        <label className="form-control-sm m-1">
          Зарегистрировано за №{" "}
          <strong className="btn btn-light disabled">
            {rational["number_char_field"]}
          </strong>
        </label>
      </div>

      <div className="card-body p-0 m-0">
        <label className="form-control-sm m-1">
          Сфера рац. предложения:
          <select
            id="sphere"
            name="sphere"
            required
            className="form-control form-control-sm"
          >
            <option value="">{rational["sphere_char_field"]}</option>
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
            <option value="">{rational["category_char_field"]}</option>
          </select>
        </label>
      </div>
      <div className="card-body p-0 m-0">
        <img
          src={utils.GetStaticFile(rational["avatar_image_field"])}
          className={
            shortView
              ? "card-img-top img-fluid w-25"
              : "card-img-top img-fluid w-100"
          }
          alt="id"
        />
      </div>
      <div className="card-body p-0 m-0">
        <label className="w-100 form-control-sm">
          Предполагаемое место внедрения:
          <input
            type="text"
            id="name_char_field"
            name="name_char_field"
            required
            placeholder="Цех / участок / отдел / лаборатория и т.п."
            defaultValue={rational["place_char_field"]}
            readOnly={true}
            minLength="1"
            maxLength="100"
            className="form-control form-control-sm"
          />
        </label>
      </div>
        <div className="card-body p-0 m-0">
          <label className="w-100 form-control-sm m-1">
            Полное описание:
            <textarea
              required
              placeholder="Полное описание"
              defaultValue={!shortView ? (utils.GetSliceString(rational["description_text_field"], 50)) : rational["description_text_field"]}
              readOnly={true}
              minLength="1"
              maxLength="5000"
              rows="3"
              className="form-control form-control-sm"
            />
          </label>
        </div>
      {!shortView && (
        <div className="card-body p-0 m-0">
          <label className="form-control-sm m-1">
            Word файл-приложение:
            <a
              className="btn btn-sm btn-primary m-1"
              href={utils.GetStaticFile(rational["additional_word_file_field"])}
            >
              Скачать документ
            </a>
          </label>
          <label className="form-control-sm m-1">
            Pdf файл-приложение:
            <a
              className="btn btn-sm btn-danger m-1"
              href={utils.GetStaticFile(rational["additional_pdf_file_field"])}
            >
              Скачать документ
            </a>
          </label>
          <label className="form-control-sm m-1">
            Excel файл-приложение:
            <a
              className="btn btn-sm btn-success m-1"
              href={utils.GetStaticFile(
                rational["additional_excel_file_field"]
              )}
            >
              Скачать документ
            </a>
          </label>
        </div>
      )}
      <div className="card-body p-0 m-0">
        <Link to={`#`} className="text-decoration-none btn btn-sm btn-warning">
          Автор: {rational["user_model"]["last_name_char_field"]}{" "}
          {rational["user_model"]["first_name_char_field"]}{" "}
          {rational["user_model"]["patronymic_char_field"]}
        </Link>
      </div>
      {!shortView && (
        <label className="w-100 form-control-sm m-1">
          Участники:
          {rational["user1_char_field"] &&
            rational["user1_char_field"].length > 3 && (
              <input
                type="text"
                id="name_char_field"
                name="name_char_field"
                placeholder="участник № 1"
                value={rational["user1_char_field"]}
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {rational["user2_char_field"] &&
            rational["user2_char_field"].length > 3 && (
              <input
                type="text"
                id="name_char_field"
                name="name_char_field"
                placeholder="участник № 2"
                value={rational["user2_char_field"]}
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {rational["user3_char_field"] &&
            rational["user3_char_field"].length > 3 && (
              <input
                type="text"
                id="name_char_field"
                name="name_char_field"
                placeholder="участник № 3"
                value={rational["user3_char_field"]}
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {rational["user4_char_field"] &&
            rational["user4_char_field"].length > 3 && (
              <input
                type="text"
                id="name_char_field"
                name="name_char_field"
                placeholder="участник № 4"
                value={rational["user4_char_field"]}
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
          {rational["user5_char_field"] &&
            rational["user5_char_field"].length > 3 && (
              <input
                type="text"
                id="name_char_field"
                name="name_char_field"
                placeholder="участник № 5"
                value={rational["user5_char_field"]}
                minLength="0"
                maxLength="200"
                className="form-control form-control-sm"
              />
            )}
        </label>
      )}
      <div className="card-body p-0 m-0">
        <label className="text-muted border p-1 m-1">
          подано:{" "}
          <p className="p-0 m-0">
            {utils.GetCleanDateTime(rational["created_datetime_field"], true)}
          </p>
        </label>
        <label className="text-muted border p-1 m-1">
          зарегистрировано:{" "}
          <p className="p-0 m-0">
            {utils.GetCleanDateTime(rational["register_datetime_field"], true)}
          </p>
        </label>
      </div>
      {shortView && (
        <div className="card-header p-0 m-0">
          <Link
            to={`/rational_detail/${rational.id}`}
            className="btn btn-sm btn-primary w-100"
          >
            Подробнее
          </Link>
        </div>
      )}
    </div>
  );
};

export default RationalComponent;
