import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Authentication.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import ToastError from "../../Components/Toast/ToastError";
import ToastSuccess from "../../Components/Toast/ToastSuccess";

const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({userName: "", password: ""});
  const [dbFoundUser, setDbFoundUser] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);
  const [toastErrMessage, setToastErrMessage] = useState("");
  const [toastSuccessMessage, setToastSuccessMessage] = useState("kyuv");

  const handleLogin = async () => {
    console.log(user)
    try {
      Axios.post("http://localhost:8000/login", user)
        .then(async (res) => {
          setShowError(false);
          setToastSuccessMessage(res?.data?.resMessage);
          navigate("/", { state: {successMessage : res?.data?.resMessage} })
        })
        .catch((error) => {
          setShowError(true);
          setToastErrMessage(error?.response?.data?.resMessage);
          console.log("response error", error)
        })
    }
    catch(error) {
      console.log(error)
    }
  }

  console.log(toastSuccessMessage)

  return (
    <>
    <div className="authentication-container">
      <div className="register-page">
        <Form className="form-container">
          <Row className="m-0 p-0">
            <Col lg={6} md={6} className="left-container">
              <div className="welcome">
                <h2>Hello!</h2>
                <h4>Welcome to The Teerex Store</h4>
              </div>
            </Col>
            <Col lg={6} md={6} className="right-container p-4">
              <div>
                <div className="register-container">
                  <Row>
                    <Col className="column-container" lg={6} md={6} sm={12}>
                      <div className="form-group">
                        <h4>Login</h4>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="column-container" lg={12} md={12} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your username"
                          onChange={(e)=>setUser({...user, userName:e.target.value})}
                          value={user.userName}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="column-container" lg={12} md={12} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your password"
                          onChange={(e)=> setUser({...user, password:e.target.value})}
                          value={user.password}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="register-and-login-btn mt-3">
                  <Col lg={6} md={6} sm={12} className="column-container">
                    <div className="form-group">
                      <Button variant="primary" onClick={handleLogin}>Log in</Button>
                    </div>
                  </Col>
                </div>
                <div>
                  <Col lg={12} md={12} sm={12} className="column-container py-0">
                    <div className="form-group">
                      <Form.Label>Don't have any account? </Form.Label>
                      <Link to="/register" className="signup-link">
                        Sign up
                      </Link>
                    </div>
                  </Col>
                </div>

                <div style={{position:"relative"}}>
                    <hr className="hr-text" data-content="Or" />
                </div>

                <Row className="mt-4 mb-2">
                  <Col className="column-container py-0" lg={6} md={6} sm={12}>
                    <Button className="or-btn-group" variant="primary">
                      <div className="logo-flexbox-container">
                        <FcGoogle className="google-logo" />
                      </div>
                      <div>Google</div>
                    </Button>
                  </Col>
                  <Col className="column-container py-0" lg={6} md={6} sm={12}>
                    <Button className="or-btn-group" variant="primary">
                        <div> <FaFacebook className="facebook-logo" /></div>
                        <div>Facebook</div>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>

    <Modal style={{visibility:"hidden"}} show={showError}>
      <Toast style={{visibility:"visible", margin:"0"}} onClose={()=>setShowError(false)} show={showError} delay={2000} autohide>
        <ToastError text={toastErrMessage} />
      </Toast>
    </Modal>
    </>
  );
};

export default Login;
