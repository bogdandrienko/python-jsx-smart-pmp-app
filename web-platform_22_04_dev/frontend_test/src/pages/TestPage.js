import React from "react";
import { BaseComponent1 } from "../components/ui/base";
import {
  TestComponent1,
  TestComponent2,
  TestComponent3,
  TestComponent4,
} from "../components/ui/components";

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
