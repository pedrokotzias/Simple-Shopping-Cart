let productPricesArray = [];

function getItems() {
    const items = document.getElementsByTagName('option');
    const selectedIndex = document.getElementById('produto').selectedIndex;
    return items[selectedIndex].value;
}

function getButtons(i) {
    const buttons = document.getElementsByTagName('button');

    if (i >= 0 && i < buttons.length) {
        return buttons[i];
    }
}

function getQuantity() {
    return document.getElementById('quantidade').value;
}

function getCart() {
    return document.getElementsByClassName('carrinho__produtos');
}

function findCartItem(cart, name) {
    return Array.from(cart.getElementsByClassName('carrinho__produtos__produto'))
        .find(cartItem => cartItem.textContent.includes(name));
}

function updateCartItem(cartItem, price, quantity) {
    let existingQuantity = parseInt(cartItem.querySelector('.texto-azul:first-child').innerText);
    let newQuantity = existingQuantity + quantity;
    let newPrice = price * newQuantity;

    cartItem.querySelector('.texto-azul:first-child').innerText = `${newQuantity}x`;
    cartItem.querySelector('.texto-azul:last-child').innerText = `R$${newPrice}`;

    return newPrice;
}

function createNewCartItem(cart, name, price, quantity) {
    let totalValue = price * quantity;
    productPricesArray.push(totalValue);

    const cartItem = document.createElement('section');
    cartItem.classList.add('carrinho__produtos__produto');
    cartItem.innerHTML = `<span class="texto-azul">${quantity}x</span> ${name} <span class="texto-azul">R$${totalValue}</span>`;

    cart.appendChild(cartItem);
}

function createItemCart() {
    let item = getItems().split(' - ');
    let name = item[0];
    let price = parseInt(item[1].replace('R$', ''));
    let quantity = parseInt(getQuantity());
    const cart = getCart()[0];

    // Check if the item already exists in the cart
    let existingItem = findCartItem(cart, name);

    if (existingItem) {
        // Update the existing item
        let newPrice = updateCartItem(existingItem, price, quantity);

        // Update the total price in the array
        let index = Array.from(cart.getElementsByClassName('carrinho__produtos__produto')).indexOf(existingItem);
        productPricesArray[index] = newPrice;
    } else {
        // Create new cart item
        createNewCartItem(cart, name, price, quantity);
    }
}

function sumTotalItemsPrice() {
    let item = getItems().split(' - R$');
    let price = item[1];
    let quantity = getQuantity();

    let totalValue = price * quantity;
    productPricesArray.push(totalValue);
    return totalValue;
}

function sumTotal() {
    let total = productPricesArray.reduce((acc, value) => acc + value, 0);
    return total;
}

function updateTotal() {
    const total = sumTotal();
    document.getElementById('valor-total').innerText = `R$${total}`;
}

function adicionar() {
    createItemCart();
    updateTotal();
}

function limpar() {
    const cart = getCart()[0];
    cart.innerHTML = '';
    productPricesArray = [];
    updateTotal();
}
