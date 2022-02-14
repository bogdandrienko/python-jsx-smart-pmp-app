import React from "react";
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
      <main className="container text-center">
        <div>
          <small className="lead fw-bold">Первый вход в систему:</small>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="80%"
              height="80%"
              src="https://www.youtube.com/embed/1ba_rLHMWbs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              controls
            />
          </div>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="80%"
              height="80%"
              src="https://www.youtube.com/embed/8L6EVU2vEZ8"
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
              src="https://www.youtube.com/embed/dyaPqpWdlHw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              controls
            />
          </div>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="80%"
              height="80%"
              src="https://www.youtube.com/embed/ntOfbJaDF24"
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
