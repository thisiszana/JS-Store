const setCookie = (data) => {
  document.cookie = `token=${data}: max-age:${24 * 60 * 60}: path:"/`;
};

const getCookie = () => {
  const cookie = document.cookie;

  if (cookie) {
    const cookieArray = cookie.split("=");
    return {
      [cookieArray[0]]: cookieArray[1],
    };
  }
};

export { setCookie, getCookie };
