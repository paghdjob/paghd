import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

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

  const userIdentify = (userDetails) => {
    if (userDetails.email !== "") {
      fetch("https://www.paghd.com/v2/auth/forgot-password.php", {
        method: "POST",
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // console.log("result--", result);
            setMessage(result.msg);
          },
          (error) => {
            setMessage(error);
            console.log("error--", error);
          }
        );
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
