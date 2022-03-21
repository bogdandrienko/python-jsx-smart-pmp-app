///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
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
import ReactPlayer from "react-player";
import axios from "axios";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////components

//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const VideoStudyPage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent
        logic={true}
        redirect={false}
        title={"Видео инструкции"}
        description={
          "страница с видео инструкциями по функционалу веб-платформы"
        }
      />
      <main className="container">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
          <div className="embed-responsive embed-responsive-16by9">
            <small className="lead fw-bold">Первый вход в систему:</small>
            <div className="player-wrapper">
              <ReactPlayer
                url="static/study/first_login.mp4"
                title="Первый вход в систему:"
                width="100%"
                height="100%"
                controls={true}
                className=""
              />
            </div>
          </div>
          <div className="embed-responsive embed-responsive-16by9">
            <small className="lead fw-bold">Выгрузка расчётного листа:</small>
            <div className="player-wrapper">
              <ReactPlayer
                url="static/study/salary.mp4"
                title="Первый вход в систему:"
                width="100%"
                height="100%"
                controls={true}
                className="embed-responsive-item"
              />
            </div>
          </div>
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
