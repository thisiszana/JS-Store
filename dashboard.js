import authHandler from "./utils/authorization.js";

const init = () => {
  authHandler();
};

document.addEventListener("DOMContentLoaded", init);
