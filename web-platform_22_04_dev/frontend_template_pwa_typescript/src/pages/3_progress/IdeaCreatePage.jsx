"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
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
exports.IdeaCreatePage = void 0;
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
var IdeaCreatePage = function () {
    // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = hook.useStateCustom1({
        subdivision: "",
        sphere: "",
        category: "",
        avatar: null,
        name: "",
        place: "",
        description: "",
        moderate: "на модерации",
    }), idea = _a[0], setIdea = _a[1], resetIdea = _a[2];
    var _b = (0, react_1.useState)(false), isModalVisible = _b[0], setIsModalVisible = _b[1];
    var IdeaCreateStore = hook.useSelectorCustom1(constant.IdeaCreateStore);
    (0, react_1.useEffect)(function () {
        dispatch({ type: constant.IdeaCreateStore.reset });
    }, []);
    (0, react_1.useEffect)(function () {
        if (IdeaCreateStore.data) {
            util.Delay(function () {
                dispatch({ type: constant.IdeaCreateStore.reset });
            }, 7000);
        }
    }, [IdeaCreateStore.data]);
    console.log("IdeaCreateStore: ", IdeaCreateStore);
    // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////
    var CreateConfirm = function (create) {
        if (create === void 0) { create = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!create) return [3 /*break*/, 2];
                        return [4 /*yield*/, dispatch(action.Idea.IdeaCreateAction(constant.IdeaCreateStore, idea))];
                    case 1:
                        _a.sent();
                        resetIdea();
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
      <component.AccordionComponent key_target={"accordion1"} isCollapse={false} title={"Регламент подачи:"} text_style="custom-color-warning-1" header_style="bg-warning bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
        {<div className="text-center m-0 p-4">
            <ul className="text-start m-0 p-0">
              <li className="m-0 p-1">
                <h6 className="m-0 p-0">
                  Коллеги, будьте "реалистами" при отправке своей идеи:
                </h6>
                <small className="m-0 p-0">
                  Она должна быть реализуема, иметь какой-то положительный
                  эффект и, желательно, более конкретна!
                </small>
              </li>
            </ul>
          </div>}
      </component.AccordionComponent>
      <component.StoreComponent storeStatus={constant.IdeaCreateStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={true} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      <div className="">
        {!IdeaCreateStore.data && !IdeaCreateStore.load && (<ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form className="m-0 p-0" onSubmit={function (event) {
                event.preventDefault();
                setIsModalVisible(true);
            }}>
              <modal.ModalConfirm1 isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} description={"Отправить идею на модерацию?"} callback={CreateConfirm}/>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                  <h6 className="lead fw-bold m-0 p-0">Новая идея</h6>
                  <h6 className="lead m-0 p-0">
                    в общий банк идей предприятия
                  </h6>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Название идеи:
                      <input type="text" className="form-control form-control-sm text-center m-0 p-1" placeholder="введите название тут..." minLength={1} maxLength={300} value={idea.name} required onChange={function (event) {
                return setIdea(__assign(__assign({}, idea), { name: event.target.value.replace(util.GetRegexType({
                        numbers: true,
                        cyrillic: true,
                        space: true,
                        punctuationMarks: true,
                    }), "") }));
            }}/>
                      <small className="custom-color-warning-1 m-0 p-0">
                        * только кириллица
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 300 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Подразделение:
                      <select className="form-control form-control-sm text-center m-0 p-1" value={idea.subdivision} required onChange={function (event) {
                return setIdea(__assign(__assign({}, idea), { subdivision: event.target.value }));
            }}>
                        <option className="m-0 p-0" value="">
                          не указано
                        </option>
                        <option className="m-0 p-0" value="автотранспортное предприятие">
                          автотранспортное предприятие
                        </option>
                        <option className="m-0 p-0" value="горно-транспортный комплекс">
                          горно-транспортный комплекс
                        </option>
                        <option className="m-0 p-0" value="обогатительный комплекс">
                          обогатительный комплекс
                        </option>
                        <option className="m-0 p-0" value="управление предприятия">
                          управление предприятия
                        </option>
                        <option className="m-0 p-0" value="энергоуправление">
                          энергоуправление
                        </option>
                      </select>
                    </label>
                    <label className="w-50 form-control-sm m-0 p-1">
                      Место, где будет применена идея:
                      <input type="text" className="form-control form-control-sm text-center m-0 p-1" placeholder="введите место тут..." minLength={1} maxLength={300} value={idea.place} required onChange={function (event) {
                return setIdea(__assign(__assign({}, idea), { place: event.target.value.replace(util.GetRegexType({
                        numbers: true,
                        cyrillic: true,
                        space: true,
                        punctuationMarks: true,
                    }), "") }));
            }}/>
                      <small className="custom-color-warning-1 m-0 p-0">
                        * только кириллица
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 300 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Сфера:
                      <select className="form-control form-control-sm text-center m-0 p-1" value={idea.sphere} required onChange={function (event) {
                return setIdea(__assign(__assign({}, idea), { sphere: event.target.value }));
            }}>
                        <option className="m-0 p-0" value="">
                          не указано
                        </option>
                        <option className="m-0 p-0" value="технологическая">
                          технологическая
                        </option>
                        <option className="m-0 p-0" value="не технологическая">
                          не технологическая
                        </option>
                      </select>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Категория:
                      <select className="form-control form-control-sm text-center m-0 p-1" value={idea.category} required onChange={function (event) {
                return setIdea(__assign(__assign({}, idea), { category: event.target.value }));
            }}>
                        <option className="m-0 p-0" value="">
                          не указано
                        </option>
                        <option className="m-0 p-0" value="индустрия 4.0">
                          индустрия 4.0
                        </option>
                        <option className="m-0 p-0" value="инвестиции">
                          инвестиции
                        </option>
                        <option className="m-0 p-0" value="инновации">
                          инновации
                        </option>
                        <option className="m-0 p-0" value="модернизация">
                          модернизация
                        </option>
                        <option className="m-0 p-0" value="экология">
                          экология
                        </option>
                        <option className="m-0 p-0" value="спорт/культура">
                          спорт/культура
                        </option>
                        <option className="m-0 p-0" value="социальное/персонал">
                          социальное/персонал
                        </option>
                        <option className="m-0 p-0" value="другое">
                          другое
                        </option>
                      </select>
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Аватарка-заставка для идеи:
                      <input type="file" className="form-control form-control-sm text-center m-0 p-1" accept=".jpg, .png" onChange={function (event) {
                return setIdea(__assign(__assign({}, idea), { 
                    // @ts-ignore
                    avatar: event.target.files[0] }));
            }}/>
                      <small className="text-muted m-0 p-0">
                        * не обязательно
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <label className="w-100 form-control-sm m-0 p-1">
                      Описание идеи:
                      <textarea className="form-control form-control-sm text-center m-0 p-1" placeholder="введите описание тут..." minLength={1} maxLength={3000} rows={3} value={idea.description} required onChange={function (event) {
                return setIdea(__assign(__assign({}, idea), { description: event.target.value.replace(util.GetRegexType({
                        numbers: true,
                        cyrillic: true,
                        space: true,
                        punctuationMarks: true,
                    }), "") }));
            }}/>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 3000 символов
                      </small>
                    </label>
                  </div>
                </div>
                <div className="card-footer m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button className="btn btn-sm btn-primary m-1 p-2" type="submit">
                      <i className="fa-solid fa-circle-check m-0 p-1"/>
                      отправить данные
                    </button>
                    <button className="btn btn-sm btn-warning m-1 p-2" type="reset" onClick={function () { return resetIdea(); }}>
                      <i className="fa-solid fa-pen-nib m-0 p-1"/>
                      сбросить данные
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>)}
      </div>
    </base.BaseComponent1>);
};
exports.IdeaCreatePage = IdeaCreatePage;
