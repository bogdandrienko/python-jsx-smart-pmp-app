import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
import { listNotes } from "./noteActions";

function Notes1Page() {
  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notesList);
  const { error, notes, loading } = notesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userToken } = userLogin;

  useEffect(() => {
    dispatch(listNotes(userToken));
  }, [dispatch, userToken]);

  return (
    <div>
      <h1>Notes list:</h1>
      {loading ? (
        <LoaderComponent />
      ) : error ? (
        <MessageComponent variant="danger">{error}</MessageComponent>
      ) : !notes ? (
        <MessageComponent variant="danger">
          {"Unexpected error"}
        </MessageComponent>
      ) : (
        <Row>
          {notes.map((note) => (
            <Col
              key={note.id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="my-3 p-3 rounded"
            >
              <Link to={`/notes/${note.id}`}>
                <Card className="">
                  <strong className="text-center">{note.id}</strong>
                  <Card.Body>
                    <Card.Text as="h3" className="text-center">
                      {note.body}
                    </Card.Text>
                    <Card.Title as="div" className="small text-start">
                      <strong>updated: {note.updated}</strong>
                    </Card.Title>
                    <Card.Title as="div" className="small text-end">
                      <strong>created: {note.created}</strong>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Notes1Page;
