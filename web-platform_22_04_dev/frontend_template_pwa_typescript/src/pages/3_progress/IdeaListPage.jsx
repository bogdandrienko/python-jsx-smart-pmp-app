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
exports.IdeaListPage = void 0;
var react_1 = require("react");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var base_1 = require("../../components/ui/base");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var constant = require("../../components/constant");
var action = require("../../components/action");
var util = require("../../components/util");
var component = require("../../components/component");
var paginator = require("../../components/ui/paginator");
var hook = require("../../components/hook");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var IdeaListPage = function () {
    // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = hook.useStateCustom1({
        sort: "дате публикации (свежие в начале)",
        query: "",
        search: "",
        subdivision: "",
        sphere: "",
        category: "",
        author: "",
        name: "",
        place: "",
        description: "",
        moderate: "принято",
        detailView: true,
    }), filter = _a[0], setFilter = _a[1], resetFilter = _a[2];
    var IdeaReadListStore = hook.useSelectorCustom1(constant.IdeaReadListStore);
    var UserReadListStore = hook.useSelectorCustom1(constant.UserReadListStore);
    var _b = (0, react_1.useState)(1), page = _b[0], setPage = _b[1];
    var _c = (0, react_1.useState)(9), limit = _c[0], setLimit = _c[1];
    (0, react_1.useEffect)(function () {
        dispatch({ type: constant.UserReadListStore.reset });
    }, []);
    (0, react_1.useEffect)(function () {
        dispatch({ type: constant.IdeaReadListStore.reset });
    }, [page]);
    (0, react_1.useEffect)(function () {
        setPage(1);
        dispatch({ type: constant.IdeaReadListStore.reset });
    }, [limit]);
    (0, react_1.useEffect)(function () {
        if (!IdeaReadListStore.data) {
            dispatch(action.Idea.IdeaReadListAction(constant.IdeaReadListStore, page, limit));
        }
    }, [IdeaReadListStore.data]);
    (0, react_1.useEffect)(function () {
        if (!UserReadListStore.data) {
            dispatch(action.Users.UserReadListAction(constant.UserReadListStore, page, limit));
        }
    }, [UserReadListStore.data]);
    // @ts-ignore
    var handlerSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                event.preventDefault();
            }
            catch (error) { }
            setPage(1);
            dispatch({ type: constant.IdeaReadListStore.reset });
            return [2 /*return*/];
        });
    }); };
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<base_1.BaseComponent1>
      <component.AccordionComponent key_target={"accordion1"} isCollapse={true} title={<span>
            <i className="fa-solid fa-filter"/> Фильтрация, поиск и сортировка:
          </span>} text_style="text-success" header_style="bg-success bg-opacity-10 custom-background-transparent-low" body_style="bg-light bg-opacity-10 custom-background-transparent-low">
        {<ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
            <form className="m-0 p-0" onSubmit={handlerSubmit}>
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <label className="lead m-0 p-1">
                    <i className="fa-solid fa-filter"/> Выберите нужные
                    настройки фильтрации и сортировки, затем нажмите кнопку{" "}
                    <p className="fw-bold text-primary m-0 p-0">
                      "фильтровать"
                    </p>
                  </label>
                  <label className="form-control-sm form-switch text-center m-0 p-1">
                    Детальное отображение:
                    <input type="checkbox" className="form-check-input m-0 p-1" id="flexSwitchCheckDefault" value={filter.detailView} onChange={function () {
                return setFilter(__assign(__assign({}, filter), { detailView: !filter.detailView }));
            }}/>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Количество идей на странице:
                    <select className="form-control form-control-sm text-center m-0 p-1" value={limit} 
        // @ts-ignore
        onChange={function (event) { return setLimit(event.target.value); }}>
                      <option disabled defaultValue={""} value="">
                        количество на странице
                      </option>
                      <option value="9">9</option>
                      <option value="18">18</option>
                      <option value="36">36</option>
                      <option value="-1">все</option>
                    </select>
                  </label>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Подразделение:
                      <select className="form-control form-control-sm text-center m-0 p-1" value={filter.subdivision} onChange={function (e) {
                return setFilter(__assign(__assign({}, filter), { subdivision: e.target.value }));
            }}>
                        <option className="m-0 p-0" value="">
                          все варианты
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
                    <label className="form-control-sm text-center m-0 p-1">
                      Сфера:
                      <select className="form-control form-control-sm text-center m-0 p-1" value={filter.sphere} onChange={function (e) {
                return setFilter(__assign(__assign({}, filter), { sphere: e.target.value }));
            }}>
                        <option className="m-0 p-0" value="">
                          все варианты
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
                      <select className="form-control form-control-sm text-center m-0 p-1" value={filter.category} onChange={function (e) {
                return setFilter(__assign(__assign({}, filter), { category: e.target.value }));
            }}>
                        <option className="m-0 p-0" value="">
                          все варианты
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
                    {UserReadListStore.data && (<label className="form-control-sm text-center m-0 p-1">
                        Автор:
                        <select className="form-control form-control-sm text-center m-0 p-1" value={filter.author} onChange={function (e) {
                    return setFilter(__assign(__assign({}, filter), { author: e.target.value }));
                }}>
                          <option className="m-0 p-0" value="">
                            все варианты
                          </option>
                          {UserReadListStore.data.list.map(function (user, index) {
                    if (user === void 0) { user = ""; }
                    if (index === void 0) { index = 0; }
                    return (<option key={index} value={user} className="m-0 p-0">
                                {user}
                              </option>);
                })}
                        </select>
                      </label>)}
                  </div>
                  <component.StoreComponent storeStatus={constant.UserReadListStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Поле поиска по части названия:
                      <input type="text" className="form-control form-control-sm text-center m-0 p-1" placeholder="введите часть названия тут..." value={filter.search} onChange={function (e) {
                return setFilter(__assign(__assign({}, filter), { author: e.target.value.replace(util.GetRegexType({
                        numbers: true,
                        cyrillic: true,
                        space: true,
                        punctuationMarks: true,
                    }), "") }));
            }}/>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Сортировка по:
                      <select className="form-control form-control-sm text-center m-0 p-1" value={filter.sort} onChange={function (e) {
                return setFilter(__assign(__assign({}, filter), { sort: e.target.value }));
            }}>
                        <option value="дате публикации (свежие в начале)">
                          дате публикации (свежие в начале)
                        </option>
                        <option value="дате публикации (свежие в конце)">
                          дате публикации (свежие в конце)
                        </option>
                        <option value="названию (с начала алфавита)">
                          названию (с начала алфавита)
                        </option>
                        <option value="названию (с конца алфавита)">
                          названию (с конца алфавита
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="card-footer m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button className="btn btn-sm btn-primary m-1 p-2" type="submit">
                      <i className="fa-solid fa-circle-check m-0 p-1"/>
                      фильтровать идеи
                    </button>
                    <button className="btn btn-sm btn-warning m-1 p-2" type="reset" onClick={function () { return resetFilter(); }}>
                      <i className="fa-solid fa-pen-nib m-0 p-1"/>
                      сбросить фильтры
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>}
      </component.AccordionComponent>
      {!IdeaReadListStore.load && IdeaReadListStore.data && (<paginator.Pagination1 totalObjects={IdeaReadListStore.data["x-total-count"]} limit={limit} page={page} changePage={setPage}/>)}
      <component.StoreComponent storeStatus={constant.IdeaReadListStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      {IdeaReadListStore.data && (<div>
          {IdeaReadListStore.data.list ? (<div>
              <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
                {IdeaReadListStore.data.list.map(
                // @ts-ignore
                function (idea, index) { return (<div key={index} className="col-sm-12 col-md-6 col-lg-4 m-0 p-1">
                      <div className="m-0 p-0">
                        <div className="card shadow custom-background-transparent-low m-0 p-0">
                          <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                            <react_router_dom_1.Link to={"/idea/".concat(idea.id)} className="text-decoration-none text-dark m-0 p-0">
                              <h6 className="lead fw-bold m-0 p-0">
                                {util.GetSliceString(idea["name_char_field"], 50)}
                              </h6>
                            </react_router_dom_1.Link>
                          </div>
                          <div className="card-body m-0 p-0">
                            <div className="m-0 p-0">
                              <label className="form-control-sm text-center m-0 p-1">
                                Подразделение:
                                <select className="form-control form-control-sm text-center m-0 p-1" required>
                                  <option className="m-0 p-0" value="">
                                    {idea["subdivision_char_field"]}
                                  </option>
                                </select>
                              </label>
                              <label className="form-control-sm text-center m-0 p-1">
                                Сфера:
                                <select className="form-control form-control-sm text-center m-0 p-1" required>
                                  <option className="m-0 p-0" value="">
                                    {idea["sphere_char_field"]}
                                  </option>
                                </select>
                              </label>
                              <label className="form-control-sm text-center m-0 p-1">
                                Категория:
                                <select className="form-control form-control-sm text-center m-0 p-1" required>
                                  <option className="m-0 p-0" value="">
                                    {idea["category_char_field"]}
                                  </option>
                                </select>
                              </label>
                            </div>
                            <div className="m-0 p-0">
                              <img src={idea["image_field"]
                        ? util.GetStaticFile(idea["image_field"])
                        : util.GetStaticFile("/media/default/idea/default_idea.jpg")} className="img-fluid img-thumbnail w-50 m-1 p-0" alt="изображение отсутствует"/>
                            </div>
                            <div className="m-0 p-0">
                              <label className="form-control-sm text-center w-50 m-0 p-1">
                                Место изменения:
                                <input type="text" className="form-control form-control-sm text-center m-0 p-1" defaultValue={util.GetSliceString(idea["place_char_field"], 50)} readOnly={true} placeholder="введите место изменения тут..." required minLength={1} maxLength={300}/>
                              </label>
                            </div>
                            <div className="m-0 p-0">
                              <label className="form-control-sm text-center w-100 m-0 p-1">
                                Описание:
                                <textarea className="form-control form-control-sm text-center m-0 p-1" defaultValue={util.GetSliceString(idea["description_text_field"], 100)} readOnly={true} required placeholder="введите описание тут..." minLength={1} maxLength={3000} rows={3}/>
                              </label>
                            </div>
                            <div className="m-0 p-0">
                              <div className="btn btn-sm btn-warning m-0 p-2">
                                Автор:{" "}
                                {idea["user_model"]["last_name_char_field"] &&
                        idea["user_model"]["last_name_char_field"]}{" "}
                                {idea["user_model"]["first_name_char_field"]}{" "}
                                {idea["user_model"]["position_char_field"]}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between m-1 p-0">
                              <label className="text-muted border m-0 p-2">
                                подано:{" "}
                                <p className="m-0">
                                  {util.GetCleanDateTime(idea["created_datetime_field"], true)}
                                </p>
                              </label>
                              <label className="text-muted border m-1 p-2">
                                зарегистрировано:{" "}
                                <p className="m-0 p-0">
                                  {util.GetCleanDateTime(idea["register_datetime_field"], true)}
                                </p>
                              </label>
                            </div>
                          </div>
                          <div className="card-footer m-0 p-1">
                            <div className="d-flex justify-content-between m-0 p-1">
                              <span className={idea["ratings"]["total_rate"] > 7
                        ? "text-success m-0 p-1"
                        : idea["ratings"]["total_rate"] > 4
                            ? "custom-color-warning-1 m-0 p-1"
                            : "text-danger m-0 p-1"}>
                                Рейтинг
                              </span>
                              <div className="m-0 p-1">
                                <span className={idea["ratings"]["total_rate"] > 7
                        ? "btn btn-sm bg-success disabled bg-opacity-50 badge rounded-pill text-dark lead fw-bold m-0 p-2"
                        : idea["ratings"]["total_rate"] > 4
                            ? "btn btn-sm bg-warning disabled bg-opacity-50 badge rounded-pill text-dark lead fw-bold m-0 p-2"
                            : "btn btn-sm bg-danger disabled bg-opacity-50 badge rounded-pill text-dark lead fw-bold m-0 p-2"}>
                                  {"".concat(idea["ratings"]["total_rate"], "  / ").concat(idea["ratings"]["count"])}
                                </span>
                              </div>
                              <span className="m-0 p-1">
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 1
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 0.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 2
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 1.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 3
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 2.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 4
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 3.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 5
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 4.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 6
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 5.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 7
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 6.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 8
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 7.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 9
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 8.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <i style={{
                        color: idea["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : idea["ratings"]["self_rate"] > 4
                                ? "#ffaa00"
                                : "#ff0000",
                    }} className={idea["ratings"]["self_rate"] >= 10
                        ? "fas fa-star m-0 p-0"
                        : idea["ratings"]["self_rate"] >= 9.5
                            ? "fas fa-star-half-alt m-0 p-0"
                            : "far fa-star m-0 p-0"}/>
                                <div className="m-0 p-0">Ваша оценка</div>
                              </span>
                            </div>
                            <div className="d-flex justify-content-between m-0 p-1">
                              <span className="text-secondary m-0 p-1">
                                Комментарии
                              </span>
                              <i className="fa-solid fa-comment m-0 p-1">
                                {" "}
                                {idea["comments"]["count"]}
                              </i>
                            </div>
                          </div>
                          <div className="m-0 p-0">
                            <react_router_dom_1.Link className="btn btn-sm btn-primary w-100 m-0 p-1" to={"/idea/".concat(idea.id)}>
                              подробнее
                            </react_router_dom_1.Link>
                          </div>
                        </div>
                      </div>
                    </div>); })}
              </ul>
            </div>) : (<h1>Idea not found!</h1>)}
        </div>)}
      {!IdeaReadListStore.load && IdeaReadListStore.data && (<paginator.Pagination1 totalObjects={IdeaReadListStore.data["x-total-count"]} limit={limit} page={page} changePage={setPage}/>)}
    </base_1.BaseComponent1>);
};
exports.IdeaListPage = IdeaListPage;
