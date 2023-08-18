import { menuArray } from "./data.js";
const customerFormDetails = document.getElementById("customer-details");
const ordersArray = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.itemId) {
    handleAddItemClick(e.target.dataset.itemId);
  } else if (e.target.dataset.removeItem) {
    removeItem(e.target.dataset.removeItem);
  } else if (e.target.id === "purchase-btn") {
    handlePurchaseBtn();
  }
});
customerFormDetails.addEventListener("submit", function (e) {
  e.preventDefault();
  const customerFormData = new FormData(customerFormDetails);

  const name = customerFormData.get("customerName");

  document.getElementById("payment-modal").style.display = "none";

  document.getElementById("orderList").innerHTML = `
  <div class="message-container">
    <p class="message-text">Thanks, ${name}! Your order is on its way!</p>
  </div>`;
});

function handlePurchaseBtn() {
  document.getElementById("payment-modal").style.display = "inline";
}

function handleAddItemClick(itemId) {
  const selectedItem = menuArray.filter(function (item) {
    return item.id === parseInt(itemId);
  })[0];

  if (selectedItem) {
    ordersArray.push(selectedItem);
    renderCart();
    getTotalPrice();
  }
}
function getTotalPrice() {
  let sum = 0;

  ordersArray.forEach(function (item) {
    sum += item.price;
  });
  document.getElementById("total-el").innerText = `$${sum}`;
}

function removeItem(itemId) {
  const itemIndex = ordersArray.findIndex(function (item) {
    return item.id === parseInt(itemId);
  });

  ordersArray.splice(itemIndex, 1);
  if (ordersArray.length === 0) {
    document.getElementById("orderList").style.display = "none";
  } else {
    renderCart();
    updateTotalPrice();
  }
}
function updateTotalPrice() {
  let updatedTotal = 0;
  ordersArray.forEach(function (item) {
    updatedTotal += item.price;
  });
  document.getElementById("total-el").innerText = `$${updatedTotal}`;
}

function renderCart() {
  document.getElementById("orders-container").innerHTML = "";
  ordersArray.forEach(function (item) {
    document.getElementById("orders-container").innerHTML += `
    <div class="ordered-item">
      <p class="item-name" id="${item.id}">${item.name}<button class="remove-item-btn" data-remove-item="${item.id}">remove</button></p>
      <p><span class="item-price">$${item.price}</span></p>
    </div>`;
  });

  document.getElementById("orderList").style.display = "block";
}

function getMenu() {
  let menuList = "";
  menuArray.forEach(function (item) {
    menuList += `
        <div class="item">
            <div class="item-inner">
                <div class="item-graphic">${item.emoji}</div>
                <div class = "item-details">
                    <p class="item-title">${item.name}</p>
                    <p class="item-description">${getIngredients(
                      item.ingredients
                    )}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <div class="ellipse">
                <button class="add-btn" data-item-id="${item.id}">+</button>
                </div>
            </div>
        </div>
        <div class="divider"></div>`;
  });

  return menuList;
}

function getIngredients(ingredientsArr) {
  let ingredientsList = "";
  for (let ingredients of ingredientsArr) {
    ingredientsList += ingredients + ", ";
  }
  return ingredientsList;
}

function renderMenu() {
  document.getElementById("menu").innerHTML = getMenu();
}
renderMenu();
