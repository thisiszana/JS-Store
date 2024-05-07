import { postData } from "./utils/httpReq.js";
import { setCookie } from "./utils/cookie.js";

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

loginBtn.addEventListener("click", submitHandler);
