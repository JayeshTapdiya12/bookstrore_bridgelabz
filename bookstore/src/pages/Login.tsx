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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

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

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup states
  const [fullName, setFullName] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const sendLogin = async () => {
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: "Please enter both email and password.",
        severity: "warning",
      });
      return;
    }
    try {
      await loginService(email, password);
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbar({
        open: true,
        message: "Login failed. Please check your credentials.",
        severity: "error",
      });
    }
  };

  const sendSign = async () => {
    if (!fullName || !lastname || !signupEmail || !signupPassword || !phone) {
      setSnackbar({
        open: true,
        message: "Please enter all signup details.",
        severity: "warning",
      });
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
      setSnackbar({
        open: true,
        message: res.data.message || "Signup successful!",
        severity: "success",
      });
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Signup failed:", error);
      setSnackbar({
        open: true,
        message: "Signup failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <CustomTabPanel value={value} index={0}>
        <div className="login-container">
          <div className="login-left">
            <img
              src={image}
              alt="Online Book Shopping"
              className="login-image"
            />
            <p>ONLINE BOOK SHOPPING</p>
          </div>
          <div className="login-right">
            <div className="login-box">
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="login-signup-tabs"
                className="tabs"
              >
                <Tab
                  label="Login"
                  {...a11yProps(0)}
                  style={{
                    fontWeight: "900",
                    fontSize: "15px",
                    color: "black",
                  }}
                />
                <Tab
                  label="SignUp"
                  {...a11yProps(1)}
                  style={{ marginLeft: "100px", color: "black" }}
                />
              </Tabs>

              <div className="input-group">
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
            />
            <p>ONLINE BOOK SHOPPING</p>
          </div>
          <div className="signup-right">
            <div className="signup-box">
              <Tabs value={value} onChange={handleTabChange}>
                <Tab
                  label="Login"
                  {...a11yProps(0)}
                  style={{ color: "black" }}
                />
                <Tab
                  label="SignUp"
                  {...a11yProps(1)}
                  style={{
                    fontWeight: "900",
                    marginLeft: "100px",
                    fontSize: "15px",
                    color: "black",
                  }}
                />
              </Tabs>

              <div className="input-group">
                <label htmlFor="signup-firstname">First Name</label>
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
