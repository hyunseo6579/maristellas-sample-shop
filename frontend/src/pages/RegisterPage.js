import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import {register} from '../actions/userActions'
import FormContainer from "../components/FormContainer";

function RegisterPage({location, history}) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const {error, loading, userInfo} = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password != confirmPassword) {
      setMessage('Passwords do not match.')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (<FormContainer> {
    message && <Message variant='danger'> {message}</Message>
  }
    <h1>Sign In</h1>
    {
    error && <Message variant='danger'> {error}</Message>
  }
    {
    loading &&< Loader />
  }
    <Form onSubmit={submitHandler}>

      <Form.Group className='p-2' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control required type='name' placeholder='Enter Name'
          value={name}
          onChange={
            (e) => setName(e.target.value)
        }></Form.Control>
      </Form.Group>

      <Form.Group className='p-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control required type='email' placeholder='Enter Email'
          value={email}
          onChange={
            (e) => setEmail(e.target.value)
        }></Form.Control>
      </Form.Group>

      <Form.Group className='p-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control required type='password' placeholder='Enter Password'
          value={password}
          onChange={
            (e) => setPassword(e.target.value)
        }></Form.Control>
      </Form.Group>

      <Form.Group className='p-2' controlId='passwordConfirm'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control required type='password' placeholder='Confirm Password'
          value={confirmPassword}
          onChange={
            (e) => setConfirmPassword(e.target.value)
        }></Form.Control>
      </Form.Group>


      <div className='text-center p-2'>
        <Button type='submit' variant='primary'>Register</Button>
      </div>

    </Form>

    <Row className='text-center py-3'>
      <Col>Have an account?<br/>
        <Link to={
          redirect ? `/login?redirect=${redirect}` : '/register'
        }>
          Sign In</Link>
      </Col>
    </Row>

  </FormContainer>)
}

export default RegisterPage
