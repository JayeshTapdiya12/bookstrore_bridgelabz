import React, { useEffect, useState } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import {
  Login as loginService,
  Sign as signService,
} from "../service/userService";
import image from "../assets/2766594.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({
  children,
  value,
  index,
  ...other
}: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Login: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  //  Login handler
  const sendLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      const res = await loginService(email, password);
      console.log("Login response:", res.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  //  Signup handler
  const sendSign = async () => {
    if (!fullName || !signupEmail || !signupPassword || !phone) {
      alert("Please enter all signup details.");
      return;
    }
    try {
      const res = await signService(
        fullName,
        signupEmail,
        signupPassword,
        phone
      );
      console.log("Signup response:", res.data);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <Box sx={{ width: "100%" }}>
        {/* Tabs for switching */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          {/* Login Panel */}
          <CustomTabPanel value={tabValue} index={0}>
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
                  {/* <h2 className="active-tab"> LOGIN</h2> */}
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="login-signup-tabs"
                    className="active-tab"
                  >
                    <Tab
                      className="active-tab"
                      label="Login"
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Sign Up"
                      className="inactive-tab"
                      {...a11yProps(1)}
                    />
                  </Tabs>
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
                  <button onClick={sendLogin} className="login-button">
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
          </CustomTabPanel>

          {/* Signup Panel */}
          <CustomTabPanel value={tabValue} index={1}>
            <div className="signup-container">
              <div className="signup-left">
                <img
                  src={image}
                  alt="Online Book Shopping"
                  className="signup-image"
                  style={{ borderRadius: "15vw" }}
                />
                <p>ONLINE BOOK SHOPPING</p>
              </div>
              <div className="signup-right">
                <div className="signup-box">
                  {/* <h2 className="active-tab">SIGNUP</h2> */}
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="login-signup-tabs"
                  >
                    <Tab
                      label="Login"
                      className="inactive-tab"
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Sign Up"
                      className="active-tab"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Email Id</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button onClick={sendSign} className="signup-button">
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default Login;
