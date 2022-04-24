"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationListPage = void 0;
var react_1 = require("react");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var component = require("../../components/component");
var constant = require("../../components/constant");
var hook = require("../../components/hook");
var util = require("../../components/util");
var base = require("../../components/ui/base");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var NotificationListPage = function () {
    // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////
    var NotificationReadListStore = hook.useSelectorCustom1(constant.NotificationReadListStore);
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<base.BaseComponent1>
      <component.StoreComponent storeStatus={constant.NotificationReadListStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      {NotificationReadListStore.data && (<table className="table table-sm table-hover table-borderless table-striped border border-1 border-dark shadow custom-background-transparent-middle m-0 p-0">
          <tbody className="text-center m-0 p-0">
            <tr className="border border-1 border-dark text-center bg-primary bg-opacity-10 m-0 p-0">
              <td className="fw-bold small m-0 p-1">дата и время</td>
              <td className="fw-bold small m-0 p-1">автор</td>
              <td className="fw-bold small m-0 p-1">название</td>
              <td className="fw-bold small m-0 p-1">место</td>
              <td className="fw-bold small m-0 p-1">описание</td>
              <td className="small m-0 p-1"/>
            </tr>
            {NotificationReadListStore.data.list.map(
            // @ts-ignore
            function (notification, index) {
                if (index === void 0) { index = 0; }
                return (<tr key={index} className="text-center bg-light bg-opacity-10 m-0 p-0">
                  <td className="small m-0 p-0">
                    {util.GetCleanDateTime(notification["created_datetime_field"], true)}
                  </td>
                  <td className="small m-0 p-0">
                    {notification["author_foreign_key_field"]["last_name_char_field"]}{" "}
                    {notification["author_foreign_key_field"]["first_name_char_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    {notification["name_char_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    {notification["place_char_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    {notification["description_text_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    <button type="button" className="btn btn-sm btn-outline-danger m-1 p-1">
                      скрыть
                    </button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>)}
    </base.BaseComponent1>);
};
exports.NotificationListPage = NotificationListPage;
