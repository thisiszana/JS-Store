const setCookie = (data) => {
  document.cookie = `token=${data}: max-age:${24 * 60 * 60}: path:"/`;
};

export { setCookie };
