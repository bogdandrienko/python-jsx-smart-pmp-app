"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeProfilePage = void 0;
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
var react_1 = require("react");
var react_redux_1 = require("react-redux");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var action = require("../../components/action");
var component = require("../../components/component");
var constant = require("../../components/constant");
var hook = require("../../components/hook");
var util = require("../../components/util");
var base = require("../../components/ui/base");
var modal = require("../../components/ui/modal");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var ChangeProfilePage = function () {
    // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
    var dispatch = (0, react_redux_1.useDispatch)();
    // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
    var _a = hook.useStateCustom1({
        secretQuestion: "",
        secretAnswer: "",
        email: "",
        avatar: null,
        password: "",
        password2: "",
    }), user = _a[0], setUser = _a[1], resetUser = _a[2];
    console.log("user: ", user);
    var _b = (0, react_1.useState)(false), isModalVisible = _b[0], setIsModalVisible = _b[1];
    // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
    var userDetailStore = hook.useSelectorCustom1(constant.userDetailStore);
    var userChangeStore = hook.useSelectorCustom1(constant.userChangeStore);
    // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
    (0, react_1.useEffect)(function () {
        if (userDetailStore.data && userDetailStore.data["user_model"]) {
            setUser(__assign(__assign({}, user), { secretQuestion: userDetailStore.data["user_model"]["secret_question_char_field"], secretAnswer: userDetailStore.data["user_model"]["secret_answer_char_field"], email: userDetailStore.data["user_model"]["email_field"], password: userDetailStore.data["user_model"]["password_slug_field"], password2: userDetailStore.data["user_model"]["password_slug_field"] }));
        }
    }, [userDetailStore.data]);
    //////////////////////////////////////////////////////////
    (0, react_1.useEffect)(function () {
        if (userChangeStore.data) {
            util.Delay(function () {
                dispatch(action.User.UserLogoutAction());
            }, 10);
        }
    }, [userChangeStore.data]);
    // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
    var CreateConfirm = function (create) {
        if (create === void 0) { create = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!create) return [3 /*break*/, 2];
                        return [4 /*yield*/, dispatch(action.User.ChangeAction(constant.userChangeStore, user))];
                    case 1:
                        _a.sent();
                        resetUser();
                        setIsModalVisible(false);
                        return [3 /*break*/, 3];
                    case 2:
                        setIsModalVisible(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<base.BaseComponent1>
      <component.StoreComponent storeStatus={constant.userDetailStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <form className="m-0 p-0" onSubmit={function (event) {
            event.preventDefault();
            setIsModalVisible(true);
        }}>
          <modal.ModalConfirm1 isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} description={"Заменить данные на новые?"} callback={CreateConfirm}/>
          <div className="card shadow custom-background-transparent-low m-0 p-0">
            <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
              Внимание, без правильного заполнения обязательных данных Вас будет
              перенаправлять на эту страницу постоянно!
            </div>
            <div className="card-header m-0 p-0">
              <component.StoreComponent storeStatus={constant.userChangeStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={true} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
            </div>
            <div className="card-body m-0 p-0">
              <div className="m-0 p-1">
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-question-circle m-0 p-1"/>
                  Введите секретный вопрос для восстановления доступа:
                  <input type="text" className="form-control form-control-sm text-center m-0 p-1" placeholder="введите секретный вопрос тут..." required value={user.secretQuestion} onChange={function (event) {
            return setUser(__assign(__assign({}, user), { secretQuestion: event.target.value.replace(util.GetRegexType({
                    numbers: true,
                    cyrillic: true,
                    space: true,
                }), "") }));
        }} minLength={3} maxLength={32}/>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только кириллица
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 3 до 32 символов
                    </small>
                  </small>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-message m-0 p-1"/>
                  Введите ответ на секретный вопрос:
                  <input type="text" className="form-control form-control-sm text-center m-0 p-1" placeholder="введите секретный ответ тут..." required value={user.secretAnswer} onChange={function (event) {
            return setUser(__assign(__assign({}, user), { secretAnswer: event.target.value.replace(util.GetRegexType({
                    numbers: true,
                    cyrillic: true,
                    space: true,
                }), "") }));
        }} minLength={3} maxLength={32}/>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только кириллица
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 3 до 32 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-1">
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-envelope m-0 p-1"/>
                  Почта для восстановления доступа :
                  <input type="email" className="form-control form-control-sm text-center m-0 p-1" placeholder="введите почту тут..." value={user.email} onChange={function (event) {
            return setUser(__assign(__assign({}, user), { email: event.target.value.replace(util.GetRegexType({
                    numbers: true,
                    latin: true,
                    lowerSpace: true,
                    email: true,
                }), "") }));
        }} minLength={1} maxLength={300} autoComplete="off"/>
                  <small className="text-muted m-0 p-0">
                    * не обязательно
                    <small className="custom-color-warning-1 m-0 p-0">
                      {" "}
                      * только латиница
                    </small>
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не более 300 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-1">
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-key m-0 p-1"/>
                  Введите пароль для входа в аккаунт:
                  <div className="input-group form-control-sm m-0 p-1">
                    <input type="password" className="form-control form-control-sm text-center m-0 p-1" id="password" placeholder="введите новый пароль тут..." required value={user.password} onChange={function (event) {
            return setUser(__assign(__assign({}, user), { password: event.target.value.replace(util.GetRegexType({
                    numbers: true,
                    latin: true,
                    lowerSpace: true,
                }), "") }));
        }} minLength={8} maxLength={16} autoComplete="current-password"/>
                    <span className="">
                      <i className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3" onClick={function () {
            return util.ChangePasswordVisibility(["password"]);
        }}/>
                    </span>
                  </div>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только латиница
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 8 до 16 символов
                    </small>
                  </small>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-key m-0 p-1"/>
                  Повторите новый пароль:
                  <div className="input-group form-control-sm m-0 p-1">
                    <input type="password" className="form-control form-control-sm text-center m-0 p-1" id="password2" placeholder="введите новый пароль тут..." required value={user.password2} onChange={function (event) {
            return setUser(__assign(__assign({}, user), { password2: event.target.value.replace(util.GetRegexType({
                    numbers: true,
                    latin: true,
                    lowerSpace: true,
                }), "") }));
        }} minLength={8} maxLength={16} autoComplete="current-password"/>
                    <span className="">
                      <i className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3" onClick={function () {
            return util.ChangePasswordVisibility(["password2"]);
        }}/>
                    </span>
                  </div>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только латиница
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 8 до 16 символов
                    </small>
                  </small>
                </label>
              </div>
            </div>
            <div className="card-footer m-0 p-0">
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <button className="btn btn-sm btn-primary m-1 p-2" type="submit">
                  <i className="fa-solid fa-circle-check m-0 p-1"/>
                  сохранить новые данные
                </button>
                <button className="btn btn-sm btn-warning m-1 p-2" type="reset" onClick={function () { return resetUser(); }}>
                  <i className="fa-solid fa-pen-nib m-0 p-1"/>
                  сбросить данные
                </button>
              </ul>
            </div>
          </div>
        </form>
      </ul>
    </base.BaseComponent1>);
};
exports.ChangeProfilePage = ChangeProfilePage;
