import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom'

const NoteComponent = ({ note }) => {
  return (
    <Link to={`/notes/${note.id}`}>
        <Card className="my-3 p-3 rounded">
            <strong className="text-decoration-none">{note.id}</strong>

            <Card.Body>
                <Card.Title as="div">
                    <strong>updated: {note.updated}</strong>
                </Card.Title>
                <Card.Title as="div">
                    <strong>created: {note.created}</strong>
                </Card.Title>
                <Card.Text as="h3" className="btn btn-lg btn-outline-primary">
                    {note.body}
                </Card.Text>
            </Card.Body>
        </Card>
    </Link>
  );
};

export default NoteComponent;
