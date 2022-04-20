import React from "react";

export const FooterComponent1 = () => {
  return (
    <div className="custom_footer_1">
      <h6 className="custom_footer_1_brand">
        React SPA with Django DRF backend
      </h6>
      <div className="custom_footer_1_brands">
        <strong className="custom_footer_2_brand">custom create </strong>
        <strong className="custom_footer_2_brand">just for fun</strong>
      </div>
    </div>
  );
};

export const FooterComponent2 = () => {
  return (
    <footer
      className="footer mt-auto py-3 bg-light"
      style={{ position: "absolute", left: "auto", bottom: 0, right: 0 }}
    >
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  );
};
