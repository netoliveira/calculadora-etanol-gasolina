"use strict";

// [BEGIN] formataPreco
function formataPreco(preco) {
  // Remove caracteres não numéricos
  var valor = preco.value.replace(/\D/g, ''); // Formata como moeda

  valor = (parseFloat(valor) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }); // Atualiza o valor no campo

  preco.value = valor;
} // [END] formataPreco
// [BEGIN] formatarNumero


function formatarNumero(numero) {
  // Converte o número para uma string e substitui ',' por '.'
  var numeroFormatado = numero.match(/\d+/g).toString().replace(',', '.'); // Retorna o número formatado

  return numeroFormatado;
} // [END] formatarNumero
// [BEGIN] formataConsumo


function formataConsumo(consumo) {
  // Remove caracteres não numéricos
  var valor = consumo.value.replace(/[^0-9.]/g, ''); // Garante que há apenas um ponto decimal

  valor = valor.replace(/(\..*)\./g, '$1'); // Limita a duas casas decimais

  var partes = valor.split('.');

  if (partes.length > 1) {
    valor = "".concat(partes[0], ".").concat(partes[1].slice(0, 2));
  } // Atualiza o valor no campo


  consumo.value = valor;
} // [END] formataConsumo
// [BEGIN] messageResult


function messageResult(result) {
  var messageResult = document.getElementById('messageResult');
  var messageResultChild = document.querySelector('#messageResult p');
  messageResult.removeChild(messageResultChild);
  messageResult.innerHTML = "<p>Abaste\xE7a com ".concat(result, "</p>");
} // [END] messageResult
// [BEGIN] calculadoraEtanolGasolina


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
    var etanolConsumo = document.getElementById('etanolConsumo').value; // let mediaEtanol = newEtanolPreco / etanolConsumo

    var gasolinaPreco = document.getElementById('gasolinaPreco').value;
    var newGasolinalPreco = formatarNumero(gasolinaPreco);
    var gasolinaConsumo = document.getElementById('gasolinaConsumo').value; // let mediaGasolina = newGasolinalPreco / gasolinaConsumo

    var mediaConsumo = (etanolConsumo / gasolinaConsumo).toFixed(2);
    var mediaBaseCalculo = (mediaConsumo - mediaConsumo / 100).toFixed(2);
    var mediaValor = (newEtanolPreco / newGasolinalPreco).toFixed(2);

    if (mediaValor < mediaBaseCalculo) {
      messageResult('Etanol');
    }

    if (mediaValor == mediaBaseCalculo) {
      messageResult('Etanol ou Gasolina');
    }

    if (mediaValor > mediaBaseCalculo) {
      messageResult('Gasolina');
    }
  });
} // [END] calculadoraEtanolGasolina
// [BEGIN] refresh


function refresh() {
  location.reload();
} // [END] refresh