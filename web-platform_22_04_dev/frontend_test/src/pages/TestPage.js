import React from "react";
import { BaseComponent1 } from "../components/UI/base";
import {
  TestComponent1,
  TestComponent2,
  TestComponent3,
  TestComponent4,
} from "../components/components";

const TestPage = () => {
  return (
    <BaseComponent1>
      <h1>Test page</h1>
      <TestComponent1 />
      <TestComponent2 />
      <TestComponent3 />
      <TestComponent4 />
    </BaseComponent1>
  );
};

export default TestPage;
