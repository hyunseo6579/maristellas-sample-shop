import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import ProductCarousel from '../components/ProductCarousel'

function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {error, loading, products} = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <ProductCarousel/>
      <h1>Past Releases</h1>
      {
      loading ? (
        <h2>
          <Loader/>
        </h2>
      ) : error ? (
        <Message variant="danger">
          {error}</Message>
      ) : (
        <Row> {
          products.map((product) => (!product.isReleased && (
            <Col key={
                product._id
              }
              sm={12}
              md={6}
              lg={4}
              xl={3}>
              <Product product={product}/>
            </Col>
          )))
        } </Row>
      )
    } </div>
  );
}

export default HomePage;
