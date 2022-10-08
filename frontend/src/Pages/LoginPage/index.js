import React, { useState, useEffect } from "react";
import "./login.css";
import { ChildLogin, ChildSignUp } from "../../Components";

export const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="login-box">
      {showSignUp ? (
        <ChildSignUp setShowSignUp={setShowSignUp} />
      ) : (
        <ChildLogin setShowSignUp={setShowSignUp} />
      )}
    </div>
  );
};
