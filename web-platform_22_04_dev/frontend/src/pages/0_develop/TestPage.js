// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TestPage = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  let number = 5; // изменяемая переменная
  const number2 = 5; // не изменяемая переменная

  // javascript:document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 2.5;

  // alert(1)

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <div className="container text-center w-25 m-0 p-0">
          TestComponent1
          <TestComponent1 key={"TestComponent1"} />
        </div>
        <div className="container text-center w-25 m-0 p-0">
          TestComponent2
          <TestComponent2 key={"TestComponent2"} />
        </div>
      </main>
      <components.FooterComponent />
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
