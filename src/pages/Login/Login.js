import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user-info")) {
      navigate("/dashboard/books");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    // e.preventDefault();
    // const response = await axios.post(
    //   "http://localhost:8081/LibraryManagementSystem/Login",
    //   values
    // );
    // console.log(`response`, response.data.response_code);
    // if (response.data.response_code === 200) {
    //   sessionStorage.setItem("user-info", JSON.stringify(response.data));
    //   Object.keys(response.data).map((k) =>
    //     sessionStorage.setItem(k, response.data[k])
    //   );
    navigate("/dashboard/marks");
    // } else {
    //   alert("Wrong Credentials");
    // }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "60vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "25rem" }}>
        <Form onSubmit={handleLogin}>
          <Card.Header>
            <Card.Title>Sign In</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={values.username}
                onChange={handleChange("username")}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange("password")}
              ></Form.Control>
            </Form.Group>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button variant="dark" type="submit" onClick={handleLogin}>
              Login
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
