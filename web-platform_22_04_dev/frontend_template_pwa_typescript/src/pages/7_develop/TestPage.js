import React from "react";
import { Base3 } from "../../components/ui/base";
import {
  TestComponent1,
  TestComponent2,
  TestComponent3,
  TestComponent4,
} from "../../components/ui/component";

const TestPage = () => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Base3>
      <h1>Test page</h1>
      <TestComponent1 />
      <TestComponent2 />
      <TestComponent3 />
      <TestComponent4 />
    </Base3>
  );
};

export default TestPage;
