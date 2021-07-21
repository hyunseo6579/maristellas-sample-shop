import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {listReleasedProducts} from '../actions/productActions'

function ProductCarousel() {

  const dispatch = useDispatch()

  const productReleased = useSelector(state => state.productReleased)
  const {loading, error, products} = productReleased

  useEffect(() => {
    dispatch(listReleasedProducts())
  }, [dispatch])

  // if there is no released product, boolean set true
  const noRelease = products ? (products.every(product => product.isReleased === false)) : true

  return(loading ? <Loader/>: error ? <Message variant='danger'>
    {error}</Message> : noRelease ? (
    <h1 className='text-center'>No Release This Week</h1>
  ) : (
    <div>
      <h1 className='text-center'>This Week's Release</h1>
      <Carousel pause='hover' fade>
        {
        products ? products.map(product => (
          <Carousel.Item key={
            product._id
          }>
            <Link to={
              `/product/${
                product._id
              }`
            }>
              <Image src={
                  product.image
                }
                alt={
                  product.name
                }
                fluid/>
              <Carousel.Caption className='carousel.caption'>
                <h4>{
                  product.name
                }
                  &#160;(${
                  product.price
                })</h4>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        )) : ('Error')
      } </Carousel>
    </div>
  ))
}

export default ProductCarousel
