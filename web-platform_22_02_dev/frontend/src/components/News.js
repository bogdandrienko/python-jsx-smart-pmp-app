import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const News = () => {
  return (
    <div className="">
      <ul className="list-group">
        <li className="lead list-group-item active">
          <h3 className="lead list-group-item active">Информация: </h3>
        </li>
        <li className="list-group-item">
          <div className="d-flex">
            <strong className="text-success text-start">(завершено)</strong>
            <LinkContainer to="/salary" className="text-success text-end">
              <Nav.Link className="">
                Расчётный лист:(<small className="text-primary">ссылка</small>)
              </Nav.Link>
            </LinkContainer>
          </div>
          <small>
            возможность выгрузки расчётного листа для основных работников (
            <small className="text-danger">контрактники пока не включены</small>
            )
          </small>
        </li>
        <li className="list-group-item">
          <div className="d-flex">
            <strong className="text-success text-start">(завершено)</strong>
            <LinkContainer to="/video_study" className="text-success text-end">
              <Nav.Link className="">
                Видео-инструкции:(<small className="text-primary">ссылка</small>
                )
              </Nav.Link>
            </LinkContainer>
          </div>
          <small>
            страница с инструкциями в формате видео с ссылками на ютюб (
            <small className="text-secondary">
              материал будет своевременно обновляться
            </small>
            )
          </small>
        </li>
        <li className="list-group-item">
          <div className="d-flex">
            <strong className="text-secondary text-start">
              (в разработке)
            </strong>
            <LinkContainer to="#" className="text-secondary text-end disabled">
              <Nav.Link className="">Отпуска:</Nav.Link>
            </LinkContainer>
          </div>
          <small>выдача данных по отпускам за период</small>
        </li>
        <li className="list-group-item">
          <div className="d-flex">
            <strong className="text-secondary text-start">
              (в разработке)
            </strong>
            <LinkContainer to="#" className="text-secondary text-end disabled">
              <Nav.Link className="">Банк идей:</Nav.Link>
            </LinkContainer>
          </div>
          <small>весь функционал для банка идей</small>
        </li>
        <li className="list-group-item">
          <div className="d-flex">
            <strong className="text-secondary text-start">
              (в разработке)
            </strong>
            <LinkContainer to="#" className="text-secondary text-end disabled">
              <Nav.Link className="">Личный профиль:</Nav.Link>
            </LinkContainer>
          </div>
          <small>
            расширение личного профиля: дополнительные
            данные, статистика, достижения...
          </small>
        </li>
      </ul>
    </div>
  );
};

export default News;
