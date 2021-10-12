import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails, detailReset } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

function ProductPage({ match, history }) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addToCart(match.params.id, Number(qty)));
    dispatch(detailReset());
    history.push("");
  };

  const goBackHandler = () => {
    dispatch(detailReset());
    history.push("");
  };

  return (
    <div>
      <Button className="btn btn-outline-primary my-3" onClick={goBackHandler}>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : product.isReleased ? (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush" className="text-center">
              <ListGroup.Item>
                <h3>{product.name}</h3>
                {product.description}{" "}
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              {product.countInStock > 0 ? (
                <ListGroup.Item>
                  <Row className="justify-content-center">
                    <Col xs="auto" md="auto">
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}{" "}
                          </option>
                        ))}{" "}
                      </Form.Control>
                    </Col>
                    <Col xs="auto" md="auto">
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        disabled={product.countInStock == 0}
                        type="button"
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>Out of Stock</ListGroup.Item>
              )}{" "}
            </ListGroup>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush" className="text-center">
              <ListGroup.Item>
                <h3>{product.name}</h3>
                {product.description}{" "}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}{" "}
    </div>
  );
}

export default ProductPage;
