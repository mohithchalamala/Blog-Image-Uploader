import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Register() {
  const [username, setusername] = useState("");
  const [file, setfile] = useState(null)
  const history = useNavigate();
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(file);
    await adduserdata(e); 
  };

  const adduserdata = async (e) => {
    e.preventDefault();
    var formData = new FormData(); 
    formData.append("photo", file);
    formData.append("username", username);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    const res = await axios.post("http://localhost:3000/register", formData, config);
    if(res.data.status === 401 || !res.data){
      console.log('error')
    }
    else{
      history('/')
    }
  };

  return (
    <div>
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>
        <Form className="mt-3" onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setusername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Upload Img</Form.Label>
            <Form.Control
              onChange={(e) => setfile(e.target.files[0])} // Get the first file from the FileList object
              type="file"
              placeholder=""
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
