import React from "react";
import bg from "../../assests/bg-img.jpg";

function Logo() {
  return (
    <div>
      <img
        src={bg}
        alt="ji"
        style={{ objectFit: "cover", height: "90vh", width: "100%" }}
      ></img>
    </div>
  );
}

export default Logo;
