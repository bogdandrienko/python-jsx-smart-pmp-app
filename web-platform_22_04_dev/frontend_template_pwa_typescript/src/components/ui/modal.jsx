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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalPrompt2 = exports.ModalConfirm1 = exports.Modal1 = void 0;
var react_1 = require("react");
var util = require("../util");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
// @ts-ignore
var Modal1 = function (_a) {
    var children = _a.children, visible = _a.visible, setVisible = _a.setVisible;
    var rootClasses = ["custom_modal_1"];
    if (visible) {
        rootClasses.push("custom_modal_1_active");
    }
    return (<div className={rootClasses.join(" ")} onClick={function () { return setVisible(false); }}>
      <div className={"custom_modal_content_1"} onClick={function (e) { return e.stopPropagation(); }}>
        {children}
      </div>
    </div>);
};
exports.Modal1 = Modal1;
var ModalConfirm1 = function (_a) {
    var _b = _a.isModalVisible, isModalVisible = _b === void 0 ? false : _b, 
    // @ts-ignore
    setIsModalVisible = _a.setIsModalVisible, _c = _a.description, description = _c === void 0 ? "Подтвердить действие?" : _c, 
    // @ts-ignore
    callback = _a.callback;
    return (<div className={isModalVisible
            ? "custom_modal_1 custom_modal_1_active"
            : "custom_modal_1"} onClick={function () { return callback(false); }}>
      <div className={"custom_modal_content_1"} onClick={function (event) { return event.stopPropagation(); }}>
        {description && <h2>{description}</h2>}
        <button type="button" onClick={function (event) { return callback(true); }} className="btn btn-lg btn-outline-success m-1 p-2">
          подтвердить
        </button>
        <button type="button" onClick={function (event) { return callback(false); }} className="btn btn-lg btn-outline-secondary m-1 p-2">
          отмена
        </button>
      </div>
    </div>);
};
exports.ModalConfirm1 = ModalConfirm1;
var ModalPrompt2 = function (_a) {
    var _b = _a.isModalVisible, isModalVisible = _b === void 0 ? false : _b, 
    // @ts-ignore
    setIsModalVisible = _a.setIsModalVisible, _c = _a.form, form = _c === void 0 ? {
        question: "Введите причину?",
        answer: "Нарушение норм приличия!",
    } : _c, 
    // @ts-ignore
    callback = _a.callback;
    var _d = (0, react_1.useState)(form.answer), answ = _d[0], setAnsw = _d[1];
    (0, react_1.useEffect)(function () {
        setAnsw(form.answer);
    }, [form]);
    // @ts-ignore
    var returnCallback = function (event) {
        event.preventDefault();
        setIsModalVisible(false);
        callback(__assign(__assign({}, form), { answer: answ }));
        setAnsw("Нарушение норм приличия!");
    };
    // @ts-ignore
    var cancelCallback = function (event) {
        event.preventDefault();
        setIsModalVisible(false);
        callback(false);
        setAnsw("Нарушение норм приличия!");
    };
    return (<div className={isModalVisible
            ? "custom_modal_1 custom_modal_1_active"
            : "custom_modal_1"} onClick={function (event) { return cancelCallback(event); }}>
      <div className={"custom_modal_content_1"} onClick={function (event) { return event.stopPropagation(); }}>
        {form.question && <h2>{form.question}</h2>}
        <input type="text" className="form-control form-control-sm text-center m-0 p-1" placeholder="введите название тут..." minLength={1} maxLength={100} value={answ} required onChange={function (event) {
            return setAnsw(event.target.value.replace(util.GetRegexType({
                numbers: true,
                cyrillic: true,
                space: true,
                punctuationMarks: true,
            }), ""));
        }}/>
        <button type="button" onClick={function (event) { return returnCallback(event); }} className="btn btn-lg btn-outline-success m-1 p-2">
          подтвердить
        </button>
        <button type="button" onClick={function (event) { return cancelCallback(event); }} className="btn btn-lg btn-outline-secondary m-1 p-2">
          отмена
        </button>
      </div>
    </div>);
};
exports.ModalPrompt2 = ModalPrompt2;
