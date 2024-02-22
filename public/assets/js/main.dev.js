"use strict";

function formataPreco(preco) {
  // Remove caracteres não numéricos
  var valor = preco.value.replace(/\D/g, ''); // Formata como moeda

  valor = (parseFloat(valor) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }); // Atualiza o valor no campo

  preco.value = valor;
}

function formatarNumero(numero) {
  // Converte o número para uma string e substitui ',' por '.'
  var numeroFormatado = numero.match(/\d+/g).toString().replace(',', '.'); // Retorna o número formatado

  return numeroFormatado;
}

function formataConsumo(consumo) {
  // Remove caracteres não numéricos
  var valor = consumo.value.replace(/[^0-9.]/g, ''); // Garante que há apenas um ponto decimal

  valor = valor.replace(/(\..*)\./g, '$1'); // Limita a duas casas decimais

  var partes = valor.split('.');

  if (partes.length > 1) {
    valor = "".concat(partes[0], ".").concat(partes[1].slice(0, 2));
  } // Atualiza o valor no campo


  consumo.value = valor;
}

function messageResult(result) {
  var messageResult = document.getElementById('messageResult');
  var messageResultChild = document.querySelector('#messageResult p');
  messageResult.removeChild(messageResultChild);
  messageResult.innerHTML = "<p>Abaste\xE7a com ".concat(result, "</p>");
}

function calculadoraEtanolGasolina() {
  var calculadoraEtanolGasolina = document.getElementById('calculadoraEtanolGasolina');
  calculadoraEtanolGasolina.addEventListener('submit', function (e) {
    e.preventDefault();
    var btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.classList.toggle('closed');
    var btnReset = document.getElementById('btnReset');
    btnReset.classList.toggle('closed');
    var etanolPreco = document.getElementById('etanolPreco').value;
    var newEtanolPreco = formatarNumero(etanolPreco);
    var etanolConsumo = document.getElementById('etanolConsumo').value;
    var mediaEtanol = newEtanolPreco / etanolConsumo;
    var gasolinaPreco = document.getElementById('gasolinaPreco').value;
    var newGasolinalPreco = formatarNumero(gasolinaPreco);
    var gasolinaConsumo = document.getElementById('gasolinaConsumo').value;
    var mediaGasolina = newGasolinalPreco / gasolinaConsumo;

    if (mediaEtanol < mediaGasolina) {
      messageResult('Etanol');
    } else {
      messageResult('Gasolina');
    }
  });
}

function refresh() {
  location.reload();
}