import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { detailNotes } from "../actions/noteActions";
import axios from "axios";

function NoteScreen() {
  let id = useParams().id;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const notesDetails = useSelector((state) => state.notesDetails);
  const { error, notes, loading } = notesDetails;

  let keyword = "";

  useEffect(() => {
    dispatch(detailNotes(id));
  }, [dispatch, id]);

  let createNote = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer`,
      },
    };

    const { data } = await axios.post(
      `/api/note_api/${id}/`,
      notes,
      config
    );
    navigate("/notes");
  };

  let updateNote = async () => {
    fetch(`/api/note_api/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    });
    navigate("/notes");
  };

  let deleteNote = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer`,
      },
    };

    const { data } = await axios.delete(`/api/note_api/${id}/`, config);
    navigate("/notes");
  };

  let handleSubmit = () => {
    if (id === "new" && notes.body !== null) {
      createNote();
    } else if (id !== "new" && notes.body === "") {
      deleteNote();
    } else if (id !== "new" && notes.body !== null) {
      updateNote();
    }
    navigate("/notes");
  };

  let handleDelete = () => {
    deleteNote();
    navigate("/notes");
  };

  return (
    <div>
      <div className="d-flex text-center card-header justify-content-between align-content-between">
        <Link to={`/notes`}>
          <button className="btn btn-xs btn-outline-warning">BACK</button>
        </Link>
        <h1>Note details:</h1>
        <Link
          to="/notes"
          onClick={handleDelete}
          className="btn btn-xs btn-outline-danger"
        >
          DELETE
        </Link>
      </div>
      <Row>
        {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : !notes ? (<Message variant="danger">{"Unexpected error"}</Message>) : 
        (
            <Col className="my-3 p-3 rounded">
              <Link to={`/notes/${notes.id}`}>
                  <Card className="">
                      <strong className="text-center">{notesDetails.id}</strong>
                      <Card.Body>
                          <Card.Text as="h3" className="text-center">
                              {notes.body}
                          </Card.Text>
                          <Card.Title as="div" className="small text-start">
                              <strong>updated: {notes.updated}</strong>
                          </Card.Title>
                          <Card.Title as="div" className="small text-end">
                              <strong>created: {notes.created}</strong>
                          </Card.Title>
                      </Card.Body>
                  </Card>
              </Link>
            </Col>
        )}
      </Row>
    </div>
  );
}

export default NoteScreen;
