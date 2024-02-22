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

function formatarNumero(numero) {
	// Converte o número para uma string e substitui ',' por '.'
	let numeroFormatado = numero.match(/\d+/g).toString().replace(',', '.')

	// Retorna o número formatado
	return numeroFormatado
}

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

function messageResult(result) {
	let messageResult = document.getElementById('messageResult')
	let messageResultChild = document.querySelector('#messageResult p')
	messageResult.removeChild(messageResultChild)
	messageResult.innerHTML = `<p>Abasteça com ${result}</p>`
}

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
		let mediaEtanol = newEtanolPreco / etanolConsumo

		let gasolinaPreco = document.getElementById('gasolinaPreco').value
		let newGasolinalPreco = formatarNumero(gasolinaPreco)
		let gasolinaConsumo = document.getElementById('gasolinaConsumo').value
		let mediaGasolina = newGasolinalPreco / gasolinaConsumo

		if (mediaEtanol < mediaGasolina) {
			messageResult('Etanol')
		} else {
			messageResult('Gasolina')
		}
	})
}

function refresh() {
	location.reload()
}
