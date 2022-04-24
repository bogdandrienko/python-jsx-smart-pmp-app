"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoStudyPage = void 0;
var react_1 = require("react");
var react_player_1 = require("react-player");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var component = require("../../components/component");
var base = require("../../components/ui/base");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var VideoStudyPage = function () {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<base.BaseComponent1>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center text-center shadow m-0 p-0">
        <component.AccordionComponent key_target={"accordion1"} isCollapse={false} title={"Первый вход в систему:"} text_style="text-primary" header_style="bg-primary bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
          {<div className="embed-responsive embed-responsive-16by9 custom-background-transparent-middle">
              <div className="player-wrapper">
                <react_player_1.default url="static/study/first_login.mp4" title="Первый вход в систему:" width="100%" height="100%" controls={true} className=""/>
              </div>
            </div>}
        </component.AccordionComponent>
        <component.AccordionComponent key_target={"accordion2"} isCollapse={false} title={"Выгрузка расчётного листа:"} text_style="custom-color-warning-1" header_style="bg-warning bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
          {<div className="embed-responsive embed-responsive-16by9 custom-background-transparent-low">
              <div className="player-wrapper">
                <react_player_1.default url="static/study/salary.mp4" title="Выгрузка расчётного листа:" width="100%" height="100%" controls={true} className="embed-responsive-item"/>
              </div>
            </div>}
        </component.AccordionComponent>
        <component.AccordionComponent key_target={"accordion3"} isCollapse={false} title={"Выгрузка данных по отпуску:"} text_style="text-success" header_style="bg-success bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
          {<div className="embed-responsive embed-responsive-16by9 custom-background-transparent-low">
              <div className="player-wrapper">
                <react_player_1.default url="static/study/vacation.mp4" title="Выгрузка данных по отпуску:" width="100%" height="100%" controls={true} className="embed-responsive-item"/>
              </div>
            </div>}
        </component.AccordionComponent>
      </div>
    </base.BaseComponent1>);
};
exports.VideoStudyPage = VideoStudyPage;
