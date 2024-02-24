document.addEventListener("DOMContentLoaded", function () {
    displayProductsFromLocalStorage();
    updateCartItemCountDisplay();
});

function displayProductsFromLocalStorage() {
    let productList = document.getElementById('productList');
    let products = getProductsFromLocalStorage();

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="buyProduct('${product.title}', ${product.price})">Buy</button>
        `;
        productList.appendChild(productDiv);
    });
}

function buyProduct(productTitle, productPrice) {
    alert(`You have purchased ${productTitle}`);
    addToCart(productTitle, productPrice);
    updateCartItemCountDisplay();
}

function addToCart(productTitle, productPrice) {
    let cartItemCount = parseInt(localStorage.getItem('cartItemCount') || '0');
    cartItemCount++;
    localStorage.setItem('cartItemCount', cartItemCount.toString());

    // You can store more details about the purchased item in the cart if needed
    localStorage.setItem(`cartItem${cartItemCount - 1}_title`, productTitle);
    localStorage.setItem(`cartItem${cartItemCount - 1}_price`, productPrice.toString());
}

function updateCartItemCountDisplay() {
    let cartItemCount = parseInt(localStorage.getItem('cartItemCount') || '0');
    let cartItemCountDisplay = document.getElementById('cartItemCount');
    cartItemCountDisplay.textContent = cartItemCount.toString();
}

function redirectToCheckout() {
    window.location.href = "checkedinpage.html";
}

function showLogoutPopup() {
    let logoutPopup = document.getElementById('logoutPopup');
    logoutPopup.style.display = 'block';
}

function hideLogoutPopup() {
    let logoutPopup = document.getElementById('logoutPopup');
    logoutPopup.style.display = 'none';
}

function logout() {
    alert('Logging out');
    window.location.href = "home.html";
}

function getProductsFromLocalStorage() {
    let products = [
        { title: 'Shoes', description: 'Up to 10% off', price: 250-500 },
        { title: 'Jens', description: 'Up to 20% off', price: 450-1000 },
        { title: 'Shirts', description: 'Up to 30% off', price: 320-1000 }
    ];

    localStorage.setItem('productCount', products.length.toString());

    products.forEach((product, index) => {
        Object.keys(product).forEach(key => {
            localStorage.setItem(`product${index}_${key}`, product[key]);
        });
    });

    return products;
}
