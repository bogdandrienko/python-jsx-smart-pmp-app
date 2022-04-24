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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaPage = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_1 = require("react-bootstrap");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var action = require("../../components/action");
var component = require("../../components/component");
var constant = require("../../components/constant");
var hook = require("../../components/hook");
var util = require("../../components/util");
var base = require("../../components/ui/base");
var modal = require("../../components/ui/modal");
var loader = require("../../components/ui/loader");
var select = require("../../components/ui/select");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var IdeaPage = function () {
    // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var id = (0, react_router_dom_1.useParams)().id;
    var _a = (0, react_1.useState)({}), modalForm = _a[0], setModalForm = _a[1];
    var _b = (0, react_1.useState)(false), isModalVisible = _b[0], setIsModalVisible = _b[1];
    var _c = (0, react_1.useState)(""), comment = _c[0], commentSet = _c[1];
    var IdeaReadStore = hook.useSelectorCustom1(constant.IdeaReadStore);
    var IdeaCommentReadListStore = hook.useSelectorCustom1(constant.IdeaCommentReadListStore);
    var IdeaCommentCreateStore = hook.useSelectorCustom1(constant.IdeaCommentCreateStore);
    var IdeaRatingReadListStore = hook.useSelectorCustom1(constant.IdeaRatingReadListStore);
    var IdeaRatingCreateStore = hook.useSelectorCustom1(constant.IdeaRatingCreateStore);
    (0, react_1.useEffect)(function () {
        dispatch(action.Idea.IdeaReadAction(constant.IdeaReadStore, id));
        // dispatch(
        //   action.IdeaComment.ReadListAction(
        //     constant.IdeaCommentReadListStore,
        //     id,
        //     page,
        //     limit
        //   )
        // );
        dispatch(action.IdeaRating.ReadListAction(constant.IdeaRatingReadListStore, id, 1, 5));
    }, [id]);
    (0, react_1.useEffect)(function () {
        if (!IdeaReadStore.data) {
            dispatch(action.Idea.IdeaReadAction(constant.IdeaReadStore, id));
        }
    }, [IdeaReadStore.data]);
    // useEffect(() => {
    //   dispatch({ type: constant.IdeaCommentReadListStore.reset });
    // }, [page]);
    // }
    // useEffect(() => {
    //   if (!IdeaCommentReadListStore.data) {
    //     dispatch(
    //       action.IdeaComment.ReadListAction(
    //         constant.IdeaCommentReadListStore,
    //         id,
    //         page,
    //         limit
    //       )
    //     );
    //   }
    // }, [IdeaCommentReadListStore.data]);
    (0, react_1.useEffect)(function () {
        if (!IdeaRatingReadListStore.data) {
            dispatch(action.IdeaRating.ReadListAction(constant.IdeaRatingReadListStore, id, 1, 100));
        }
    }, [IdeaRatingReadListStore.data]);
    (0, react_1.useEffect)(function () {
        if (IdeaCommentCreateStore.data) {
            dispatch({ type: constant.IdeaReadStore.reset });
            dispatch({ type: constant.IdeaCommentReadListStore.reset });
            dispatch({ type: constant.IdeaRatingReadListStore.reset });
            navigate("/idea/".concat(id));
            setPage(1);
            setComments([]);
            setTotalPages(0);
        }
    }, [IdeaCommentCreateStore.data]);
    (0, react_1.useEffect)(function () {
        if (IdeaRatingCreateStore.data) {
            dispatch({ type: constant.IdeaReadStore.reset });
            dispatch({ type: constant.IdeaCommentReadListStore.reset });
            dispatch({ type: constant.IdeaRatingReadListStore.reset });
            navigate("/idea/".concat(id));
            setPage(1);
            setComments([]);
            setTotalPages(0);
        }
    }, [IdeaRatingCreateStore.data]);
    // TODO test /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var _d = (0, react_1.useState)([]), comments = _d[0], setComments = _d[1];
    var _e = (0, react_1.useState)(0), totalPages = _e[0], setTotalPages = _e[1];
    var _f = (0, react_1.useState)(100), limit = _f[0], setLimit = _f[1];
    var _g = (0, react_1.useState)(1), page = _g[0], setPage = _g[1];
    var _h = hook.useFetchingCustom1(
    // @ts-ignore
    function (_a) {
        var id = _a.id, limit = _a.limit, page = _a.page;
        return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, action.IdeaComment.getAllComments({
                            id: id,
                            limit: limit,
                            page: page,
                        })];
                    case 1:
                        response = _b.sent();
                        setTotalPages(util.getPageCount(response["x-total-count"], limit));
                        // @ts-ignore
                        setComments(__spreadArray(__spreadArray([], comments, true), response.list, true));
                        return [2 /*return*/];
                }
            });
        });
    }), fetchFunction = _h[0], isFetchLoading = _h[1], fetchError = _h[2];
    (0, react_1.useEffect)(function () {
        // @ts-ignore
        fetchFunction({ id: id, limit: limit, page: page });
    }, [id, page]);
    (0, react_1.useEffect)(function () {
        // @ts-ignore
        setPage(1);
        setComments([]);
        setTotalPages(0);
    }, [limit]);
    var observeTargetUseRef = (0, react_1.useRef)();
    hook.useObserverCustom1({
        observeTargetUseRef: observeTargetUseRef,
        canLoad: page < totalPages,
        // @ts-ignore
        isLoading: isFetchLoading,
        callbackIntersecting: function () {
            setPage(page + 1);
        },
    });
    console.log("IdeaCommentReadListStore: ", IdeaCommentReadListStore);
    console.log("comments: ", comments);
    console.log("page: ", page);
    console.log("limit: ", limit);
    // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////
    // @ts-ignore
    var handlerCommentCreateSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                event.preventDefault();
            }
            catch (error) { }
            dispatch(action.IdeaComment.CreateAction(constant.IdeaCommentCreateStore, id, {
                comment: comment,
            }));
            commentSet("");
            return [2 /*return*/];
        });
    }); };
    // @ts-ignore
    var handlerRatingCreateSubmit = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var prompt_1;
        return __generator(this, function (_a) {
            if (value < 4) {
                prompt_1 = window.prompt("Введите причину низкой оценки?", "Мне не понравилась идея!");
                if (prompt_1) {
                    dispatch(action.IdeaRating.CreateAction(constant.IdeaRatingCreateStore, id, {
                        value: value,
                    }));
                    dispatch(action.IdeaComment.CreateAction(constant.IdeaCommentCreateStore, id, {
                        comment: prompt_1,
                    }));
                }
            }
            else {
                dispatch(action.IdeaRating.CreateAction(constant.IdeaRatingCreateStore, id, {
                    value: value,
                }));
            }
            return [2 /*return*/];
        });
    }); };
    // @ts-ignore
    var ShowNodal = function (event, form) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            event.preventDefault();
            setModalForm(form);
            setIsModalVisible(true);
            return [2 /*return*/];
        });
    }); };
    // @ts-ignore
    var CreateNotification = function (form) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!form) return [3 /*break*/, 2];
                    return [4 /*yield*/, dispatch(action.Notification.CreateAction(constant.NotificationCreateStore, __assign(__assign({}, form), { description: "".concat(form.description, ", \u043F\u0440\u0438\u0447\u0438\u043D\u0430:").concat(form.answer) })))];
                case 1:
                    _a.sent();
                    setIsModalVisible(false);
                    return [3 /*break*/, 3];
                case 2:
                    setIsModalVisible(false);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // @ts-ignore
    return (<base.BaseComponent1>
      <modal.ModalPrompt2 isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} callback={CreateNotification} 
    // @ts-ignore
    form={modalForm}/>
      <component.StoreComponent storeStatus={constant.NotificationCreateStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      <div className="btn-group text-start w-100 m-0 p-0">
        <react_router_dom_1.Link to={"/idea/list"} className="btn btn-sm btn-primary m-1 p-2">
          {"<="} назад к списку
        </react_router_dom_1.Link>
        {IdeaReadStore.data && (<button type="button" className="btn btn-sm btn-outline-danger m-1 p-2" onClick={function (event) {
                return ShowNodal(event, {
                    question: "Введите причину жалобы на идею?",
                    answer: "Идея неуместна!",
                    name: "жалоба на идею в банке идей",
                    place: "банк идей",
                    description: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0434\u0435\u0438: ".concat(IdeaReadStore.data["name_char_field"]),
                });
            }}>
            <i className="fa-solid fa-skull-crossbones m-0 p-1"/>
            жалоба на идею
          </button>)}
      </div>
      <component.StoreComponent storeStatus={constant.IdeaReadStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      <div className="m-0 p-0">
        {IdeaReadStore.data && !IdeaReadStore.load && (<div className="m-0 p-0">
            <div className="card shadow custom-background-transparent-low text-center p-0">
              <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                <h6 className="lead fw-bold m-0 p-0">
                  {IdeaReadStore.data["name_char_field"]}
                </h6>
              </div>
              <div className="card-body m-0 p-0">
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Подразделение:
                    <select className="form-control form-control-sm text-center m-0 p-1" required>
                      <option className="m-0 p-0" value="">
                        {IdeaReadStore.data["subdivision_char_field"]}
                      </option>
                    </select>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Сфера:
                    <select className="form-control form-control-sm text-center m-0 p-1" required>
                      <option className="m-0 p-0" value="">
                        {IdeaReadStore.data["sphere_char_field"]}
                      </option>
                    </select>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Категория:
                    <select className="form-control form-control-sm text-center m-0 p-1" required>
                      <option className="m-0 p-0" value="">
                        {IdeaReadStore.data["category_char_field"]}
                      </option>
                    </select>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <img src={IdeaReadStore.data["image_field"]
                ? util.GetStaticFile(IdeaReadStore.data["image_field"])
                : util.GetStaticFile("/media/default/idea/default_idea.jpg")} className="img-fluid img-thumbnail w-75 m-1 p-0" alt="изображение отсутствует"/>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center w-50 m-0 p-1">
                    Место изменения:
                    <input type="text" className="form-control form-control-sm text-center m-0 p-1" defaultValue={IdeaReadStore.data["place_char_field"]} readOnly={true} placeholder="введите место изменения тут..." required minLength={1} maxLength={300}/>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center w-100 m-0 p-1">
                    Описание:
                    <textarea className="form-control form-control-sm text-center m-0 p-1" defaultValue={IdeaReadStore.data["description_text_field"]} readOnly={true} required placeholder="введите описание тут..." minLength={1} maxLength={3000} rows={3}/>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <react_router_dom_1.Link to={"#"} className="btn btn-sm btn-warning m-0 p-2">
                    Автор:{" "}
                    {IdeaReadStore.data["user_model"]["last_name_char_field"]}{" "}
                    {IdeaReadStore.data["user_model"]["first_name_char_field"]}{" "}
                    {IdeaReadStore.data["user_model"]["position_char_field"]}
                  </react_router_dom_1.Link>
                </div>
                <div className="d-flex justify-content-between m-1 p-0">
                  <label className="text-muted border m-0 p-2">
                    подано:{" "}
                    <p className="m-0">
                      {util.GetCleanDateTime(IdeaReadStore.data["created_datetime_field"], true)}
                    </p>
                  </label>
                  <label className="text-muted border m-1 p-2">
                    зарегистрировано:{" "}
                    <p className="m-0 p-0">
                      {util.GetCleanDateTime(IdeaReadStore.data["register_datetime_field"], true)}
                    </p>
                  </label>
                </div>
              </div>
              <component.StoreComponent storeStatus={constant.IdeaRatingCreateStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
              <div className="card-footer m-0 p-1">
                <div className="d-flex justify-content-between m-0 p-1">
                  <span className={IdeaReadStore.data["ratings"]["total_rate"] > 7
                ? "text-success m-0 p-1"
                : IdeaReadStore.data["ratings"]["total_rate"] > 4
                    ? "custom-color-warning-1 m-0 p-1"
                    : "text-danger m-0 p-1"}>
                    Рейтинг
                  </span>
                  <react_bootstrap_1.Navbar className="text-center m-0 p-0">
                    <react_bootstrap_1.Container className="m-0 p-0">
                      <react_bootstrap_1.Nav className="me-auto dropdown m-0 p-0">
                        <react_bootstrap_1.NavDropdown title={util.GetSliceString(IdeaReadStore.data["ratings"]["total_rate"], 3, false) +
                " /  " +
                IdeaReadStore.data["ratings"]["count"]} className={IdeaReadStore.data["ratings"]["total_rate"] > 7
                ? IdeaReadStore.data["ratings"]["count"] > 0
                    ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                    : "btn btn-sm bg-success bg-opacity-50 badge rounded-pill disabled"
                : IdeaReadStore.data["ratings"]["total_rate"] > 4
                    ? IdeaReadStore.data["ratings"]["count"] > 0
                        ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                        : "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill disabled"
                    : IdeaReadStore.data["ratings"]["count"] > 0
                        ? "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                        : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill disabled"}>
                          <ul className="m-0 p-0">
                            <component.StoreComponent storeStatus={constant.IdeaRatingReadListStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
                            {IdeaRatingReadListStore.data &&
                IdeaRatingReadListStore.data.list.length > 0 &&
                IdeaRatingReadListStore.data["list"].map(
                // @ts-ignore
                function (rate, index) { return (<li key={index} className={rate["rating_integer_field"] > 7
                        ? "list-group-item bg-success bg-opacity-10"
                        : rate["rating_integer_field"] > 4
                            ? "list-group-item bg-warning bg-opacity-10"
                            : "list-group-item bg-danger bg-opacity-10"}>
                                    <small className="">
                                      {"".concat(rate["user_model"]["last_name_char_field"], " \n                                    ").concat(rate["user_model"]["first_name_char_field"], " : \n                                    ").concat(rate["rating_integer_field"])}
                                    </small>
                                  </li>); })}
                          </ul>
                        </react_bootstrap_1.NavDropdown>
                      </react_bootstrap_1.Nav>
                    </react_bootstrap_1.Container>
                  </react_bootstrap_1.Navbar>
                  <span className="m-0 p-1">
                    <div className="m-0 p-0">
                      Нажмите на одну из 10 звезд для оценки идеи:
                    </div>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 1
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 0.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(1); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 2
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 1.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(2); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 3
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 2.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(3); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 4
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 3.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(4); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 5
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 4.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(5); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 6
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 5.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(6); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 7
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 6.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(7); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 8
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 7.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(8); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 9
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 8.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(9); }}/>
                    <i style={{
                color: IdeaReadStore.data["ratings"]["self_rate"] > 7
                    ? "#00ff00"
                    : IdeaReadStore.data["ratings"]["self_rate"] > 4
                        ? "#ffaa00"
                        : "#ff0000",
            }} className={IdeaReadStore.data["ratings"]["self_rate"] >= 10
                ? "btn fas fa-star m-0 p-0"
                : IdeaReadStore.data["ratings"]["self_rate"] >= 9.5
                    ? "btn fas fa-star-half-alt m-0 p-0"
                    : "btn far fa-star m-0 p-0"} onClick={function () { return handlerRatingCreateSubmit(10); }}/>
                    <div className="m-0 p-0">Ваша оценка</div>
                  </span>
                </div>
                <div className="d-flex justify-content-between m-0 p-1">
                  <span className="text-secondary m-0 p-1">Комментарии</span>
                  <i className="fa-solid fa-comment m-0 p-1">
                    {" "}
                    {IdeaReadStore.data["comments"]["count"]}
                  </i>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <div className="card m-0 p-2">
                  <div className="order-md-last m-0 p-0">
                    <div className="m-0 p-0 my-2">
                      <component.StoreComponent storeStatus={constant.IdeaCommentCreateStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
                      <form className="card" onSubmit={handlerCommentCreateSubmit}>
                        <div className="input-group">
                          <input type="text" className="form-control form-control-sm text-center m-0 p-1" value={comment} required placeholder="введите комментарий тут..." minLength={1} maxLength={300} onChange={function (e) {
                return commentSet(e.target.value.replace(util.GetRegexType({
                    numbers: true,
                    cyrillic: true,
                    space: true,
                    punctuationMarks: true,
                }), ""));
            }}/>
                          <button type="submit" className="btn btn-secondary">
                            <i className="fa-solid fa-circle-check m-0 p-1"/>
                            отправить
                          </button>
                          {!isFetchLoading && (<select.Select1 value={limit} onChange={setLimit} options={[
                    {
                        value: "3",
                        name: "подгружать по 3",
                    },
                    {
                        value: "6",
                        name: "подгружать по 6",
                    },
                    {
                        value: "12",
                        name: "подгружать по 12",
                    },
                    {
                        value: "100",
                        name: "подгружать по 100",
                    },
                ]} useDefaultSelect={false} defaultSelect={{
                    value: "".concat(limit),
                    name: "количество комментариев",
                }}/>)}
                        </div>
                      </form>
                    </div>
                    {comments.length < 1 ? (<div className="my-1">
                        <component.MessageComponent variant={"warning"}>
                          Комментарии не найдены!
                        </component.MessageComponent>
                      </div>) : (<ul className="list-group m-0 p-0">
                        <component.StoreComponent storeStatus={constant.NotificationCreateStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
                        {comments.map(function (object, index) { return (<li className="list-group-item m-0 p-1" key={index}>
                            <div className="d-flex justify-content-between m-0 p-0">
                              <h6 className="btn btn-sm btn-outline-warning m-0 p-2">
                                {object["user_model"]["last_name_char_field"]}{" "}
                                {object["user_model"]["first_name_char_field"]}
                              </h6>
                              <span className="text-muted m-0 p-0">
                                {util.GetCleanDateTime(object["created_datetime_field"], true)}
                                <button type="button" className="btn btn-sm btn-outline-danger m-1 p-0" onClick={function (event) {
                        return ShowNodal(event, {
                            question: "Введите причину жалобы на комментарий?",
                            answer: "Не цензурная лексика!",
                            name: "жалоба на комментарий в банке идей",
                            place: "банк идей",
                            description: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0434\u0435\u0438: ".concat(IdeaReadStore.data["name_char_field"], " (").concat(IdeaReadStore.data["user_model"]["last_name_char_field"], " ").concat(IdeaReadStore.data["user_model"]["first_name_char_field"], "), \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439: ").concat(util.GetCleanDateTime(object["created_datetime_field"], true), " (").concat(object["user_model"]["last_name_char_field"], " ").concat(object["user_model"]["first_name_char_field"], ")"),
                        });
                    }}>
                                  <i className="fa-solid fa-skull-crossbones m-0 p-1"/>
                                  жалоба на комментарий
                                </button>
                              </span>
                            </div>
                            <div className="d-flex justify-content-center m-0 p-1">
                              <small className="text-muted m-0 p-1">
                                {object["comment_text_field"]}
                              </small>
                            </div>
                          </li>); })}
                      </ul>)}
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        <div 
    // @ts-ignore
    ref={observeTargetUseRef} style={{
            height: 1,
            background: "black",
            margin: 0,
            padding: 0,
        }}/>
        {isFetchLoading && (
        // @ts-ignore
        <loader.Loader1>
            <h5>LOADING...</h5>
          </loader.Loader1>)}
        <component.StoreComponent storeStatus={constant.IdeaCommentReadListStore} consoleLog={constant.DEBUG_CONSTANT} showLoad={true} loadText={""} showData={false} dataText={""} showError={true} errorText={""} showFail={true} failText={""}/>
      </div>
    </base.BaseComponent1>);
};
exports.IdeaPage = IdeaPage;
