import React, { useRef, useState } from 'react'
import { Alert, Card, Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { signin } from '../firebase'

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('')

  async function handleLogin(e){
        e.preventDefault();
        try{
            await signin(emailRef.current.value, passwordRef.current.value);
            window.location = "/"
        }catch{
            setError("Unable to login")
        }
  }
  return (
        <>
            <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
            <div className='w-100' style={{maxWidth : '400px'}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant = "danger">{error}</Alert>}
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required></Form.Control>
                        </Form.Group><br/>
                        <Button type="submit" className='w-100' onClick={handleLogin}>Login</Button>
                    </Form>
                </Card.Body>
            </Card><br/>
            <div>Already have an account? <Link to="/">Signup</Link></div>
            </div>
            </Container>
        </>  )
}

export default Login