import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

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
  const responseGoogle = (response) => {
    if (response.profileObj !== undefined) {
      let userDetails = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        profile: response.profileObj.imageUrl,
        web: 2,
      };
      userIdentify(userDetails);
    }
  };
  const responseFacebook = (response) => {
    if (response.email) {
      localStorage.setItem("facebook_access_token", response.accessToken);
      let userDetails = {
        name: response.name,
        email: response.email,
        profile: "",
        web: 2,
      };
      userIdentify(userDetails);
    } else {
      console.log(response);
    }
  };

  const userWebSetting = (userID, auth) => {
    const cookies = new Cookies();
    cookies.set("userID", userID, { path: "/", maxAge: 25929999 });
    cookies.set("auth", auth, { path: "/", maxAge: 25929999 });
    router.push(router.query.url ? router.query.url : "/");
  };
  const verifyEmail = (userID) => {
    fetch("v2/auth/EmailTemplate.php?type=EMAILVERIFY&userID=" + userID).then(
      (res) => res.json()
    );
  };
  const userIdentify = (userDetails) => {
    if (userDetails.email !== "") {
      fetch("/v2/auth/login.php", {
        method: "POST",
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // console.log("result--", result);
            setMessage(result.msg);
            if (result.userID && result.auth) {
              userWebSetting(result.userID, result.auth);
            }
            if (result.valid === false && result.userID) {
              verifyEmail(result.userID);
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
            <div className="form-group rows  text-center">
              <GoogleLogin
                // clientId="342562917774-o2l9cnfv8uj3csa9lqqmf44lbuhdciae.apps.googleusercontent.com"
                clientId="388495122825-7oh1fhvhdj2tok66blngln5v6rco50ms.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                buttonText="Login with google"
                className="btn btn-info m-2"
              />
              <FacebookLogin
                appId="194157765833233"
                autoLoad={false}
                fields="name,email,picture"
                onClick={responseFacebook}
                callback={responseFacebook}
                cssClass="btn btn-info m-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
