import React from "react";
import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <Link
      to="/chat_react/note/new"
      className="btn btn-lg btn-outline-success text-center"
    >
      создать
    </Link>
  );
};

export default AddButton;
