import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunction.js";

let allProducts = null;

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

const searchHandler = () => {
  const query = inputBox.value.trim().toLowerCase();

  if (!query) return showProducts(allProducts);

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  showProducts(filteredProducts);
};

const filterHandler = (e) => {
  const category = e.target.innerText.toLowerCase();

  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });

  if (category === "all") return showProducts(allProducts);

  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === category
  );

  showProducts(filteredProducts);
};

document.addEventListener("DOMContentLoaded", init);
searchBtn.addEventListener("click", searchHandler);
listItems.forEach((li) => li.addEventListener("click", filterHandler));
