import React from "react";
import "./login.css";
import { Button } from "react-bootstrap";
function Login() {
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
              <input type="email" placeholder="Email address" />
              <input type="password" placeholder="Password" />
              <Button variant="secondary">Login</Button>
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
