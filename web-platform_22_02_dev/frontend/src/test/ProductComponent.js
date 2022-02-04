import React from "react";
import { Card } from "react-bootstrap";
import RatingComponent from "./RatingComponent";
import { Link } from "react-router-dom";

const ProductComponent = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <RatingComponent
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">
          <div className="my-3">${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductComponent;
