import React, { useState, useEffect } from "react";
import ListItemComponent from "./ListItemComponent";
import AddButtonComponent from "./AddButtonComponent";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const NotesListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let [notes, setNotes] = useState([]);

  console.log(notes)

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/note_api/`, config
    );

    setNotes(data);
  };

  return (
    <div className="text-center card">
      <div className="d-flex text-center card-header justify-content-between align-content-between">
        <AddButtonComponent />
      </div>
      <div className="card-body">
        {notes.map((note, index) => (
          <div key={index} className="m-1">
            <ListItemComponent key={index} note={note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesListPage;
