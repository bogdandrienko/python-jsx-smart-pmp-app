// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactPlayer from "react-player";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const VideoStudyPage = () => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center text-center shadow m-0 p-0">
          <components.AccordionComponent
            key_target={"accordion1"}
            isCollapse={false}
            title={"Первый вход в систему:"}
            text_style="text-primary"
            header_style="bg-primary bg-opacity-10 custom-background-transparent-low"
            body_style="bg-light bg-opacity-10 custom-background-transparent-low"
          >
            {
              <div className="embed-responsive embed-responsive-16by9 custom-background-transparent-middle">
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
            }
          </components.AccordionComponent>
          <components.AccordionComponent
            key_target={"accordion2"}
            isCollapse={false}
            title={"Выгрузка расчётного листа:"}
            text_style="custom-color-warning-1"
            header_style="bg-warning bg-opacity-10 custom-background-transparent-low"
            body_style="bg-light bg-opacity-10 custom-background-transparent-low"
          >
            {
              <div className="embed-responsive embed-responsive-16by9 custom-background-transparent-low">
                <div className="player-wrapper">
                  <ReactPlayer
                    url="static/study/salary.mp4"
                    title="Выгрузка расчётного листа:"
                    width="100%"
                    height="100%"
                    controls={true}
                    className="embed-responsive-item"
                  />
                </div>
              </div>
            }
          </components.AccordionComponent>
          <components.AccordionComponent
            key_target={"accordion3"}
            isCollapse={false}
            title={"Выгрузка данных по отпуску:"}
            text_style="text-success"
            header_style="bg-success bg-opacity-10 custom-background-transparent-low"
            body_style="bg-light bg-opacity-10 custom-background-transparent-low"
          >
            {
              <div className="embed-responsive embed-responsive-16by9 custom-background-transparent-low">
                <div className="player-wrapper">
                  <ReactPlayer
                    url="static/study/vacation.mp4"
                    title="Выгрузка данных по отпуску:"
                    width="100%"
                    height="100%"
                    controls={true}
                    className="embed-responsive-item"
                  />
                </div>
              </div>
            }
          </components.AccordionComponent>
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
