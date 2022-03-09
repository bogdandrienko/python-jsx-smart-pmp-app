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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VideoStudyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div>
      <HeaderComponent logic={true} redirect={false} />
      <TitleComponent
        first={"Видео инструкции"}
        second={"страница с видеоинструкциями по функционалу веб-платформы."}
      />
      <main className="container">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
          <div className="">
            <small className="lead fw-bold">Первый вход в систему:</small>
            <div className="w-75">
              С компьютера:
              <div className="">
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

            <div className="embed-responsive embed-responsive-16by9 w-50">
              С смартфона:
              <div className="">
                <ReactPlayer
                  url="static/study/first_login_mobile.mp4"
                  title="Первый вход в систему:"
                  width="100%"
                  height="100%"
                  controls={true}
                  className=""
                />
              </div>
            </div>
          </div>
          <div>
            <small className="lead fw-bold">Выгрузка расчётного листа:</small>
            <div className="embed-responsive embed-responsive-16by9 w-75">
              С компьютера:
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

            <div className="embed-responsive embed-responsive-16by9 w-50">
              С смартфона:
              <div className="player-wrapper">
                <ReactPlayer
                  url="static/study/salary_mobile.mp4"
                  title="Первый вход в систему:"
                  width="100%"
                  height="100%"
                  controls={true}
                  className="embed-responsive-item"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default VideoStudyPage;
