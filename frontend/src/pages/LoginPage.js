import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import {login} from '../actions/userActions'
import FormContainer from "../components/FormContainer";

function LoginPage({location, history}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (<FormContainer>
    <h1>Sign In</h1>
    {
    error && <Message variant='danger'> {error}</Message>
  }
    {
    loading &&< Loader />
  }
    <Form onSubmit={submitHandler}>

      <Form.Group className='p-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type='email' placeholder='Enter Email'
          value={email}
          onChange={
            (e) => setEmail(e.target.value)
        }></Form.Control>
      </Form.Group>

      <Form.Group className='p-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter Password'
          value={password}
          onChange={
            (e) => setPassword(e.target.value)
        }></Form.Control>
      </Form.Group>

      <div className='text-center p-2'>
        <Button type='submit' variant='primary'>Sign In</Button>
      </div>

    </Form>
    <Row className='text-center py-3'>
      <Col>New Customer?<br/>
        <Link to={
          redirect ? `/register?redirect=${redirect}` : '/register'
        }>
          Register</Link>
      </Col>
    </Row>
  </FormContainer>)

}

export default LoginPage
