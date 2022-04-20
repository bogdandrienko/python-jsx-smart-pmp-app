import React from "react";
import { BaseComponent1 } from "../components/jsx/ui/base";
import {
  TestComponent1,
  TestComponent2,
  TestComponent3,
  TestComponent4,
} from "../components/jsx/ui/components";

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
