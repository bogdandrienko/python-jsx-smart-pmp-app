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
exports.Services = exports.userLogoutAction = exports.Captcha = exports.User = exports.Users = exports.Notification = exports.IdeaRating = exports.IdeaComment = exports.Idea = exports.Post = void 0;
var axios_1 = require("axios");
var constant = require("./constant");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var Post = /** @class */ (function () {
    function Post() {
    }
    // @ts-ignore
    Post.PostCreateAction = function (constant, post) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.post("/api/post/", post)];
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
                                payload: error_1,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Post.PostReadListAction = function (constant, page, limit) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/post/", {
                                    params: {
                                        page: page,
                                        limit: limit,
                                    },
                                })];
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
                            error_2 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_2,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Post.PostReadAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/post/".concat(id, "/"))];
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
                            error_3 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_3,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Post.PostDeleteAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.delete("/api/post/".concat(id, "/"))];
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
                            error_4 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_4,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return Post;
}());
exports.Post = Post;
var Idea = /** @class */ (function () {
    function Idea() {
    }
    // @ts-ignore
    Idea.IdeaCreateAction = function (constant, post) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var formData_1, data, response, response, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            formData_1 = new FormData();
                            Object.entries(post).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                // @ts-ignore
                                formData_1.append(key, value);
                            });
                            return [4 /*yield*/, axios_1.default.post("/api/idea/", formData_1, {
                                    headers: {
                                        "content-type": "multipart/form-data",
                                    },
                                })];
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
                            error_5 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_5,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Idea.IdeaReadListAction = function (constant, page, limit) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/idea/", {
                                    params: {
                                        page: page,
                                        limit: limit,
                                    },
                                })];
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
                            error_6 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_6,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Idea.IdeaReadAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/"))];
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
                            error_7 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_7,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Idea.IdeaDeleteAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.delete("/api/idea/".concat(id, "/"))];
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
                            error_8 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_8,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return Idea;
}());
exports.Idea = Idea;
var IdeaComment = /** @class */ (function () {
    function IdeaComment() {
    }
    // @ts-ignore
    IdeaComment.CreateAction = function (constant, id, form) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var formData_2, data, response, response, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            formData_2 = new FormData();
                            Object.entries(form).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                // @ts-ignore
                                formData_2.append(key, value);
                            });
                            return [4 /*yield*/, axios_1.default.post("/api/idea/".concat(id, "/comment/"), formData_2, {
                                    headers: {
                                        "content-type": "multipart/form-data",
                                    },
                                })];
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
                            error_9 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_9,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    IdeaComment.ReadListAction = function (constant, id, page, limit) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/comment/"), {
                                    params: {
                                        page: page,
                                        limit: limit,
                                    },
                                })];
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
                            error_10 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_10,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    IdeaComment.getAllComments = function (_a) {
        var id = _a.id, limit = _a.limit, page = _a.page;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/comment/"), {
                            params: {
                                limit: limit,
                                page: page,
                            },
                        })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response.data.response];
                }
            });
        });
    };
    // @ts-ignore
    IdeaComment.ReadAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/"))];
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
                            error_11 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_11,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    IdeaComment.DeleteAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.delete("/api/idea/".concat(id, "/"))];
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
                            error_12 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_12,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return IdeaComment;
}());
exports.IdeaComment = IdeaComment;
var IdeaRating = /** @class */ (function () {
    function IdeaRating() {
    }
    // @ts-ignore
    IdeaRating.CreateAction = function (constant, id, form) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var formData_3, data, response, response, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            formData_3 = new FormData();
                            Object.entries(form).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                // @ts-ignore
                                formData_3.append(key, value);
                            });
                            return [4 /*yield*/, axios_1.default.post("/api/idea/".concat(id, "/rating/"), formData_3, {
                                    headers: {
                                        "content-type": "multipart/form-data",
                                    },
                                })];
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
                            error_13 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_13,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    IdeaRating.ReadListAction = function (constant, id, page, limit) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/rating/"), {
                                    params: {
                                        page: page,
                                        limit: limit,
                                    },
                                })];
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
                            error_14 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_14,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    IdeaRating.ReadAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/"))];
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
                            error_15 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_15,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    IdeaRating.DeleteAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.delete("/api/idea/".concat(id, "/"))];
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
                            error_16 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_16,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return IdeaRating;
}());
exports.IdeaRating = IdeaRating;
var Notification = /** @class */ (function () {
    function Notification() {
    }
    // @ts-ignore
    Notification.CreateAction = function (constant, form) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var formData_4, data, response, response, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            formData_4 = new FormData();
                            Object.entries(form).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                // @ts-ignore
                                formData_4.append(key, value);
                            });
                            return [4 /*yield*/, axios_1.default.post("/api/notification/", formData_4, {
                                    headers: {
                                        "content-type": "multipart/form-data",
                                    },
                                })];
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
                            error_17 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_17,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Notification.ReadListAction = function (constant, page, limit) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/notification/", {
                                    params: {
                                        page: page,
                                        limit: limit,
                                    },
                                })];
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
                            error_18 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_18,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Notification.ReadAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/"))];
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
                            error_19 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_19,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    Notification.DeleteAction = function (constant, id) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.delete("/api/idea/".concat(id, "/"))];
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
                            error_20 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_20,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return Notification;
}());
exports.Notification = Notification;
var Users = /** @class */ (function () {
    function Users() {
    }
    // @ts-ignore
    Users.UserReadListAction = function (constant, page, limit) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_21;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/user/")];
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
                            error_21 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_21,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return Users;
}());
exports.Users = Users;
var User = /** @class */ (function () {
    function User() {
    }
    // @ts-ignore
    User.UserLoginAction = function (constant, username, password) {
        if (username === void 0) { username = ""; }
        if (password === void 0) { password = ""; }
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_22;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/user/login/?username=".concat(username, "&password=").concat(password))];
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
                            error_22 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_22,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    User.UserLogoutAction = function () {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        localStorage.removeItem("userToken");
                        // @ts-ignore
                        dispatch({ type: constant.userLoginStore.reset });
                        dispatch({ type: constant.userDetailStore.reset });
                        dispatch({ type: constant.userChangeStore.reset });
                    }
                    catch (error) {
                        console.log(error);
                    }
                    return [2 /*return*/];
                });
            });
        };
    };
    // @ts-ignore
    User.ChangeAction = function (constant, form) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var formData_5, userLoginStore, data, response, response, error_23;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            formData_5 = new FormData();
                            userLoginStore = getState().userLoginStore;
                            Object.entries(form).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                // @ts-ignore
                                formData_5.append(key, value);
                            });
                            return [4 /*yield*/, axios_1.default.post("/api/user/password/change/", formData_5, {
                                    headers: {
                                        "content-type": "multipart/form-data",
                                        Authorization: "Bearer ".concat(userLoginStore.data.token),
                                    },
                                })];
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
                            error_23 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_23,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    // @ts-ignore
    User.UserDetailAction = function (constant) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var userLoginStore, data, response, response, error_24;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            userLoginStore = getState().userLoginStore;
                            return [4 /*yield*/, axios_1.default.get("/api/user/detail/", {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                        Authorization: "Bearer ".concat(userLoginStore.data.token),
                                    },
                                })];
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
                            error_24 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_24,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return User;
}());
exports.User = User;
var Captcha = /** @class */ (function () {
    function Captcha() {
    }
    // @ts-ignore
    Captcha.CheckAction = function (constant) {
        // @ts-ignore
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response, response, error_25;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            dispatch({
                                type: constant.load,
                            });
                            return [4 /*yield*/, axios_1.default.get("/api/captcha/")];
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
                            error_25 = _a.sent();
                            dispatch({
                                type: constant.fail,
                                payload: error_25,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return Captcha;
}());
exports.Captcha = Captcha;
// @ts-ignore
var userLogoutAction = function () { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        localStorage.removeItem("userToken");
        // @ts-ignore
        dispatch({ type: constant.PostReadListStore.reset });
        dispatch({ type: constant.PostReadStore.reset });
        return [2 /*return*/];
    });
}); }; };
exports.userLogoutAction = userLogoutAction;
var Services = /** @class */ (function () {
    function Services() {
    }
    Services.getAll = function (limit, page) {
        if (limit === void 0) { limit = 10; }
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/api/any/post/", {
                            params: {
                                page: page,
                                limit: limit,
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        // const response = await axios.get("/api/post/", {
                        //   params: {
                        //     page: page,
                        //     limit: limit,
                        //   },
                        // });
                        console.log("getAll: ", response.data);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Services.getAllComments = function (id, limit, page) {
        if (id === void 0) { id = 1; }
        if (limit === void 0) { limit = 10; }
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/api/idea/".concat(id, "/comment/"), {
                            params: {
                                limit: limit,
                                page: page,
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.response];
                }
            });
        });
    };
    // @ts-ignore
    Services.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/api/post/".concat(id, "/"))];
                    case 1:
                        response = _a.sent();
                        console.log("getById: ", response.data);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // @ts-ignore
    Services.getCommentById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/api/any/post/".concat(id, "/comments/"))];
                    case 1:
                        response = _a.sent();
                        console.log("getCommentById: ", response.data);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // @ts-ignore
    Services.createPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post("/api/post/", post)];
                    case 1:
                        response = _a.sent();
                        console.log("createPost: ", response.data);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // @ts-ignore
    Services.removePost = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.delete("/api/post/".concat(id, "/"))];
                    case 1:
                        response = _a.sent();
                        console.log("createPost: ", response.data);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return Services;
}());
exports.Services = Services;
