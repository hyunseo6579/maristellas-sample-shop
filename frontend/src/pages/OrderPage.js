import React, {useState, useEffect} from 'react'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card
} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions'
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from '../constants/orderConstants';

function OrderPage({history, match}) {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const {order, error, loading} = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: successPay} = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const {loading: loadingDeliver, success: successDeliver} = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order || order._id !== Number(orderId) || successDeliver || successPay) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_DELIVER_RESET})

      dispatch(getOrderDetails(orderId))
    }

  }, [
    dispatch,
    order,
    orderId,
    successDeliver,
    successPay,
    history,
    userInfo
  ])

  const payHandler = () => {
    dispatch(payOrder(order._id))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader/>) : error ? (
    <Message variant='danger'>
      {error}</Message>
  ) : (
    <div>
      <h1>Order: {
        order._id
      }</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:&#160;
                </strong>
                {
                order.user.name
              }</p>
              <p>
                <strong>Email:&#160;
                </strong>
                {
                order.user.email
              } </p>
              <p>
                <strong>Shipping:&#160;
                </strong>
                {
                order.shippingAddress.address
              }, {
                order.shippingAddress.city
              }
                , {
                order.shippingAddress.postalCode
              } </p>
              {
              order.isDelivered ? (
                <Message variant='success'>Delivered on {
                  order.deliveredAt.substring(0, 19)
                }</Message>
              ) : (
                <Message variant='warning'>Not Delivered</Message>
              )
            } </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method:&#160;
                </strong>
                {
                order.paymentMethod
              }</p>
              {
              order.isPaid ? (
                <Message variant='success'>Paid on {
                  order.paidAt.substring(0, 19)
                }</Message>
              ) : (
                <Message variant='warning'>Not Paid</Message>
              )
            } </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {
              order.orderItems.length === 0 ? <Message variant='info'>Your order is empty.</Message> : (
                <ListGroup variant='flush'>
                  {
                  order.orderItems.map((item, index) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                            fluid
                            rounded/>
                        </Col>

                        <Col>
                          <Link to={
                            `/product/${
                              item.product
                            }`
                          }>
                            {
                            item.name
                          }</Link>
                        </Col>

                        <Col md={4}>
                          {
                          item.qty
                        }
                          &#160;X ${
                          item.price
                        }
                          = ${
                          (item.qty * item.price).toFixed(2)
                        }</Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                } </ListGroup>
              )
            } </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:&#160;</Col>

                  <Col>${
                    order.itemsPrice
                  }</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:&#160;</Col>

                  <Col>${
                    order.shippingPrice
                  }</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:&#160;</Col>

                  <Col>${
                    order.taxPrice
                  }</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price:&#160;</Col>

                  <Col>${
                    order.totalPrice
                  }</Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
            {
            loadingDeliver && <Loader/>
          }
            {
            loadingPay && <Loader/>
          }
            {
            userInfo && !order.isPaid && (
              <ListGroup.Item className='text-center'>
                <Button type='button'
                  onClick={payHandler}>Mark As Paid</Button>
              </ListGroup.Item>
            )
          }
            {
            userInfo && userInfo.isAdmin /*&& order.isPaid*/
            && !order.isDelivered && (
              <ListGroup.Item className='text-center'>
                <Button type='button'
                  onClick={deliverHandler}>Mark As Delivered</Button>
              </ListGroup.Item>
            )
          } </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage
