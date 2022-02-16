import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReactPlayer from "react-player";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import ModulesComponent from "../components/ModulesComponent";
import NewsComponent from "../components/NewsComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const HomePage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Домашняя страница"}
        second={"основная страница веб платформы."}
        logic={false}
      />
      <main className="container text-center">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 align-content-between">
          <div className="text-center container-fluid">
            <small className="lead fw-bold">Первый вход в систему:</small>

            <div className="embed-responsive embed-responsive-16by9">
              <div className="player-wrapper">
                <ReactPlayer
                  url="static/first_login.MP4"
                  title="Первый вход в систему:"
                  width="100%"
                  height="100%"
                  controls={true}
                  className="embed-responsive-item"
                />
              </div>
            </div>

            <div className="embed-responsive embed-responsive-16by9">
              <div className="player-wrapper">
                <ReactPlayer
                  url="static/first_login_mobile.MP4"
                  title="Первый вход в систему:"
                  width="100%"
                  height="100%"
                  controls={true}
                  className="embed-responsive-item"
                />
              </div>
            </div>
            <div className="row">
              <LinkContainer to="/video_study" className="col">
                <Nav.Link>
                  <small className="fw-bold btn btn-warning">
                    Все видео-инструкции (нажмите для перехода)
                  </small>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/text_study" className="col">
                <Nav.Link>
                  <small className="fw-bold btn btn-primary">
                    Инструкции в текстовом формате (нажмите для перехода)
                  </small>
                </Nav.Link>
              </LinkContainer>
            </div>
          </div>
          <NewsComponent count={7} />
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
