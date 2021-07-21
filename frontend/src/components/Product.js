import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body className="text-center">
        <Link style={{ textDecoration: "none" }} to={`/product/${product._id}`}>
          <Card.Title as="h5">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

      {/*}        {product.countInStock >= 10 ? (
          <Card.Text className="text-success">
            {product.countInStock} in stock
          </Card.Text>
        ) : product.countInStock == 0 ? (
          <Card.Text className="text-secondary">Out of stock</Card.Text>
        ) : (
          <Card.Text className="text-danger">
            Only {product.countInStock} left
          </Card.Text>
        )}
        
        <Card.Text as="h3">${product.price}</Card.Text>
        */}
        
      </Card.Body>
    </Card>
  );
}

export default Product;
