///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React from "react";
import ReactPlayer from "react-player";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const VideoStudyPage = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
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
    </body>
  );
};
