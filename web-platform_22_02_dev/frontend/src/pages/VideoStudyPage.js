import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../actions/userActions";

import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";

const VideoStudyPage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Видео инструкции"}
        second={"страница с видеоинструкциями по функционалу."}
      />
      <main className="container text-center">
        <div>
          <small className="lead fw-bold">Первый вход в систему:</small>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="80%"
              height="80%"
              src="https://www.youtube.com/embed/WlC8iXpn2vA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              controls
            />
          </div>
        </div>
        <div>
          <small className="lead fw-bold">Выгрузка расчётного листа:</small>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="80%"
              height="80%"
              src="https://www.youtube.com/embed/vd1tG-Qa_YQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              controls
            />
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default VideoStudyPage;
