import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  let id = useParams().id;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  // const product = products.find((p) => p._id == id);
  return (
    <div>
      <Link to="/shop" className="btn btn-lg btn-outline-primary my-3">
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="text-center">
                <button
                  className="btn btn-lg btn-outline-success"
                  disabled={product.countInStock === 0}
                  type="button"
                >
                  Add to cart
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
