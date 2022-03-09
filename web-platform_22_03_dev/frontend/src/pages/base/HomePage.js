import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReactPlayer from "react-player";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import ModulesComponent from "../../components/ModulesComponent";
import NewsComponent from "../../components/NewsComponent";
import { Link } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const HomePage = () => {
  return (
    <div>
      <HeaderComponent logic={true} redirect={false} />
      <TitleComponent
        first={"Домашняя страница"}
        second={"основная страница веб платформы."}
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
              <div className="player-wrapper">
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
          <div className="">
            <div className="btn-group p-1 m-0">
              <Link
                to={"/video_study"}
                className="btn btn-sm btn-warning p-2 m-1"
              >
                Инструкции в видео формате
              </Link>
              <Link
                to={"/text_study"}
                className="btn btn-sm btn-primary p-2 m-1"
              >
                Инструкции в текстовом формате
              </Link>
              {/*<Link*/}
              {/*  to={"/vacancy_lis"}*/}
              {/*  className="btn btn-sm btn-success p-2 m-1"*/}
              {/*>*/}
              {/*  Вакансии предприятия*/}
              {/*</Link>*/}
            </div>
            <NewsComponent count={9} />
          </div>
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
