// [BEGIN] formataPreco
function formataPreco(preco) {
	// Remove caracteres não numéricos
	let valor = preco.value.replace(/\D/g, '')

	// Formata como moeda
	valor = (parseFloat(valor) / 100).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	})

	// Atualiza o valor no campo
	preco.value = valor
}
// [END] formataPreco

// [BEGIN] formatarNumero
function formatarNumero(numero) {
	// Converte o número para uma string e substitui ',' por '.'
	let numeroFormatado = numero.match(/\d+/g).toString().replace(',', '.')

	// Retorna o número formatado
	return numeroFormatado
}
// [END] formatarNumero

// [BEGIN] formataConsumo
function formataConsumo(consumo) {
	// Remove caracteres não numéricos
	let valor = consumo.value.replace(/[^0-9.]/g, '')

	// Garante que há apenas um ponto decimal
	valor = valor.replace(/(\..*)\./g, '$1')

	// Limita a duas casas decimais
	const partes = valor.split('.')
	if (partes.length > 1) {
		valor = `${partes[0]}.${partes[1].slice(0, 2)}`
	}

	// Atualiza o valor no campo
	consumo.value = valor
}
// [END] formataConsumo

// [BEGIN] messageResult
function messageResult(result) {
	let messageResult = document.getElementById('messageResult')
	let messageResultChild = document.querySelector('#messageResult p')
	messageResult.removeChild(messageResultChild)
	messageResult.innerHTML = `<p>Abasteça com ${result}</p>`
}
// [END] messageResult

// [BEGIN] calculadoraEtanolGasolina
function calculadoraEtanolGasolina() {
	let calculadoraEtanolGasolina = document.getElementById(
		'calculadoraEtanolGasolina'
	)
	calculadoraEtanolGasolina.addEventListener('submit', (e) => {
		e.preventDefault()

		let btnSubmit = document.getElementById('btnSubmit')
		btnSubmit.classList.toggle('closed')

		let btnReset = document.getElementById('btnReset')
		btnReset.classList.toggle('closed')

		let etanolPreco = document.getElementById('etanolPreco').value
		let newEtanolPreco = formatarNumero(etanolPreco)
		let etanolConsumo = document.getElementById('etanolConsumo').value
		// let mediaEtanol = newEtanolPreco / etanolConsumo

		let gasolinaPreco = document.getElementById('gasolinaPreco').value
		let newGasolinalPreco = formatarNumero(gasolinaPreco)
		let gasolinaConsumo = document.getElementById('gasolinaConsumo').value
		// let mediaGasolina = newGasolinalPreco / gasolinaConsumo

		let mediaConsumo = (etanolConsumo / gasolinaConsumo).toFixed(2)
		let mediaBaseCalculo = (mediaConsumo - mediaConsumo / 100).toFixed(2)

		let mediaValor = (newEtanolPreco / newGasolinalPreco).toFixed(2)

		if (mediaValor < mediaBaseCalculo) {
			messageResult('Etanol')
		}
		if (mediaValor == mediaBaseCalculo) {
			messageResult('Etanol ou Gasolina')
		}
		if (mediaValor > mediaBaseCalculo) {
			messageResult('Gasolina')
		}
	})
}
// [END] calculadoraEtanolGasolina

// [BEGIN] refresh
function refresh() {
	location.reload()
}
// [END] refresh
