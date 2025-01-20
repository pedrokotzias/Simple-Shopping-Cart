/* <option value="Fone de ouvido - R$100">Fone de ouvido - R$100</option>
<option value="Celular - R$1400">Celular - R$1400</option>
<option value="Oculus VR - R$5000">Oculus VR - R$5000</option>

<input class="quantidade-input" id="quantidade" type="number" placeholder="100">

<button onclick="adicionar()" type="button" class="botao-form botao-adicionar">Adicionar</button>
<button onclick="limpar()" type="button" class="botao-form botao-limpar">Limpar</button>

<section class="carrinho__produtos__produto">

Total: <span class="texto-azul" id="valor-total">R$1400</span> */

function getCart() {
    return document.getElementsByClassName('carrinho__produtos__produto');
}

function getElements(i) {
    const items = document.getElementsByTagName('option');

    if (i >= 0 && i < items.length) {
        return items[i].value;
    }
}

function getQuantity() {
    return document.getElementById('quantidade').value;
}

function getTotal() {
    return document.getElementById('valor-total').innerText;
}

function adicionar() {
};

function limpar() {};