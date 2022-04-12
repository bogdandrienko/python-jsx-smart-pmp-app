import React from "react";
import { NavbarComponent1 } from "./navbars";
import { FooterComponent1 } from "./footers";

export const BaseComponent1 = ({ children }) => {
  return (
    <div className="custom_body_1">
      <NavbarComponent1 />
      <div className="custom_main_1">{children}</div>
      <FooterComponent1 />
    </div>
  );
};
