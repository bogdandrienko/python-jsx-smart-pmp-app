import React from "react";
import { Link } from "react-router-dom";

const ListItemComponent = ({ note }) => {
  return (
    <Link to={`/chat_react/note/${note.id}`} className="btn btn-lg btn-outline-primary">
      <h6 className="display-6">{note.username ? (note.username) : ('2')}</h6>
      <p className="lead">{note.body}</p>
    </Link>
  );
};

export default ListItemComponent;
