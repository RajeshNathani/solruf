import {React, useRef, useState} from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap'
import { register } from '../firebase';
import { Routes, Route, Link} from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('')

  async function handleSubmit(e){
      e.preventDefault();
      if(passwordRef.current.value !== passwordConfirmRef.current.value){
          setError("Passwords do not match")
      }else{
      try{
          setError('')
          await register(emailRef.current.value, passwordRef.current.value)
          alert("Successfully registered")
      }catch{
          setError("Unable to create account")
      }}
  }
  
  return (
        <>
        
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant = "danger">{error}</Alert>}
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password_conf">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group><br/>
                        <p className='text-warning'>Password must contain atleast 6 characters</p> 
                        <Button type="submit" className='w-100' onClick={handleSubmit}>Signup</Button>
                    </Form>
                </Card.Body>
            </Card><br/>
            <div>Already have an account? <Link to="/login">Login</Link></div>
        </>
    )
}

export default Signup