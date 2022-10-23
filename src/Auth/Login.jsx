import React from "react";
import { Button } from "react-bootstrap";
import "./login.css";

function login() {
  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const res = Object.fromEntries(data.entries());
    if (res.username == "kvs" && res.password == "kvsagro") {
      document.cookie = `isLogin=true;`;
      document.cookie = `date=${new Date().getDate()};`;
      window.location.reload();
      console.log("logged in");
    } else {
      console.log("invalid input");

      document.getElementById("invalidInput").style.display = "block";
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleLogin} className="contain">
        <h3 style={{ margin: "1rem", color: "white" }}>Login</h3>
        <input name="username" type="text" placeholder="UserName..?" />
        <input name="password" type="password" placeholder="Password..?" />
        {/* <Button variant="dark">Login</Button> */}
        <span id="invalidInput" style={{ color: "red", fontSize: "1rem" }}>
          Invalid input!!!
        </span>
        <button>Login</button>
      </form>
    </div>
  );
}

export default login;
