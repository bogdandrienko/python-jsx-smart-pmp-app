"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextStudyPage = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var base = require("../../components/ui/base");
var component = require("../../components/component");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var TextStudyPage = function () {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<base.BaseComponent1>
      <component.AccordionComponent key_target={"accordion1"} isCollapse={false} title={"Первый вход в систему:"} text_style="text-primary" header_style="bg-primary bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
        {<div className="text-center m-0 p-4">
            <li className="text-danger m-0 p-1">
              Для более полного понимания смотрите
              <react_router_dom_1.Link to={"/video_study"} className={"btn btn-sm btn-outline-primary m-1 p-2"}>
                {" "}
                видео инструкцию{" "}
              </react_router_dom_1.Link>
              !
            </li>
            <ol className="text-start m-0 p-0">
              <li className="m-0 p-1">
                Обновите Ваш браузер до последней доступной версии.
              </li>
              <li className="m-0 p-1">Войдите в систему</li>
              <li className="m-0 p-1">
                На верхней панели нажмите на кнопку "Войти"
              </li>
              <li className="m-0 p-1">
                Введите Ваш ИИН, пароль (первый временный пароль будет
                предоставлен при распечатке Вашего расчётного листа) и поставьте
                отметку "я не робот"
              </li>
              <li className="m-0 p-1">
                Попробуйте перейти в "Бухгалтерия" / "Сектор расчёта заработной
                платы" / "Выгрузка расчётного листа", Вас перенаправит на
                страницу замены пароля и ввода дополнительных данных(секретный
                вопрос и ответ, почта...), которые будут использованы для
                восстановления доступа.
              </li>
              <li className="m-0 p-1">
                После заполнения данных, нажмите "сохранить новые данные". Вас
                снова перенаправит на страницу входа, где нужно ввести уже новые
                данные.
              </li>
              <li className="m-0 p-1">
                После успешного входа, браузер может предложить Вам сохранить
                данные для входа. Также можете сохранить страницу в закладки,
                для быстрого доступа.
              </li>
            </ol>
          </div>}
      </component.AccordionComponent>
      <component.AccordionComponent key_target={"accordion2"} isCollapse={false} title={"Выгрузка расчётного листа:"} text_style="custom-color-warning-1" header_style="bg-warning bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
        {<div className="text-center m-0 p-4">
            <li className="text-danger m-0 p-1">
              Для более полного понимания смотрите
              <react_router_dom_1.Link to={"/video_study"} className={"btn btn-sm btn-outline-primary m-1 p-2"}>
                {" "}
                видео инструкцию{" "}
              </react_router_dom_1.Link>
              !
            </li>
            <ol className="text-start m-0 p-0">
              <li className="m-0 p-1">Войдите в систему</li>
              <li className="m-0 p-1">
                Перейдите в "Бухгалтерия" / "Сектор расчёта заработной платы" /
                "Выгрузка расчётного листа"
              </li>
              <li className="m-0 p-1">Выберите период и нажмите "получить"</li>
            </ol>
          </div>}
      </component.AccordionComponent>
      <component.AccordionComponent key_target={"accordion3"} isCollapse={false} title={"Выгрузка данных по отпуску:"} text_style="text-success" header_style="bg-success bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
        {<div className="text-center m-0 p-4">
            <li className="text-danger m-0 p-1">
              Для более полного понимания смотрите
              <react_router_dom_1.Link to={"/video_study"} className={"btn btn-sm btn-outline-primary m-1 p-2"}>
                {" "}
                видео инструкцию{" "}
              </react_router_dom_1.Link>
              !
            </li>
            <ol className="text-start m-0 p-0">
              <li className="m-0 p-1">Войдите в систему</li>
              <li className="m-0 p-1">
                Перейдите в "СУП" / "Отдел кадров" / "Выгрузка данных по
                отпуску"
              </li>
              <li className="m-0 p-1">
                Выберите период и нажмите "сформировать"
              </li>
            </ol>
          </div>}
      </component.AccordionComponent>
    </base.BaseComponent1>);
};
exports.TextStudyPage = TextStudyPage;
