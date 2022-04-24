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
exports.useFetchingCustom1 = exports.useObserverCustom1 = exports.useStateCustom1 = exports.useSelectorCustom1 = exports.usePosts = exports.useSortedPosts = exports.useObserver = exports.useFetching = exports.useAppSelector = exports.useAppDispatch = void 0;
var react_redux_1 = require("react-redux");
var react_1 = require("react");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
// Use throughout your app instead of plain `useDispatch` and `useSelector`
var useAppDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;
// @ts-ignore
var useFetching = function (callback, sort) {
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(false), error = _b[0], setError = _b[1];
    // @ts-ignore
    var fetching = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, callback.apply(void 0, args)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        // @ts-ignore
                        setError(error_1.message);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return [fetching, isLoading, error];
};
exports.useFetching = useFetching;
// @ts-ignore
var useObserver = function (ref, canLoad, isLoading, callback) {
    console.log("useObserver");
    var observer = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        if (isLoading)
            return;
        // @ts-ignore
        if (observer.current)
            observer.current.disconnect();
        // @ts-ignore
        var cb = function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        };
        // @ts-ignore
        observer.current = new IntersectionObserver(cb);
        // @ts-ignore
        observer.current.observe(ref.current);
    }, [isLoading]);
};
exports.useObserver = useObserver;
// @ts-ignore
var useSortedPosts = function (posts, sort) {
    var sortedPosts = (0, react_1.useMemo)(function () {
        if (sort) {
            return __spreadArray([], posts, true).sort(function (a, b) { return a[sort].localeCompare(b[sort]); });
        }
        return posts;
    }, [sort, posts]);
    return sortedPosts;
};
exports.useSortedPosts = useSortedPosts;
// @ts-ignore
var usePosts = function (posts, sort, query) {
    var sortedPosts = (0, exports.useSortedPosts)(posts, sort);
    var sortedAndSearchedPosts = (0, react_1.useMemo)(function () {
        // @ts-ignore
        return sortedPosts.filter(function (post) {
            return post.title.toLowerCase().includes(query);
        });
    }, [query, sortedPosts]);
    // @ts-ignore
    return sortedAndSearchedPosts;
};
exports.usePosts = usePosts;
// @ts-ignore
var useSelectorCustom1 = function (constant) {
    var storeConstant = constant.data.split("_")[0];
    // @ts-ignore
    return (0, react_redux_1.useSelector)(function (state) { return state[storeConstant]; });
};
exports.useSelectorCustom1 = useSelectorCustom1;
// @ts-ignore
var useStateCustom1 = function (initialState) {
    // @ts-ignore
    var _a = (0, react_1.useState)(__assign({}, initialState)), variable = _a[0], setVariable = _a[1];
    function setDefault() {
        // @ts-ignore
        setVariable(__assign({}, initialState));
    }
    return [variable, setVariable, setDefault];
};
exports.useStateCustom1 = useStateCustom1;
// @ts-ignore
var useObserverCustom1 = function (_a) {
    var 
    // @ts-ignore
    observeTargetUseRef = _a.observeTargetUseRef, _b = _a.canLoad, canLoad = _b === void 0 ? false : _b, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, 
    // @ts-ignore
    callbackIntersecting = _a.callbackIntersecting;
    console.log("useObserverCustom1", canLoad, isLoading);
    var observer = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        if (isLoading) {
            return undefined;
        }
        if (observer.current) {
            // @ts-ignore
            observer.current.disconnect();
        }
        // @ts-ignore
        observer.current = new IntersectionObserver(function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callbackIntersecting();
            }
        });
        // @ts-ignore
        observer.current.observe(observeTargetUseRef.current);
    }, [isLoading]);
};
exports.useObserverCustom1 = useObserverCustom1;
// @ts-ignore
var useFetchingCustom1 = function (callback) {
    var _a = (0, react_1.useState)(false), isFetchLoading = _a[0], setIsFetchLoading = _a[1];
    var _b = (0, react_1.useState)(false), fetchError = _b[0], setFetchError = _b[1];
    // @ts-ignore
    var fetchFunction = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsFetchLoading(true);
                        return [4 /*yield*/, callback.apply(void 0, args)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_2 = _a.sent();
                        // @ts-ignore
                        setFetchError(error_2.message);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsFetchLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return [fetchFunction, isFetchLoading, fetchError];
};
exports.useFetchingCustom1 = useFetchingCustom1;
