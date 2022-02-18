import React from "react";
import ReactPlayer from "react-player";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VideoStudyPage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Видео инструкции"}
        second={"страница с видеоинструкциями по функционалу веб-платформы."}
        logic={false}
      />
      <main className="container">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
          <div className="">
            <small className="lead fw-bold">Первый вход в систему:</small>
            <div className="w-75">
              С компьютера:
              <div className="">
                <ReactPlayer
                  url="static/video/first_login_desktop.MP4"
                  title="Первый вход в систему:"
                  width="100%"
                  height="100%"
                  controls={true}
                  className=""
                />
              </div>
            </div>

            <div className="w-75">
              С смартфона:
              <div className="">
                <ReactPlayer
                  url="static/video/first_login_mobile.MP4"
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
            <div className="w-75">
              <div className="embed-responsive embed-responsive-16by9">
                С компьютера:
                <div className="player-wrapper">
                  <ReactPlayer
                    url="static/video/salary_desktop.MP4"
                    title="Первый вход в систему:"
                    width="100%"
                    height="100%"
                    controls={true}
                    className="embed-responsive-item"
                  />
                </div>
              </div>

              <div className="embed-responsive embed-responsive-16by9">
                С смартфона:
                <div className="player-wrapper">
                  <ReactPlayer
                    url="static/video/salary_mobile.MP4"
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
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default VideoStudyPage;
