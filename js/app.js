/* <option value="Fone de ouvido - R$100">Fone de ouvido - R$100</option>
<option value="Celular - R$1400">Celular - R$1400</option>
<option value="Oculus VR - R$5000">Oculus VR - R$5000</option>

<input class="quantidade-input" id="quantidade" type="number" placeholder="100">

<button onclick="adicionar()" type="button" class="botao-form botao-adicionar">Adicionar</button>
<button onclick="limpar()" type="button" class="botao-form botao-limpar">Limpar</button>

<section class="carrinho__produtos__produto">

Total: <span class="texto-azul" id="valor-total">R$1400</span> */

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

function getTotal() {
    return document.getElementById('valor-total').innerText;
}

function sumTotalItemsPrice() {
    let item = getItems().split(' - R$');
    let price = item[1];
    let quantity = getQuantity();

    let totalValue = price * quantity;;
    return totalValue;
}

function createItemCart() {
    let item = getItems().split(' - ');
    let name = item[0];
    let price = sumTotalItemsPrice();
    let quantity = getQuantity();
    const cart = getCart()[0];

    const cartItem = document.createElement('section');
    cartItem.classList.add('carrinho__produtos__produto');
    cartItem.innerHTML = `<span class="texto-azul">${quantity}x</span> ${name} <span class="texto-azul">R$${price}</span>`;

    cart.appendChild(cartItem);
}


function adicionar() {
    createItemCart();
};

function limpar() {};