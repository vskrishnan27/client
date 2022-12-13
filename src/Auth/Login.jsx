import React from "react";
import "./login.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("logincheck");
    if (userName == "kvs" && password == "kvsagro") {
      document.cookie = `isLogin=true;`;
      document.cookie = `date=${new Date().getDate()};`;
      window.location.reload();
      console.log("logged in");
    } else {
      console.log("invalid input");
      // document.getElementById("invalidInput").style.display = "block";
    }
  };

  return (
    <div className="container-login">
      <div className="card">
        <div className="left-container">
          <img src={require("../assests/login-left-img.jpg")} />
        </div>
        <div className="right-container">
          <div className="forms">
            <div className="logo">
              {/* <img style={background:"black"} /> */}
              <h4>KVS Inventory Management</h4>
            </div>
            <div className="main-social-container">
              <div className="social-logins">
                <a style={{ textTransform: "none" }}>
                  <img
                    style={{
                      width: "20px",
                      marginBottom: "3px",
                      marginRight: "5px",
                    }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    alt="google sign-in "
                  />
                  Login with Google
                </a>
              </div>
            </div>
            <hr />
            <div className="sign-in-container">
              <h6>Sign into your account </h6>
              <input
                type="email"
                placeholder="Email address"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button variant="secondary" onClick={handleLogin}>
                Login
              </Button>
              <button
                id="forgot-password"
                onClick={() => console.log("forgot")}
                style={{ display: "none", marginTop: "3rem" }}
              ></button>
              <label htmlFor="forgot-password">Forgot Password?</label>

              <div className="signup-redirect">
                <p>Don't have an account?</p>
                <button
                  id="register-btn"
                  onClick={() => console.log("register")}
                  style={{ display: "none" }}
                ></button>
                <p htmlFor="register-btn">&nbsp;Register here</p>
              </div>

              <p id="terms-of-use">Terms of use. Privacy policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
