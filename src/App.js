import React from 'react'
import { Container } from 'react-bootstrap'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'
import { useAuth } from './firebase'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Loginpage from './routes/Loginpage'

const App = () => {
  
  const user = useAuth();
  return (
    <div>
      
      <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
        
        {user?(
          <Dashboard user={user}></Dashboard>
        ):
        (
        <div className='w-100' style={{maxWidth : '400px'}}>
          <Signup/>
        </div>
      )}
        
      </Container>
    </div>
  )
}

export default App