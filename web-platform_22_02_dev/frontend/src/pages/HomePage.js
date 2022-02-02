import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

import Header from "../components/Header";
import Title from "../components/Title";
import Footer from "../components/Footer";
import Modules from "../components/Modules";
import News from "../components/News";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Title
        first={"Домашняя страница"}
        second={"основная страница веб платформы."}
      />
      <main className="container text-center">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 align-content-between">
          <div className="text-center">
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
            <LinkContainer to="/video_study">
              <Nav.Link>
                <small className="fw-bold btn btn-warning">
                  Все видео-инструкции
                </small>
              </Nav.Link>
            </LinkContainer>
          </div>
          <News />
        </div>
        <div>
          <Modules />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
