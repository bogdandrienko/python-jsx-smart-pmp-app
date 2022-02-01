import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const NotePage = () => {
  let noteId = useParams().id;
  let navigate = useNavigate();
  let [note, setNote] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    let getNote = async () => {
      if (noteId !== "new") {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`/api/note_api/${noteId}/`, config);
        setNote(data);
      }
    };
    getNote();
  }, [noteId, userInfo.token]);

  let createNote = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/note_api/${noteId}/`,
      { body: note.body },
      config
    );
    navigate("/chat_react/");
  };

  let updateNote = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/note_api/${noteId}/`,
      { body: note.body },
      config
    );
    navigate("/chat_react/");
  };

  let deleteNote = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/note_api/${noteId}/`, config);
    navigate("/chat_react/");
  };

  let handleSubmit = () => {
    if (noteId === "new" && note.body !== null) {
      createNote();
    } else if (noteId !== "new" && note.body === "") {
      deleteNote();
    } else if (noteId !== "new" && note.body !== null) {
      updateNote();
    }
    navigate("/chat_react/");
  };

  let handleDelete = () => {
    deleteNote();
    navigate("/chat_react/");
  };

  return (
    <div className="text-center card">
      <div className="d-flex text-center card-header justify-content-between align-content-between">
        {noteId !== "new" ? (
          <Link
            to="/chat_react/"
            onClick={handleSubmit}
            className="btn btn-xs btn-outline-warning"
          >
            назад
          </Link>
        ) : (
          <Link to="/chat_react/" className="btn btn-xs btn-outline-warning">
            назад
          </Link>
        )}
        {noteId !== "new" ? (
          <Link
            to="/chat_react/"
            onClick={handleDelete}
            className="btn btn-xs btn-outline-danger"
          >
            удалить
          </Link>
        ) : (
          <Link
            to="/chat_react/"
            onClick={handleSubmit}
            className="btn btn-xs btn-outline-danger"
          >
            сохранить
          </Link>
        )}
      </div>
      <div className="card-body">
        <h6>{userInfo.username}</h6>
        <textarea
          onChange={(e) => {
            setNote({ ...note, body: e.target.value });
          }}
          className="lead form-control"
          value={note?.body} />
      </div>
    </div>
  );
};

export default NotePage;
