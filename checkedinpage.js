document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
    calculateTotalAmount();
});

function displayCartItems() {
    let cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";
    let cartItemCount = parseInt(localStorage.getItem("cartItemCount") || "0");

    for (let i = 0; i < cartItemCount; i++) {
        let product = {
            title: localStorage.getItem(`cartItem${i}_title`),
            price: parseFloat(localStorage.getItem(`cartItem${i}_price`) || "0.00"),
            quantity: parseInt(localStorage.getItem(`cartItem${i}_quantity`) || "0")
        };

        let cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <div>${product.title}</div>
            <div>
                <button onclick="removeItem(${i})">Remove</button>
                <button onclick="decreaseQuantity(${i})">-</button>
                <span>${product.quantity}</span>
                <button onclick="increaseQuantity(${i})">+</button>
                <span>$${(product.price * product.quantity).toFixed(2)}</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    }
}

function calculateTotalAmount() {
    let totalAmount = 0;
    let cartItemCount = parseInt(localStorage.getItem("cartItemCount") || "0");

    for (let i = 0; i < cartItemCount; i++) {
        let productPrice = parseFloat(localStorage.getItem(`cartItem${i}_price`) || "0.00");
        let productQuantity = parseInt(localStorage.getItem(`cartItem${i}_quantity`) || "0");
        totalAmount += productPrice * productQuantity;
    }

    let totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

function removeItem(index) {
    localStorage.removeItem(`cartItem${index}_title`);
    localStorage.removeItem(`cartItem${index}_price`);
    localStorage.removeItem(`cartItem${index}_quantity`);
    updateCartItemCount();
    displayCartItems();
    calculateTotalAmount();
}

function decreaseQuantity(index) {
    let currentQuantity = parseInt(localStorage.getItem(`cartItem${index}_quantity`) || "0");

    if (currentQuantity > 1) {
        localStorage.setItem(`cartItem${index}_quantity`, (currentQuantity - 1).toString());
        displayCartItems();
        calculateTotalAmount();
    }
}

function increaseQuantity(index) {
    let currentQuantity = parseInt(localStorage.getItem(`cartItem${index}_quantity`) || "0");
    localStorage.setItem(`cartItem${index}_quantity`, (currentQuantity + 1).toString());
    displayCartItems();
    calculateTotalAmount();
}

function placeOrder() {
    let orderConfirmation = document.getElementById("orderConfirmation");
    orderConfirmation.style.display = "block";
    clearCart();
    let checkoutSummary = document.querySelector(".checkout-summary");
    checkoutSummary.style.display = "none";
}

function clearCart() {
    let cartItemCount = parseInt(localStorage.getItem("cartItemCount") || "0");

    for (let i = 0; i < cartItemCount; i++) {
        localStorage.removeItem(`cartItem${i}_title`);
        localStorage.removeItem(`cartItem${i}_price`);
        localStorage.removeItem(`cartItem${i}_quantity`);
    }

    updateCartItemCount();
    displayCartItems();
}

function redirectToDashboard(){
    window.location.href = "dashboard.html";
}
