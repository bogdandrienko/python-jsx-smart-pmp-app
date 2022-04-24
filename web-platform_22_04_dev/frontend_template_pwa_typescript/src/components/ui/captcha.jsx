"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Captcha1 = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var action = require("../action");
var component = require("../component");
var constant = require("../constant");
var hook = require("../hook");
var util = require("../util");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var Captcha1 = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var captchaCheckStore = hook.useSelectorCustom1(constant.captchaCheckStore);
    (0, react_1.useEffect)(function () {
        if (captchaCheckStore.data) {
            util.Delay(function () { return dispatch({ type: constant.captchaCheckStore.reset }); }, 30000);
        }
    }, [captchaCheckStore.data]);
    // @ts-ignore
    function Check(event) {
        event.preventDefault();
        event.stopPropagation();
        dispatch(action.Captcha.CheckAction(constant.captchaCheckStore));
    }
    return (<div className="card">
      {!captchaCheckStore.data && (<div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
          <i className="fa-solid fa-robot m-0 p-1 fw-bold lead"/>
          Пройдите проверку на робота!
        </div>)}
      {captchaCheckStore.data && (<div className="card-header bg-success bg-opacity-10 text-success m-0 p-1">
          <i className={"fa-solid fa-user-check m-0 p-1 fw-bold lead"}/>
          Вы успешно прошли проверку!
        </div>)}
      <component.StoreComponent storeStatus={constant.captchaCheckStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      {!captchaCheckStore.load && !captchaCheckStore.data && (<div className="card-body m-1 p-3" onClick={function (event) { return Check(event); }}>
          <i className="fa-solid fa-person btn btn-lg btn-outline-danger lead">
            <small className="m-1 p-3">я не робот!</small>
          </i>
        </div>)}
    </div>);
};
exports.Captcha1 = Captcha1;
