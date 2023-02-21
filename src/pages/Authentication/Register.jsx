import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Authentication.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import config from '../../Data/pattern.json';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Register = () => {
  const [passwordNotMatching, setPasswordNotMatching] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName : "",
    userName : "",
    emailId : "",
    phNumber : "",
    password : "",
    cnfPassword : "",
  })

  
  const {
    register,
    trigger,
    setValue,
    formState: { isDirty, errors, isValid },
    getValues
  } = useForm();

  const handleTrigger = (txt) => {
    trigger();
    console.log(errors)
    setUserDetails(prev => {
      prev[txt] = getValues()?.register?.[txt];
      return prev;
    })
    // trigger(register[txt]);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    trigger();
    const postUrl = "http://localhost:8000/createUser";

    Axios.post(postUrl, userDetails)
      .then((response) => {
        console.log(response.data.message)
      })
  }

  // console.log(getValues()?.register);

  return (
    <div className="authentication-container">
      <div className="register-page">
        <Form className="form-container" onSubmit={handleSubmit}>
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
                        <h4>Register</h4>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="column-container" lg={6} md={6} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          {...register("register.fullName", {
                            required:true,
                            onChange : () => {handleTrigger("fullName")},
                            pattern : eval(config.fullName.pattern.value)
                          })}
                          className={errors?.register?.fullName ? "is-invalid" : ""}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="column-container" lg={6} md={6} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your username"
                          {...register("register.userName", {
                            required:true,
                            onChange : ()=> {handleTrigger("userName")},
                            pattern: eval(config.username.pattern.value)
                          })}
                          className={errors?.register?.userName ? "is-invalid" : ""}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="column-container" lg={6} md={6} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          {...register("register.emailId", {
                            required:true,
                            onChange : ()=> {handleTrigger("emailId")},
                            pattern: eval(config.email.pattern.value)
                          })}
                          className={errors?.register?.emailId ? "is-invalid" : ""}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="column-container" lg={6} md={6} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your number"
                          {...register("register.phNumber",{
                            required:true,
                            onChange : ()=> {handleTrigger("phNumber")},
                            pattern: eval(config.phone.pattern.value),
                            minLength : eval(config.phone.minLength.value),
                            maxLength : eval(config.phone.maxLength.value)
                          })}
                          className={errors?.register?.phNumber ? "is-invalid" : ""}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="column-container" lg={6} md={6} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your password"
                          {...register("register.password",{
                            required:true,
                            onChange : ()=> {handleTrigger("password")},
                            pattern: eval(config.password.pattern.value)
                          })}
                          className={errors?.register?.password ? "is-invalid" : ""}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="column-container" lg={6} md={6} sm={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Confirm your password"
                          {...register("register.cnfPassword",{
                            required:true,
                            onChange : ()=> {handleTrigger("cnfPassword")},
                            pattern: eval(config.password.pattern.value)
                          })}
                          className={errors?.register?.password ? "is-invalid" : ""}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="register-and-login-btn mt-3">
                  <Col lg={6} md={6} sm={12} className="column-container">
                    <div className="form-group">
                      <Button variant="primary" type="submit">Create Account</Button>
                    </div>
                  </Col>
                </div>
                <div>
                  <Col lg={12} md={12} sm={12} className="column-container py-0">
                    <div className="form-group">
                      <Form.Label>Already have an account? </Form.Label>
                      <Link to="/login" className="signup-link">
                        Sign in
                      </Link>
                    </div>
                  </Col>
                </div>

                <div style={{ position: "relative" }}>
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
                      <div>
                        <FaFacebook className="facebook-logo" />
                      </div>
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
  );
};

export default Register;
