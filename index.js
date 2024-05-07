import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunction.js";

let allProducts = null;
let search = "";
let category = "all";

const loginBtn = document.getElementById("login");
const dashboardBtn = document.getElementById("dashboard");
const mainProducts = document.getElementById("products");
const searchBtn = document.querySelector("button");
const inputBox = document.querySelector("input");
const listItems = document.querySelectorAll("li");

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

  allProducts = await getData("products");

  showProducts(allProducts);
};

const filterProducts = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });

  showProducts(filteredProducts);
};

const searchHandler = () => {
  search = inputBox.value.trim().toLowerCase();

  filterProducts();
};

const filterHandler = (e) => {
  category = e.target.innerText.toLowerCase();

  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });

  filterProducts();
};

document.addEventListener("DOMContentLoaded", init);
searchBtn.addEventListener("click", searchHandler);
listItems.forEach((li) => li.addEventListener("click", filterHandler));
