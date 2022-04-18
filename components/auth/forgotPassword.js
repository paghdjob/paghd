import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GetApi, PostApi } from "../webApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    let userDetails = {
      email: email,
    };
    console.log(userDetails);
    userIdentify(userDetails);
    event.preventDefault();
  };
  const forgotPwd = (userID) => {
    GetApi(`v2/auth/EmailTemplate.php?type=FORGOTPASSWORD&userID=${userID}`)
  };
  const userIdentify = async (userDetails) => {
    if (userDetails.email !== "") {
      const res = await PostApi("https://www.paghd.com/v2/auth/forgot-password.php", userDetails)
      setMessage(res.msg);
      forgotPwd(res.userID);
    }
  };

  return (
    <div id="login-overlay" className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">
            Forgot Password
          </h4>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                required
              />
            </div>
            {message}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-info"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
