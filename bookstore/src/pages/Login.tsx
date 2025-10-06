import React, { useState } from "react";
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
  const navigate = useNavigate();

  const [value, setValue] = useState(0); // Tabs state

  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup form states
  const [fullName, setFullName] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const sendSign = async () => {
    if (!fullName || !lastname || !signupEmail || !signupPassword || !phone) {
      alert("Please enter all signup details.");
      return;
    }
    try {
      const res = await signService(
        fullName,
        lastname,
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
    <Box sx={{ width: "100%" }}>
      <CustomTabPanel value={value} index={0}>
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
              {/* <h2>LOGIN</h2> */}
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="login-signup-tabs"
              >
                <Tab
                  label="Login"
                  {...a11yProps(0)}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                />
                <Tab
                  label="SignUp"
                  {...a11yProps(1)}
                  style={{ marginLeft: "180px" }}
                />
              </Tabs>
              <div className="input-group" style={{ marginTop: "30px" }}>
                <label htmlFor="login-email">Email Id</label>
                <input
                  type="email"
                  id="login-email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={sendLogin} className="login-button">
                Login
              </button>
            </div>
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
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
              {/* <h2>SIGNUP</h2> */}
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="login-signup-tabs"
                style={{ gap: "20px" }}
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab
                  label="SignUp"
                  {...a11yProps(1)}
                  style={{
                    marginLeft: "180px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                />
              </Tabs>
              <div className="input-group">
                <label htmlFor="signup-firstname"> First Name</label>
                <input
                  type="text"
                  id="signup-firstname"
                  placeholder="Enter First name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-lastname">Last Name</label>
                <input
                  type="text"
                  id="signup-lastname"
                  placeholder="Enter last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-email">Email Id</label>
                <input
                  type="email"
                  id="signup-email"
                  placeholder="Enter your email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  placeholder="Enter your password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-phone">Mobile Number</label>
                <input
                  type="number"
                  id="signup-phone"
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
  );
};

export default Login;
