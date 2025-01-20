let productPricesArray = [];

function getItems() {
    const items = document.getElementsByTagName('option');
    const selectedIndex = document.getElementById('produto').selectedIndex;
    return items[selectedIndex].value;
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
    let existingQuantity = Math.round(parseFloat(cartItem.querySelector('.texto-azul:first-child').innerText));
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
    let price = Math.round(parseFloat(item[1].replace('R$', '')));
    let quantity = Math.round(parseFloat(getQuantity()));
    const cart = getCart()[0];

    let existingItem = findCartItem(cart, name);

    if (existingItem) {
        let newPrice = updateCartItem(existingItem, price, quantity);

        let index = Array.from(cart.getElementsByClassName('carrinho__produtos__produto'))
            .indexOf(existingItem);
        productPricesArray[index] = newPrice;
    } else {
        createNewCartItem(cart, name, price, quantity);
    }
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
