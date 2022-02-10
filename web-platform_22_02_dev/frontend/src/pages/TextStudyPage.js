import React from "react";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TextStudyPage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Текстовые инструкции"}
        second={
          "страница с текстовыми инструкциями по функционалу веб-платформы."
        }
        logic={false}
      />
      <main className="container text-center">
        <div className="row">
          <div className="col">
            <small className="lead fw-bold">Первый вход в систему:</small>
            <div className="embed-responsive embed-responsive-16by9">
              <p className="lead text-danger">Первый вход в систему.</p>
            </div>
          </div>
          <div className="col">
            <small className="lead fw-bold">Выгрузка расчётного листа:</small>
            <div className="embed-responsive embed-responsive-16by9">
              <p className="lead text-danger">Выгрузка расчётного листа.</p>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default TextStudyPage;
