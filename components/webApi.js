import Cookies from "universal-cookie";
const cookies = new Cookies();
//const userIds = cookies.get('userID');
const auth = cookies.get("auth");

const API_BASE_ADDRESS = "http://localhost:3000/v2/";
export default class WebApi {
  static getCall(endpoint) {
    const uri = API_BASE_ADDRESS + endpoint;
    console.log(uri);
    return fetch(uri, {
      method: "GET",
      headers: new Headers({
        Authorization: auth,
        key: "XRorSPF4k6AHa4rdcQ90ZgAAAAU",
        "Content-Type": "application/json",
      }),
    }).then((response) => response.json());
  }
  static postCall(endpoint, data) {
    const uri = API_BASE_ADDRESS + endpoint;
    return fetch(uri, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: "asdasdasdasd",
      }),
    });
    //.then(response => response.json())
    // .then(data => {
    //   ppp = data;
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
    // return ppp;
  }
}
