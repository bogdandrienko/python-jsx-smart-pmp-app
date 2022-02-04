import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import ModulesComponent from "../components/ModulesComponent";
import NewsComponent from "../components/NewsComponent";

const HomePage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
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
          <NewsComponent />
        </div>
        <div>
          <ModulesComponent />
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePage;
