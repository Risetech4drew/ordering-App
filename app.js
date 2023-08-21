import { menuArray } from "./data.js";
const customerFormDetails = document.getElementById("customer-details");

const ordersArray = [];
let pizzaCount = 0;
let hamburgerCount = 0;
let beerCount = 0;

document.addEventListener("click", function (e) {
  if (e.target.dataset.itemId) {
    handleAddItemClick(e.target.dataset.itemId);
  } else if (e.target.dataset.removeItem) {
    removeItem(e.target.dataset.removeItem);
  } else if (e.target.id === "purchase-btn") {
    handlePurchaseBtn();
  } else if (e.target.id === "reload-btn") {
    reloadPage();
  } else if (e.target.id === "close-modal-btn") {
    closePaymentModal();
  }
});
function closePaymentModal() {
  document.getElementById("payment-modal").style.display = "none";
}
function reloadPage() {
  window.location.reload();
}
customerFormDetails.addEventListener("submit", function (e) {
  e.preventDefault();
  const customerFormData = new FormData(customerFormDetails);

  const name = customerFormData.get("customerName");

  document.getElementById("payment-modal").style.display = "none";

  document.getElementById("orderList").innerHTML = `
  <div class="message-container">
    <p class="message-text">Thanks, ${name}! Your order is on its way!</p>
  </div>
  <button class="reload-btn" id="reload-btn">New order</button>`;
});

function handlePurchaseBtn() {
  document.getElementById("payment-modal").style.display = "inline";
}

function handleAddItemClick(itemId) {
  const selectedItem = menuArray.filter(function (item) {
    return item.id === parseInt(itemId);
  })[0];

  if (selectedItem) {
    if (!ordersArray.includes(selectedItem)) {
      ordersArray.push(selectedItem);
    } else if (ordersArray.includes(selectedItem)) {
      handleTotalPricePerItem(selectedItem);
      handleQuantityCount(selectedItem);
    }

    renderCart();
    getTotalPrice();
  }
}
function handleQuantityCount(item) {
  if (item.name === "Pizza") {
    item.quantity += 1;
  } else if (item.name === "Hamburger") {
    item.quantity += 1;
  } else if (item.name === "Beer") {
    item.quantity += 1;
  }
}

function handleTotalPricePerItem(item) {
  if (item.name === "Pizza") {
    item.price += 14;
  } else if (item.name === "Hamburger") {
    item.price += 12;
  } else if (item.name === "Beer") {
    item.price += 12;
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
  const targetItem = ordersArray.find(function (item) {
    return item.id === parseInt(itemId);
  });
  if (targetItem.quantity > 0 && targetItem.price > 0) {
    decreaseQuantityCount(targetItem);
    decreaseTotalItemCost(targetItem);
  } else if (targetItem.quantity <= 1 && targetItem.price <= 1) {
    const itemIndex = ordersArray.indexOf(targetItem);
    ordersArray.splice(itemIndex, 1);
  }

  renderCart();
  updateTotalPrice();

  // const itemIndex = ordersArray.findIndex(function (item) {
  //   return item.id === parseInt(itemId);
  // });
  // ordersArray.splice(itemIndex, 1);
  // if (ordersArray.length === 0) {
  //   document.getElementById("orderList").style.display = "none";
  // } else {
  //   renderCart();
  //   updateTotalPrice();
  // }
}
function decreaseTotalItemCost(item) {
  if (item.name === "Pizza") {
    item.price -= 14;
  } else if (item.name === "Hamburger") {
    item.price -= 12;
  } else if (item.name === "Beer") {
    item.price -= 12;
  }
}
function decreaseQuantityCount(item) {
  if (item.name === "Pizza") {
    item.quantity -= 1;
  } else if (item.name === "Hamburger") {
    item.quantity -= 1;
  } else if (item.name === "Beer") {
    item.quantity -= 1;
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
      <p class="item-name">${item.name}<button class="remove-item-btn" data-remove-item="${item.id}">remove</button></p>
      <p class="quantity-count-text">x${item.quantity}</p>
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
