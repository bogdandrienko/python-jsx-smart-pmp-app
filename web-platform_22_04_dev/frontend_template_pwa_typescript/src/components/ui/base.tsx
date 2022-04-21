import React from "react";
import { NavbarComponent1 } from "./navbars";
import { FooterComponent1 } from "./footers";

// @ts-ignore
export const BaseComponent1 = ({ children }) => {
  return (
    <div className="custom_body_1">
      <NavbarComponent1 />
      <div className="custom_main_1">{children}</div>
      <FooterComponent1 />
    </div>
  );
};

// @ts-ignore
export const BaseComponent2 = ({ children }) => {
  return (
    <body className="d-flex flex-column vh-100 custom_body_1">
      <NavbarComponent1 />
      <main className="d-flex vh-100 h-100">
        <div className="container">{children}</div>
      </main>
      <FooterComponent1 />
    </body>
  );
};
