"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutPage = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var action = require("../../components/action");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var LogoutPage = function () {
    // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(function () {
        dispatch(action.User.UserLogoutAction());
    }, []);
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return <div>.</div>;
};
exports.LogoutPage = LogoutPage;
