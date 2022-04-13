import React from "react";

export const Input1 = React.forwardRef((props, ref) => {
  return <input ref={ref} className="custom_input_1" {...props} />;
});
