import React from "react";

export const Button1 = ({ children, ...props }) => {
  return (
    <button {...props} className="custom_button_1">
      {children}
    </button>
  );
};
