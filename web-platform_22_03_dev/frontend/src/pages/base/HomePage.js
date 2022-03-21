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
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const HomePage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent
        logic={true}
        redirect={false}
        title={"Домашняя страница"}
        description={"основная страница веб платформы"}
      />
      <main className="container">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
          <div className="embed-responsive embed-responsive-16by9">
            <div className="btn-group m-0 p-0 text-start w-100">
              <Link
                to={"/video_study"}
                className="btn btn-sm btn-warning m-1 p-1"
              >
                Инструкции в видео формате
              </Link>
              <Link
                to={"/text_study"}
                className="btn btn-sm btn-primary m-1 p-1"
              >
                Инструкции в текстовом формате
              </Link>
            </div>
            <div className="player-wrapper">
              <small className="lead fw-bold">Первый вход в систему:</small>
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
          <div className="">
            <components.NewsComponent count={9} />
          </div>
        </div>
        <div>
          <components.ModulesComponent />
        </div>
      </main>
      <components.FooterComponent />
    </body>
  );
};
