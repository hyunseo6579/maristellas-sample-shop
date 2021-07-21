import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import {listProductDetails, updateProduct} from '../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'

function ProductEditPage({match, history}) {

  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [isReleased, setIsReleased] = useState(false)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {error, loading, product} = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const {error: errorUpdate, error: loadingUpdate, success: successUpdate} = productUpdate

  useEffect(() => {

    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setIsReleased(product.isReleased)
      }
    }
  }, [
    dispatch,
    productId,
    product,
    history,
    successUpdate
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      countInStock,
      description,
      isReleased
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('product_id', productId)

    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const {data} = await axios.post('/api/products/upload/', formData, config)
      setImage(data)
      setUploading(false)

    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <div>

      <Link to="/admin/productlist">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {
        loadingUpdate && <Loader/>
      }
        {
        errorUpdate && <Message variant='danger'>
          {errorUpdate}</Message>
      }

        {
        loading ? <Loader/>: error ? <Message variant='danger'>
          {error}</Message> : (
          <Form onSubmit={submitHandler}>

            <Form.Group className='p-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' placeholder='Enter Name'
                value={name}
                onChange={
                  (e) => setName(e.target.value)
              }></Form.Control>
            </Form.Group>

            <Form.Group className='p-2' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter Price'
                value={price}
                onChange={
                  (e) => setPrice(e.target.value)
              }></Form.Control>
            </Form.Group>

            <Form.Group className='p-2' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='text' placeholder='Enter Image'
                value={image}
                onChange={
                  (e) => setImage(e.target.value)
              }></Form.Control>
              <Form.File id='image-file' label='ChooseFile' custom
                onChange={uploadFileHandler}></Form.File>
              {
              loading && <Loader/>
            } </Form.Group>

            <Form.Group className='p-2' controlId='countInStock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control type='number' placeholder='Enter Stock Count'
                value={countInStock}
                onChange={
                  (e) => setCountInStock(e.target.value)
              }></Form.Control>
            </Form.Group>

            <Form.Group className='p-2' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='Description' placeholder='Enter Description'
                value={description}
                onChange={
                  (e) => setDescription(e.target.value)
              }></Form.Control>
            </Form.Group>

            <Form.Group className='p-2' controlId='isReleased'>
              <Form.Check type='checkbox' label='Is Released'
                checked={isReleased}
                onChange={
                  (e) => setIsReleased(e.target.checked)
              }></Form.Check>
            </Form.Group>


            <div className='text-center p-2'>
              <Button type='submit' variant='primary'>Update</Button>
            </div>

          </Form>
        )
      } </FormContainer>
    </div>
  )
}

export default ProductEditPage
