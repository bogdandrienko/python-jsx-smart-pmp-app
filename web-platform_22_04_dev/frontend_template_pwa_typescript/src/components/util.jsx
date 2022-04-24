"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
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
exports.CheckPageAccess = exports.CheckAccess = exports.GetInfoPage = exports.GetRoutes = exports.GetPagesArray = exports.Sleep = exports.Delay = exports.GetRegexType = exports.ChangePasswordVisibility = exports.ChangeAccordionCollapse = exports.GetCleanDateTime = exports.GetStaticFile = exports.GetSliceString = exports.getPagesArray = exports.getPageCount = exports.StoreReducerConstructorUtility = exports.ConstantConstructorUtility = exports.ActionsFailUtility = exports.AxiosConfigConstructorUtility = exports.ReducerConstructorUtility = exports.ActionConstructorUtility = void 0;
var axios_1 = require("axios");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var action = require("./action");
var constant = require("./constant");
var router = require("./router");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO constructors ///////////////////////////////////////////////////////////////////////////////////////////////////
function ActionConstructorUtility(
// @ts-ignore
form, 
// @ts-ignore
url, 
// @ts-ignore
method, 
// @ts-ignore
timeout, 
// @ts-ignore
constant, auth) {
    if (auth === void 0) { auth = true; }
    // @ts-ignore
    return function (dispatch, getState) {
        return __awaiter(this, void 0, void 0, function () {
            var config, formData_1, userLogin, data, response, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dispatch({
                            type: constant.load,
                        });
                        config = {};
                        formData_1 = new FormData();
                        Object.entries(form).map(function (_a) {
                            var key = _a[0], value = _a[1];
                            // @ts-ignore
                            formData_1.append(key, value);
                        });
                        if (auth) {
                            userLogin = getState().userLoginStore.data;
                            if (userLogin !== null) {
                                config = {
                                    url: url,
                                    method: method,
                                    timeout: timeout,
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                        Authorization: "Bearer ".concat(userLogin.token),
                                    },
                                    data: formData_1,
                                };
                            }
                        }
                        else {
                            config = {
                                url: url,
                                method: method,
                                timeout: timeout,
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                                data: formData_1,
                            };
                        }
                        return [4 /*yield*/, (0, axios_1.default)(config)];
                    case 1:
                        data = (_a.sent()).data;
                        if (data.response) {
                            response = data.response;
                            dispatch({
                                type: constant.data,
                                payload: response,
                            });
                        }
                        else {
                            response = data.error;
                            dispatch({
                                type: constant.error,
                                payload: response,
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        dispatch({
                            type: constant.fail,
                            payload: (0, exports.ActionsFailUtility)({ dispatch: dispatch, error: error_1 }),
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
exports.ActionConstructorUtility = ActionConstructorUtility;
// @ts-ignore
function ReducerConstructorUtility(_a) {
    var load = _a.load, data = _a.data, error = _a.error, fail = _a.fail, reset = _a.reset;
    try {
        return function (state, action) {
            if (state === void 0) { state = {}; }
            if (action === void 0) { action = null; }
            // @ts-ignore
            switch (action.type) {
                case load:
                    return { load: true };
                case data:
                    return {
                        load: false,
                        // @ts-ignore
                        data: action.payload,
                    };
                case error:
                    return {
                        load: false,
                        // @ts-ignore
                        error: action.payload,
                    };
                case fail:
                    // @ts-ignore
                    return { load: false, fail: action.payload };
                case reset:
                    return {};
                default:
                    return state;
            }
        };
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log("ReducerConstructorUtility: ", error);
        }
    }
}
exports.ReducerConstructorUtility = ReducerConstructorUtility;
var AxiosConfigConstructorUtility = function (_a) {
    var _b = _a.url, url = _b === void 0 ? "" : _b, _c = _a.method, method = _c === void 0 ? "GET" : _c, _d = _a.timeout, timeout = _d === void 0 ? 10000 : _d, 
    // @ts-ignore
    form = _a.form, _e = _a.getState, getState = _e === void 0 ? null : _e;
    try {
        var formData_2 = new FormData();
        Object.entries(form).map(function (_a) {
            var key = _a[0], value = _a[1];
            // @ts-ignore
            formData_2.append(key, value);
        });
        if (getState) {
            var userLogin = getState().userLoginStore.data;
            if (userLogin !== null) {
                var config_1 = {
                    url: url,
                    method: method,
                    timeout: timeout,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer ".concat(userLogin.token),
                    },
                    data: formData_2,
                };
                return { config: config_1 };
            }
        }
        var config = {
            url: url,
            method: method,
            timeout: timeout,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData_2,
        };
        return { config: config };
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log("ActionsFormDataUtilityError: ".concat(url, " ").concat(form["Action-type"]), error);
        }
    }
};
exports.AxiosConfigConstructorUtility = AxiosConfigConstructorUtility;
// @ts-ignore
var ActionsFailUtility = function (_a) {
    var dispatch = _a.dispatch, error = _a.error;
    try {
        if (constant.DEBUG_CONSTANT) {
            console.log("fail: ", error);
        }
        if (error) {
            var status_1 = error.response.status
                ? error.response.status
                : error.response.message
                    ? error.response.message
                    : error.response.data.detail;
            if (status_1 && "".concat(status_1, "___________").slice(0, 7) === "timeout") {
                status_1 = "timeout";
            }
            switch (status_1) {
                case 401:
                    dispatch(action.userLogoutAction());
                    return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
                case 413:
                    return "Ваш файл слишком большой! Измените его размер и перезагрузите страницу перед отправкой.";
                case 500:
                    dispatch(action.userLogoutAction());
                    return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
                case "timeout":
                    return "Превышено время ожидания! Попробуйте повторить действие или ожидайте исправления.";
                default:
                    return "Неизвестная ошибка! Обратитесь к администратору.";
            }
        }
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log("ActionsFailUtilityError: ", error);
        }
    }
};
exports.ActionsFailUtility = ActionsFailUtility;
function ConstantConstructorUtility(name) {
    if (name === void 0) { name = ""; }
    return {
        load: name + "_LOAD_CONSTANT",
        data: name + "_DATA_CONSTANT",
        error: name + "_ERROR_CONSTANT",
        fail: name + "_FAIL_CONSTANT",
        reset: name + "_RESET_CONSTANT",
    };
}
exports.ConstantConstructorUtility = ConstantConstructorUtility;
// @ts-ignore
function StoreReducerConstructorUtility(name, callback) {
    if (name === void 0) { name = ""; }
    var store = ConstantConstructorUtility(name);
    callback(name, ReducerConstructorUtility(store));
    return store;
}
exports.StoreReducerConstructorUtility = StoreReducerConstructorUtility;
// TODO custom /////////////////////////////////////////////////////////////////////////////////////////////////////////
// @ts-ignore
var getPageCount = function (totalCount, limit) {
    return Math.ceil(totalCount / limit);
};
exports.getPageCount = getPageCount;
// @ts-ignore
var getPagesArray = function (totalPages) {
    var result = [];
    for (var i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    return result;
};
exports.getPagesArray = getPagesArray;
var GetSliceString = function (string, length, withDots) {
    if (string === void 0) { string = ""; }
    if (length === void 0) { length = 30; }
    if (withDots === void 0) { withDots = true; }
    try {
        if (string == null || string === "null") {
            return "";
        }
        if ("".concat(string).length >= length) {
            if (withDots) {
                return "".concat(string).slice(0, length) + "...";
            }
            else {
                return "".concat(string).slice(0, length);
            }
        }
        else {
            return string;
        }
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return "";
    }
};
exports.GetSliceString = GetSliceString;
var GetStaticFile = function (path) {
    if (path === void 0) { path = ""; }
    try {
        if (path === "null" || path === "/media/null" || path == null) {
            return "";
        }
        return "/static".concat(path);
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return "";
    }
};
exports.GetStaticFile = GetStaticFile;
// @ts-ignore
var GetCleanDateTime = function (dateTime, withTime) {
    if (withTime === void 0) { withTime = true; }
    try {
        var date = dateTime.split("T")[0];
        var time = dateTime.split("T")[1].slice(0, 5);
        if (withTime) {
            return "".concat(date, " ").concat(time);
        }
        else {
            return "".concat(date);
        }
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return "";
    }
};
exports.GetCleanDateTime = GetCleanDateTime;
var ChangeAccordionCollapse = function (objects) {
    if (objects === void 0) { objects = [""]; }
    try {
        objects.forEach(function (object, index, array) {
            var obj = document.getElementById(object);
            var classname = 
            // @ts-ignore
            obj.getAttribute("class") === "accordion-collapse collapse m-0 p-0"
                ? "accordion-collapse m-0 p-0"
                : "accordion-collapse collapse m-0 p-0";
            // @ts-ignore
            obj.setAttribute("class", classname);
        });
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return null;
    }
};
exports.ChangeAccordionCollapse = ChangeAccordionCollapse;
var ChangePasswordVisibility = function (objects) {
    if (objects === void 0) { objects = [""]; }
    try {
        objects.forEach(function (object, index, array) {
            var obj = document.getElementById(object);
            var type = 
            // @ts-ignore
            obj.getAttribute("type") === "password" ? "text" : "password";
            // @ts-ignore
            obj.setAttribute("type", type);
        });
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return null;
    }
};
exports.ChangePasswordVisibility = ChangePasswordVisibility;
var GetRegexType = function (_a) {
    var _b = _a.numbers, numbers = _b === void 0 ? false : _b, _c = _a.latin, latin = _c === void 0 ? false : _c, _d = _a.cyrillic, cyrillic = _d === void 0 ? false : _d, _e = _a.onlyLowerLetters, onlyLowerLetters = _e === void 0 ? false : _e, _f = _a.lowerSpace, lowerSpace = _f === void 0 ? false : _f, _g = _a.space, space = _g === void 0 ? false : _g, _h = _a.punctuationMarks, punctuationMarks = _h === void 0 ? false : _h, _j = _a.email, email = _j === void 0 ? false : _j;
    try {
        var regex = "";
        if (numbers) {
            regex = regex + "0-9";
        }
        if (latin) {
            if (onlyLowerLetters) {
                regex = regex + "a-z";
            }
            else {
                regex = regex + "A-Za-z";
            }
        }
        if (cyrillic) {
            if (onlyLowerLetters) {
                regex = regex + "а-яё";
            }
            else {
                regex = regex + "А-ЯЁа-яё";
            }
        }
        if (lowerSpace) {
            regex = regex + "_";
        }
        if (space) {
            regex = regex + " ";
        }
        if (punctuationMarks) {
            regex = regex + "-:;.,!?_";
        }
        if (email) {
            regex = regex + "@.";
        }
        return new RegExp("[^".concat(regex, "]"), "g");
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return new RegExp("[^_]", "g");
    }
};
exports.GetRegexType = GetRegexType;
// @ts-ignore
var Delay = function (callbackAfterDelay, time) {
    if (time === void 0) { time = 1000; }
    try {
        new Promise(function (resolve) { return setTimeout(resolve, time); }).then(function () {
            callbackAfterDelay();
        });
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return null;
    }
};
exports.Delay = Delay;
var Sleep = function (time) {
    if (time === void 0) { time = 1000; }
    try {
        return new Promise(function (resolve) { return setTimeout(resolve, time); });
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return null;
    }
};
exports.Sleep = Sleep;
var GetPagesArray = function (totalCount, limit) {
    if (totalCount === void 0) { totalCount = 0; }
    if (limit === void 0) { limit = 1; }
    try {
        var page = Math.ceil(totalCount / limit);
        var result = [];
        if (totalCount) {
            for (var i = 0; i < page; i++) {
                result.push(i + 1);
            }
        }
        return result;
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return [];
    }
};
exports.GetPagesArray = GetPagesArray;
var GetRoutes = function (privateRoute) {
    if (privateRoute === void 0) { privateRoute = true; }
    try {
        // @ts-ignore
        var routes_1 = [];
        // @ts-ignore
        router.modules.map(function (module) {
            // @ts-ignore
            return module.Sections.map(function (section) {
                // @ts-ignore
                return section.Links.map(function (link) {
                    if (privateRoute) {
                        // @ts-ignore
                        if (link.private === true) {
                            routes_1.push({ path: link.path, element: link.element });
                        }
                        else {
                            // @ts-ignore
                            if (link.private === "both") {
                                routes_1.push({ path: link.path, element: link.element });
                            }
                        }
                    }
                    else {
                        // @ts-ignore
                        if (link.private === false) {
                            routes_1.push({ path: link.path, element: link.element });
                        }
                        else {
                            // @ts-ignore
                            if (link.private === "both") {
                                routes_1.push({ path: link.path, element: link.element });
                            }
                        }
                    }
                });
            });
        });
        // @ts-ignore
        return routes_1;
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return [];
    }
};
exports.GetRoutes = GetRoutes;
// @ts-ignore
var GetInfoPage = function (path) {
    for (var _i = 0, _a = router.modules; _i < _a.length; _i++) {
        var module_1 = _a[_i];
        for (var _b = 0, _c = module_1.Sections; _b < _c.length; _b++) {
            var section = _c[_b];
            for (var _d = 0, _e = section.Links; _d < _e.length; _d++) {
                var link = _e[_d];
                if (link.Link.split("/").includes(":id")) {
                    if (link.Link.split("/")
                        .slice(0, -1)
                        .every(function (v, i) { return v === path.split("/").slice(0, -1)[i]; })) {
                        return {
                            title: link.Title,
                            description: link.Description,
                            access: link.Access,
                        };
                    }
                }
                else {
                    if (link.Link === path) {
                        return {
                            title: link.Title,
                            description: link.Description,
                            access: link.Access,
                        };
                    }
                }
            }
        }
    }
    return {
        title: "Страница",
        description: "страница веб платформы",
        access: ["null"],
    };
};
exports.GetInfoPage = GetInfoPage;
// @ts-ignore
var CheckAccess = function (userDetailStore, slug) {
    try {
        if (slug === "all" || slug.includes("all")) {
            return true;
        }
        if (userDetailStore.data && userDetailStore.data["group_model"]) {
            if (userDetailStore.data["group_model"].includes("superuser")) {
                return true;
            }
            if (typeof slug === "string") {
                return userDetailStore.data["group_model"].includes(slug);
            }
            else {
                for (var _i = 0, slug_1 = slug; _i < slug_1.length; _i++) {
                    var object = slug_1[_i];
                    if (userDetailStore.data["group_model"].includes(object)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    catch (error) {
        if (constant.DEBUG_CONSTANT) {
            console.log(error);
        }
        return false;
    }
};
exports.CheckAccess = CheckAccess;
// @ts-ignore
var CheckPageAccess = function (userGroups, pageAccess) {
    for (var _i = 0, pageAccess_1 = pageAccess; _i < pageAccess_1.length; _i++) {
        var access = pageAccess_1[_i];
        if (userGroups.includes(access)) {
            return true;
        }
    }
    return false;
};
exports.CheckPageAccess = CheckPageAccess;
