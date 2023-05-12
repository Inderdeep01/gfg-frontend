import React from "react";
import './ResetPassword.css'

const ResetPassword = () => {
  return (
    <div class="mainDiv">
      <div class="cardStyle">
        <form action="" method="post" name="signupForm" id="signupForm">
          <img src="/img/IPBS.png" id="signupLogo" />

          <h2 class="formTitle">Reset Password</h2>

          <div class="inputDiv">
            <label class="inputLabel" for="password">
              New Password
            </label>
            <input type="password" id="password" name="password" required />
          </div>

          <div class="inputDiv">
            <label class="inputLabel" for="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>

          <div class="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              onclick="validateSignupForm()"
              class="submitButton pure-button pure-button-primary"
            >
              <span>Continue</span>
              {/* <span id="loader"></span> */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;