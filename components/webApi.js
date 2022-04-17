import Cookies from "universal-cookie";
const cookies = new Cookies();
const auth = cookies.get("auth");
const userID = cookies.get("userID");

const GetApi = (api) => {
  const apicall = fetch(api, {
    method: "GET",
    headers: {
      Authorization: auth,
      userID: userID,
    },
  }).then((res) => res.json());
  apicall && apicall.msg
    ? (document.getElementById("toast-body").innerHTML = apicall.msg)
    : "";
  return apicall;
};

const PostApi = async (api, data) => {
  const apicall = await fetch(api, {
    method: "POST",
    headers: {
      Authorization: auth,
      userID: userID,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  apicall && apicall.msg
    ? (document.getElementById("toast-body").innerHTML = apicall.msg)
    : "";
  return apicall;
};

export { GetApi, PostApi };
