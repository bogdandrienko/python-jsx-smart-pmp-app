import React from "react";

const PrivateRoute = ({ children, ...rest }) => {
  const authenticated = false;
  return (
    <div>
      <div>
        {!authenticated ? (
          <p className="text-danger">not auth</p>
        ) : (
          <p className="text-success">auth</p>
        )}
      </div>
    </div>
  );
};

export default PrivateRoute;
