// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../../components/ui/base";
import * as component from "../../components/ui/component";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HomePage = () => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 text-center m-0 p-1">
        <div className="embed-responsive embed-responsive-16by9 text-center m-0 p-1">
          <div className="btn-group text-start w-100 m-0 p-0">
            <Link
              to={"/video_study"}
              className="btn btn-sm btn-warning m-1 p-2"
            >
              Инструкции в видео формате
            </Link>
            <Link to={"/text_study"} className="btn btn-sm btn-primary m-1 p-2">
              Инструкции в текстовом формате
            </Link>
          </div>
          <div className="player-wrapper w-100 bg-light bg-opacity-75 m-0 p-0">
            <small className="lead fw-bold m-0 p-0">
              Первый вход в систему:
            </small>
            <ReactPlayer
              url="static/study/first_login.mp4"
              title="Первый вход в систему:"
              width="100%"
              height="100%"
              controls={true}
              pip={true}
              className="react-player"
            />
          </div>
        </div>
        <div className="m-0 p-1">
          <component.NewsComponent count={6} />
        </div>
      </div>
      <div className="m-0 p-0">
        <component.ModulesComponent />
      </div>
    </base.Base1>
  );
};
