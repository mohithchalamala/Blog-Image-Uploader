import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([])
  console.log(data)
  const getuserdata = async () => {
    const res = await axios.get("http://localhost:3000/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      setData(res.data.getuser)
    }
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <div className="container nt-2">
      <h1 className="text-center mt-2">MERN Image Upload Project</h1>
      <div className="text-end">
        <Link to="/register">
          <Button variant="primary">Add User</Button>
        </Link>
      </div>
      <div className="row d-flex justify-content-between align-items-center mt-5">

      {data.length > 0 ? (
          data.map((user, index) => (
            <Card key={index} style={{ width: "22rem", height: "18rem" }} className="mb-3">
              <Card.Img
                variant="top"
                style={{ width: "100px", textAlign: "center", margin: "auto" }}
                src={`http://localhost:3000/Images/${user.file}`} // Using actual image URL
                className="mt-2"
              />
              <Card.Body className="text-center">
                <Card.Title>User Name: {user.username}</Card.Title>
                <Card.Text>Date Added: {user.date}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
