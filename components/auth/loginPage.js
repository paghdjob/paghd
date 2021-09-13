import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = (event) => {
    let userDetails = {
      email: email,
      pwd: pwd,
      web: 1,
    };
    console.log(userDetails);
    userIdentify(userDetails);
    event.preventDefault();
  };
  const userWebSetting = (userID, auth) => {
    const cookies = new Cookies();
    cookies.set('userID', userID, { path: '/', maxAge: 25929999 });
    cookies.set('auth', auth, { path: '/', maxAge: 25929999 });
    window.location.href = '/';
  }
  const userIdentify = (userDetails) => {
    if (userDetails.email !== "") {
      fetch("https://www.paghd.com/v2/auth/login.php", {
        method: "POST",
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // console.log("result--", result);
            setMessage(result.msg);
            if(result.userID && result.auth) {
              userWebSetting(result.userID, result.auth);
            }
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
            Login with paghd.com
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
              <div className="form-text">
                We will never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPwd(e.target.value)}
                name="pwd"
                value={pwd}
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
