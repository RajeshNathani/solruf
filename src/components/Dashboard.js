import { Button, Card, Form } from 'react-bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { logout, upload } from '../firebase'

const Dashboard = ({user, profile}) => {
  const name = useRef()
  const profilePicture = useRef();
  const [avatar, setAvatar] = useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=")
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  async function handleLogout(){
    await logout();
  }
  useEffect(() => {
    if(user.photoURL){
        setAvatar(user.photoURL)
        console.log(avatar)
    }
  }, [])
  
  function handleChange(e){
   if(e.target.files[0]){
       setPhoto(e.target.files[0])
   }
  }
  async function handleUpdate(){
      upload(user, photo, setLoading, name.current.value)
  }
  return (
    <div>
        <Card>
            <Card.Body>
                <h3>Dashboard</h3>
                Logged in as: {user.displayName} <img src={avatar} style={{height:'10vh'}}></img> <br/><br/>
        <Form>
            <Form.Group id="name">
                <Form.Label>Change Username</Form.Label>
                <Form.Control type="text" ref={name}></Form.Control>
            </Form.Group><br/>
            <Form.Group>
                <Form.Label> Change Profile picture</Form.Label>
                <Form.Control type="file" ref={profilePicture} onChange={handleChange}></Form.Control>
            </Form.Group>
            <br/>
            <Button onClick={handleUpdate}>Update</Button>
        </Form><br/>
        <Button disabled={loading} onClick={handleLogout} variant="danger">Logout</Button>
        </Card.Body>
        </Card>
    </div>
  )
}

export default Dashboard