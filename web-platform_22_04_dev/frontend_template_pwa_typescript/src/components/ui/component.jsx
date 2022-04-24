"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TestComponent4 = exports.TestComponent3 = exports.TestComponent2 = exports.TestComponent1 = exports.PostFilter = exports.PostForm = exports.PostList = exports.PostItem = void 0;
var react_1 = require("react");
var react_transition_group_1 = require("react-transition-group");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("./button");
var input_1 = require("./input");
var select_1 = require("./select");
// @ts-ignore
var PostItem = function (props) {
    var navigate = (0, react_router_dom_1.useNavigate)();
    // @ts-ignore
    var deletePost = function (e) {
        e.stopPropagation();
        props.remove(props.post);
    };
    return (<div className="post" onClick={function () { return navigate("/posts/" + props.post.id); }}>
      <div className="post__content">
        <h5>{props.post.name}</h5>
        <strong>{props.post.place}</strong>
        <div>{props.post.body}</div>
        <div>{props.post.sphere}</div>
        <div className="post__btns">
          <button_1.Button1 onClick={deletePost}>delete</button_1.Button1>
        </div>
      </div>
    </div>);
};
exports.PostItem = PostItem;
// @ts-ignore
var PostList = function (_a) {
    var posts = _a.posts, title = _a.title, remove = _a.remove;
    if (!posts.length) {
        return <h1 style={{ textAlign: "center" }}>Post not found!</h1>;
    }
    return (<div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <react_transition_group_1.TransitionGroup className="post-list">
        {posts.map(
        // @ts-ignore
        function (post, index) { return (<react_transition_group_1.CSSTransition key={post.id} timeout={500} classNames="post">
              <exports.PostItem remove={remove} number={index + 1} post={post}/>
            </react_transition_group_1.CSSTransition>); })}
      </react_transition_group_1.TransitionGroup>
    </div>);
};
exports.PostList = PostList;
// @ts-ignore
var PostForm = function (_a) {
    var create = _a.create;
    var _b = (0, react_1.useState)({
        name: "",
        place: "",
        sphere: "",
    }), post = _b[0], setPost = _b[1];
    // @ts-ignore
    var addNewPost = function (e) {
        e.preventDefault();
        var newPost = __assign(__assign({}, post), { id: Date.now() });
        create(newPost);
        setPost({
            name: "",
            place: "",
            sphere: "",
        });
    };
    return (<form>
      <h5>Create post</h5>
      <input_1.Input1 
    // @ts-ignore
    value={post.name} 
    // @ts-ignore
    onChange={function (e) { return setPost(__assign(__assign({}, post), { name: e.target.value })); }} type="text" placeholder="Title..."/>
      <input_1.Input1 
    // @ts-ignore
    value={post.place} 
    // @ts-ignore
    onChange={function (e) { return setPost(__assign(__assign({}, post), { place: e.target.value })); }} type="text" placeholder="Body..."/>
      <input_1.Input1 
    // @ts-ignore
    value={post.sphere} 
    // @ts-ignore
    onChange={function (e) { return setPost(__assign(__assign({}, post), { sphere: e.target.value })); }} type="text" placeholder="Body..."/>
      <button_1.Button1 onClick={addNewPost}>create</button_1.Button1>
    </form>);
};
exports.PostForm = PostForm;
// @ts-ignore
var PostFilter = function (_a) {
    var filter = _a.filter, setFilter = _a.setFilter;
    return (<div>
      <input_1.Input1 
    // @ts-ignore
    value={filter.query} 
    // @ts-ignore
    onChange={function (e) { return setFilter(__assign(__assign({}, filter), { query: e.target.value })); }} placeholder="Поиск..."/>
      <select_1.Select2 value={filter.sort} 
    // @ts-ignore
    onChange={function (selectedSort) {
            return setFilter(__assign(__assign({}, filter), { sort: selectedSort }));
        }} defaultValue={"sort By"} options={[
            { value: "title", name: "by Name" },
            { value: "body", name: "by Description" },
        ]}/>
    </div>);
};
exports.PostFilter = PostFilter;
var TestComponent1 = function () {
    // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
    var _a = (0, react_1.useState)(0), count = _a[0], countSet = _a[1];
    var _b = (0, react_1.useState)(1), value = _b[0], valueSet = _b[1];
    function plus() {
        countSet(count + value);
    }
    function minus() {
        countSet(count - value);
    }
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<div className="card text-center m-0 p-0">
      <div className="card-header text-center m-0 p-0">
        <h6 className="lead fw-bold text-center m-0 p-0">{count}</h6>
      </div>
      <div className="card-body text-center m-0 p-0">
        <div className="d-flex justify-content-between text-center m-0 p-0">
          <button onClick={plus} className="btn btn-lg w-25 btn-outline-success m-1 p-1">
            +
          </button>
          <input type="number" className="form-control form-control-sm text-center m-1 p-1" value={value} required placeholder="пример: 70%" min="-100" max="100" onChange={function (e) { return valueSet(parseInt(e.target.value)); }}/>
          <button onClick={minus} className="btn btn-lg w-25 btn-outline-danger m-1 p-1">
            -
          </button>
        </div>
      </div>
    </div>);
};
exports.TestComponent1 = TestComponent1;
var TestComponent2 = /** @class */ (function (_super) {
    __extends(TestComponent2, _super);
    // @ts-ignore
    function TestComponent2(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            count: 2,
            value: 1,
        };
        _this.plus = _this.plus.bind(_this);
        _this.minus = _this.minus.bind(_this);
        _this.setValue = _this.setValue.bind(_this);
        return _this;
    }
    TestComponent2.prototype.plus = function () {
        this.setState({
            // @ts-ignore
            count: this.state.count + this.state.value,
        });
    };
    TestComponent2.prototype.minus = function () {
        this.setState({
            // @ts-ignore
            count: this.state.count - this.state.value,
        });
    };
    // @ts-ignore
    TestComponent2.prototype.setValue = function (value) {
        this.setState({
            value: value,
        });
    };
    TestComponent2.prototype.render = function () {
        var _this = this;
        return (<div className="card text-center m-0 p-0">
        <div className="card-header text-center m-0 p-0">
          <h6 className="lead fw-bold text-center m-0 p-0">
            {
            // @ts-ignore
            this.state.count}
          </h6>
        </div>
        <div className="card-body text-center m-0 p-0">
          <div className="d-flex justify-content-between text-center m-0 p-0">
            <button onClick={this.plus} className="btn btn-lg w-25 btn-outline-success m-1 p-1">
              +
            </button>
            <input type="number" className="form-control form-control-sm text-center m-1 p-1" value={
            // @ts-ignore
            this.state.value} required placeholder="пример: 70%" min="-100" max="100" onChange={function (e) { return _this.setValue(parseInt(e.target.value)); }}/>
            <button onClick={this.minus} className="btn btn-lg w-25 btn-outline-danger m-1 p-1">
              -
            </button>
          </div>
        </div>
      </div>);
    };
    return TestComponent2;
}(react_1.default.Component));
exports.TestComponent2 = TestComponent2;
var TestComponent3 = function () {
    var _a = (0, react_1.useState)(0), count = _a[0], countSet = _a[1];
    var _b = (0, react_1.useState)(""), value = _b[0], valueSet = _b[1];
    function increment() {
        countSet(count + 1);
    }
    function decrement() {
        countSet(count - 1);
    }
    return (<div>
      <h1>{count}</h1>
      <h1>{value}</h1>
      <input type="text" value={value} onChange={function (event) { return valueSet(event.target.value); }}/>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>);
};
exports.TestComponent3 = TestComponent3;
var TestComponent4 = /** @class */ (function (_super) {
    __extends(TestComponent4, _super);
    // @ts-ignore
    function TestComponent4(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            count: 0,
            value: 0,
        };
        _this.increment = _this.increment.bind(_this);
        _this.decrement = _this.decrement.bind(_this);
        return _this;
    }
    TestComponent4.prototype.increment = function () {
        // @ts-ignore
        this.setState({ count: this.state.count + 1 });
    };
    TestComponent4.prototype.decrement = function () {
        // @ts-ignore
        this.setState({ count: this.state.count - 1 });
    };
    TestComponent4.prototype.render = function () {
        var _this = this;
        return (<div>
        <h1>
          {
            // @ts-ignore
            this.state.count}
        </h1>
        <h1>
          {
            // @ts-ignore
            this.state.value}
        </h1>
        <input type="text" value={
            // @ts-ignore
            this.state.value} onChange={function (event) { return _this.setState({ value: event.target.value }); }}/>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
      </div>);
    };
    return TestComponent4;
}(react_1.default.Component));
exports.TestComponent4 = TestComponent4;
