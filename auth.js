import { postData } from "./utils/httpReq.js";
import { setCookie } from "./utils/cookie.js";
import authHandler from "./utils/authorization.js";

const inputsBox = document.querySelectorAll("input");
const loginBtn = document.querySelector("button");

const submitHandler = async (e) => {
  e.preventDefault();

  const username = inputsBox[0].value;
  const password = inputsBox[1].value;

  const res = await postData("auth/login", { username, password });

  setCookie(res.token);
  location.assign("/");
};

const init = () => {
  authHandler()
};

loginBtn.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", init);
