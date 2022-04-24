import React from "react";
import { BaseComponent3 } from "../../components/ui/base";
import {
  TestComponent1,
  TestComponent2,
  TestComponent3,
  TestComponent4,
} from "../../components/ui/component";

const TestPage = () => {
  return (
    <BaseComponent3>
      <h1>Test page</h1>
      <TestComponent1 />
      <TestComponent2 />
      <TestComponent3 />
      <TestComponent4 />
    </BaseComponent3>
  );
};

export default TestPage;
