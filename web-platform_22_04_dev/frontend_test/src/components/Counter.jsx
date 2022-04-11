import React, { useState } from "react";

const Counter = function () {
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

export default Counter;
