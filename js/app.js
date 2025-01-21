let productPricesArray = [];
let cartItems = [];
let nextId = 0;

function initialInput() {
    return document.getElementById('quantidade').value = 0;
}

function getItems() {
    const items = document.getElementsByTagName('option');
    const selectedIndex = document.getElementById('produto').selectedIndex;
    return items[selectedIndex].value;
}

function getQuantity() {
    return document.getElementById('quantidade').value;
}

function getCart() {
    return document.getElementsByClassName('carrinho__produtos')[0];
}

function findCartItem(cart, name) {
    return Array.from(cart.getElementsByClassName('carrinho__produtos__produto'))
        .find(cartItem => cartItem.textContent.includes(name));
}

function updateCartItem(cartItem, price, quantity, index) {
    let existingQuantity = Math.round(parseFloat(cartItem.querySelector('.texto-azul:first-child').innerText));
    let newQuantity = existingQuantity + quantity;
    let newPrice = price * newQuantity;

    cartItem.querySelector('.texto-azul:first-child').innerText = `${newQuantity}x`;
    cartItem.querySelector(':nth-child(2)').innerText = `R$${newPrice}`;

    cartItems[index].quantity = newQuantity;
    cartItems[index].totalPrice = newPrice;
    productPricesArray[index] = newPrice;
    return newPrice;
}

function createRemoveButton(id) {
    const button = document.createElement('button');
    button.innerText = 'X';
    button.classList.add('remove-button');
    button.addEventListener('click', () => removeCartItem(id));
    return button;
}

function createNewCartItem(cart, name, price, quantity) {
    let totalValue = price * quantity;
    let id = nextId++;
    productPricesArray.push(totalValue);

    cartItems.push({ id, name, quantity, price, totalPrice: totalValue });

    const cartItem = document.createElement('section');
    cartItem.classList.add('carrinho__produtos__produto');
    cartItem.setAttribute('data-id', id);
    cartItem.innerHTML = `<span class="texto-azul">${quantity}x</span> ${name} <span class="texto-azul">R$${totalValue}</span>`;
    
    const removeButton = createRemoveButton(id);
    cartItem.appendChild(removeButton);

    cart.appendChild(cartItem);
    updateTotal();
}

function createItemCart() {
    let item = getItems().split(' - ');
    let name = item[0];
    let price = Math.round(parseFloat(item[1].replace('R$', '')));
    let quantity = Math.round(parseFloat(getQuantity()));
    const cart = getCart();

    let existingItem = findCartItem(cart, name);

    if (existingItem) {
        let index = cartItems.findIndex(cartItem => cartItem.name === name);
        if (index !== -1) {
            updateCartItem(existingItem, price, quantity, index);
        }
    } else {
        createNewCartItem(cart, name, price, quantity);
    }
    updateTotal();
}


function removeCartItem(id) {
    const cart = getCart();
    const cartItem = cart.querySelector(`.carrinho__produtos__produto[data-id='${id}']`);
    
    const index = cartItems.findIndex(item => item.id === id);
    if (index > -1) {
        productPricesArray.splice(index, 1);
        cartItems.splice(index, 1);
        cart.removeChild(cartItem);
        updateTotal();
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
    initialInput();
}

function limpar() {
    const cart = getCart();
    cart.innerHTML = '';
    productPricesArray = [];
    cartItems = [];
    updateTotal();
    initialInput();
}

initialInput();
