import React, { useState } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import { Login as loginservice } from "../service/userService";
import { Link } from "react-router-dom";
import image from "../assets/2766594.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const send = async () => {
    if (email === "" || password === "") {
      alert("please fill the form ");
    } else {
      try {
        let res = await loginservice(email, password);
        console.log(res);
      } catch (error) {
        console.log("there is error in the login function ", error);
      }
    }
  };

  const handelLogin = async () => {
    send();
  };

  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <img
            src={image}
            alt="Online Book Shopping"
            className="login-image"
            style={{ borderRadius: "15vw" }}
          />
          <p>ONLINE BOOK SHOPPING</p>
        </div>
        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <h2 className="active-tab">LOGIN</h2>
              <Link to={"/sign"} style={{ textDecoration: "none" }}>
                <h2 className="inactive-tab">SIGNUP</h2>
              </Link>
            </div>
            <div className="input-group">
              <label>Email Id</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <button onClick={handelLogin} className="login-button">
              Login
            </button>
            <div className="or-divider">OR</div>
            <div className="social-login">
              <button className="social-button facebook">Facebook</button>
              <button className="social-button google">Google</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
