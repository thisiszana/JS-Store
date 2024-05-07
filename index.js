import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunction.js";

const loginBtn = document.getElementById("login");
const dashboardBtn = document.getElementById("dashboard");
const mainProducts = document.getElementById("products");

const showProducts = (products) => {
  mainProducts.innerHTML = "";

  products.forEach((product) => {
    const jsx = `
         <div>
            <img src=${product.image} alt=${product.title}/>
            <h4>${shortenText(product.title)}</h4>
            <div id="price">
            <p>${product.price}</p>
            <button>
                Buy
                <i class="fa-solid fa-cart-shopping"></i>
            </button>
            </div>
            <div id="rate">
                <i class="fa-solid fa-star"></i>
                <span>${product.rating.rate}</span>
            </div>
            <div id="count">
                <i class="fa-solid fa-user"></i>
                <span>${product.rating.count}</span>
            </div>
         </div>
        `;
    mainProducts.innerHTML += jsx;
  });
};

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginBtn.style.display = "none";
  } else {
    dashboardBtn.style.display = "none";
  }

  const allProducts = await getData("products");

  showProducts(allProducts);
};

document.addEventListener("DOMContentLoaded", init);
