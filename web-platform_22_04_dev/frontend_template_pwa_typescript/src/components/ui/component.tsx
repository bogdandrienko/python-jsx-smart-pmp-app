// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as button from "./button";
import * as input from "./input";
import * as select from "./select";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const PostItem = (props) => {
  const navigate = useNavigate();

  // @ts-ignore
  const deletePost = (e) => {
    e.stopPropagation();

    props.remove(props.post);
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="post" onClick={() => navigate("/posts/" + props.post.id)}>
      <div className="post__content">
        <h5>{props.post.name}</h5>
        <strong>{props.post.place}</strong>
        <div>{props.post.body}</div>
        <div>{props.post.sphere}</div>
        <div className="post__btns">
          <button.Button1 onClick={deletePost}>delete</button.Button1>
        </div>
      </div>
    </div>
  );
};

// @ts-ignore
export const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Post not found!</h1>;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup className="post-list">
        {posts.map(
          // @ts-ignore
          (post, index) => (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <PostItem remove={remove} number={index + 1} post={post} />
            </CSSTransition>
          )
        )}
      </TransitionGroup>
    </div>
  );
};

// @ts-ignore
export const PostForm = ({ create }) => {
  const [post, setPost] = useState({
    name: "",
    place: "",
    sphere: "",
  });

  // @ts-ignore
  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({
      name: "",
      place: "",
      sphere: "",
    });
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <form>
      <h5>Create post</h5>
      <input.Input1
        // @ts-ignore
        value={post.name}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, name: e.target.value })}
        type="text"
        placeholder="Title..."
      />
      <input.Input1
        // @ts-ignore
        value={post.place}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, place: e.target.value })}
        type="text"
        placeholder="Body..."
      />
      <input.Input1
        // @ts-ignore
        value={post.sphere}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, sphere: e.target.value })}
        type="text"
        placeholder="Body..."
      />
      <button.Button1 onClick={addNewPost}>create</button.Button1>
    </form>
  );
};

// @ts-ignore
export const PostFilter = ({ filter, setFilter }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <input.Input1
        // @ts-ignore
        value={filter.query}
        // @ts-ignore
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
      <select.Select2
        value={filter.sort}
        // @ts-ignore
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue={"sort By"}
        options={[
          { value: "title", name: "by Name" },
          { value: "body", name: "by Description" },
        ]}
      />
    </div>
  );
};

export const TestComponent1 = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [count, countSet] = useState(0);
  const [value, valueSet] = useState(1);
  function plus() {
    countSet(count + value);
  }
  function minus() {
    countSet(count - value);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card text-center m-0 p-0">
      <div className="card-header text-center m-0 p-0">
        <h6 className="lead fw-bold text-center m-0 p-0">{count}</h6>
      </div>
      <div className="card-body text-center m-0 p-0">
        <div className="d-flex justify-content-between text-center m-0 p-0">
          <button
            onClick={plus}
            className="btn btn-lg w-25 btn-outline-success m-1 p-1"
          >
            +
          </button>
          <input
            type="number"
            className="form-control form-control-sm text-center m-1 p-1"
            value={value}
            required
            placeholder="пример: 70%"
            min="-100"
            max="100"
            onChange={(e) => valueSet(parseInt(e.target.value))}
          />
          <button
            onClick={minus}
            className="btn btn-lg w-25 btn-outline-danger m-1 p-1"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export class TestComponent2 extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      value: 1,
    };
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  plus() {
    this.setState({
      // @ts-ignore
      count: this.state.count + this.state.value,
    });
  }
  minus() {
    this.setState({
      // @ts-ignore
      count: this.state.count - this.state.value,
    });
  }
  // @ts-ignore
  setValue(value) {
    this.setState({
      value: value,
    });
  }
  render() {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div className="card text-center m-0 p-0">
        <div className="card-header text-center m-0 p-0">
          <h6 className="lead fw-bold text-center m-0 p-0">
            {
              // @ts-ignore
              this.state.count
            }
          </h6>
        </div>
        <div className="card-body text-center m-0 p-0">
          <div className="d-flex justify-content-between text-center m-0 p-0">
            <button
              onClick={this.plus}
              className="btn btn-lg w-25 btn-outline-success m-1 p-1"
            >
              +
            </button>
            <input
              type="number"
              className="form-control form-control-sm text-center m-1 p-1"
              value={
                // @ts-ignore
                this.state.value
              }
              required
              placeholder="пример: 70%"
              min="-100"
              max="100"
              onChange={(e) => this.setValue(parseInt(e.target.value))}
            />
            <button
              onClick={this.minus}
              className="btn btn-lg w-25 btn-outline-danger m-1 p-1"
            >
              -
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const TestComponent3 = function () {
  const [count, countSet] = useState(0);
  const [value, valueSet] = useState("");

  function increment() {
    countSet(count + 1);
  }
  function decrement() {
    countSet(count - 1);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h1>{count}</h1>
      <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange={(event) => valueSet(event.target.value)}
      />
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export class TestComponent4 extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      value: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    // @ts-ignore
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    // @ts-ignore
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div>
        <h1>
          {
            // @ts-ignore
            this.state.count
          }
        </h1>
        <h1>
          {
            // @ts-ignore
            this.state.value
          }
        </h1>
        <input
          type="text"
          value={
            // @ts-ignore
            this.state.value
          }
          onChange={(event) => this.setState({ value: event.target.value })}
        />
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
      </div>
    );
  }
}
