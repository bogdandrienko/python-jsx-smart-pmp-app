"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_player_1 = require("react-player");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var base = require("../../components/ui/base");
var component = require("../../components/component");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var HomePage = function () {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<base.BaseComponent1>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 text-center m-0 p-1">
        <div className="embed-responsive embed-responsive-16by9 text-center m-0 p-1">
          <div className="btn-group text-start w-100 m-0 p-0">
            <react_router_dom_1.Link to={"/video_study"} className="btn btn-sm btn-warning m-1 p-2">
              Инструкции в видео формате
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to={"/text_study"} className="btn btn-sm btn-primary m-1 p-2">
              Инструкции в текстовом формате
            </react_router_dom_1.Link>
          </div>
          <div className="player-wrapper w-100 bg-light bg-opacity-75 m-0 p-0">
            <small className="lead fw-bold m-0 p-0">
              Первый вход в систему:
            </small>
            <react_player_1.default url="static/study/first_login.mp4" title="Первый вход в систему:" width="100%" height="100%" controls={true} pip={true} className="react-player"/>
          </div>
        </div>
        <div className="m-0 p-1">
          <component.NewsComponent count={6}/>
        </div>
      </div>
      <div className="m-0 p-0">
        <component.ModulesComponent />
      </div>
    </base.BaseComponent1>);
};
exports.HomePage = HomePage;
