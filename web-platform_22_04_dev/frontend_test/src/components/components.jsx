import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { Button1 } from "./UI/buttons";
import { Input1 } from "./UI/inputs";
import { Select1 } from "./UI/selects";

export const PostItem = (props) => {
  const navigate = useNavigate();

  const deletePost = (e) => {
    e.stopPropagation();
    props.remove(props.post);
  };
  return (
    <div className="post" onClick={() => navigate("/posts/" + props.post.id)}>
      <div className="post__content">
        <strong>
          {props.post.id} {props.post.title}
        </strong>
        <div>{props.post.body}</div>
        <div className="post__btns">
          <Button1 onClick={deletePost}>delete</Button1>
        </div>
      </div>
    </div>
  );
};

export const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Post not found!</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup className="post-list">
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export const PostForm = ({ create }) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({
      title: "",
      body: "",
    });
  };

  return (
    <form>
      <h5>Create post</h5>
      <Input1
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Name..."
      />
      <Input1
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Body..."
      />
      <Button1 onClick={addNewPost}>create</Button1>
    </form>
  );
};

export const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <Input1
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
      <Select1
        value={filter.sort}
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
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
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
      count: this.state.count + this.state.value,
    });
  }
  minus() {
    this.setState({
      count: this.state.count - this.state.value,
    });
  }
  setValue(value) {
    this.setState({
      value: value,
    });
  }
  render() {
    return (
      <div className="card text-center m-0 p-0">
        <div className="card-header text-center m-0 p-0">
          <h6 className="lead fw-bold text-center m-0 p-0">
            {this.state.count}
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
              value={this.state.value}
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
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <h1>{this.state.value}</h1>
        <input
          type="text"
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })}
        />
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
      </div>
    );
  }
}
