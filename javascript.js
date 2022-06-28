//Definicao das variaveis globais
let altura = 0
let largura = 0
let vida = 3
let tempoDeGeracao = 2000
let tempo = 20
//Obtem a altura e a largura da janela do navegador para fazer a definicao da area onde os mosquitos podem ser gerados
function ajustaTamanhoDisplay() {
	altura = window.innerHeight
	largura = window.innerWidth
}

ajustaTamanhoDisplay()

//Inicio do jogo e selecao do nivel de dificuldade
function iniciarJogo() {
	let nivel = document.getElementById('nivel').value
	if (nivel == '') {
		alert('Selecione um nível antes para continuar!')
		return false
	}
	else {
		window.location.href = 'mata_mosquito.html?' + nivel
	}
}

//Funcao que remove o mosquito e faz o decremento da vida do jogador
function removeMosquito() {
	if (document.getElementById('mosquito') != null) {
		document.getElementById('mosquito').remove()
		document.getElementById(vida).src = 'imagens/coracao_vazio.png'
		vida--
	}
	if (vida == 0) {
		window.location.href = "gameover.html"
	}
}
//Funcao que faz a verificacao da vida do jogador
function gameOver() {
	if (vida == 0) {
		window.location.href = "gameover.html"
	}
}

//Funcao responsavel por adicionar o mosquito na pagina
function geraMosquito() {
	removeMosquito()
	gameOver()
	let posicaoX = (Math.floor(Math.random() * largura)) - 90
	let posicaoY = (Math.floor(Math.random() * altura)) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	//Adicionar elemento Html
	let mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoMosquito() + ' ' + ladoAladoB()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function () {
		this.remove()
	}
	document.body.appendChild(mosquito)
}

//Faz a execucao do jogo
if (window.location.href.indexOf('index') === -1) {
	let link = window.location.search
	switch (link) {
		case ('?normal'):
			tempoDeGeracao = 2000
			break
		case ('?dificil'):
			tempoDeGeracao = 1400
		case ('?hardcore'):
			tempoDeGeracao = 1100
			break
	}
	let criaMosca = setInterval(function () { geraMosquito() }, tempoDeGeracao)
	let tempoRestante = setInterval(function () {
		tempo--
		if (tempo <= 0) {
			clearInterval(tempoRestante)
			clearInterval(criaMosca)
			window.location.href = "vitoria.html"
		}
		document.getElementById('cronometro').innerHTML = tempo
	}, 1000)
}

//Essa parte so funciona na pagina do mata_mosquito.html, por isso utilizo um try para pevenir erros no console
try {
	document.getElementById('cronometro').innerHTML = tempoRestante
	document.getElementById('area').style.width = largura + 'px'
	document.getElementById('area').style.height = altura + 'px'
}
catch (e) { }

//Funcao que determina o tamanho do mosquito que sera gerado
function tamanhoMosquito() {
	let classe = Math.floor(Math.random() * 3)

	switch (classe) {
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

//Funcao que determina se o mosquito sera gerado espelhado ou nao
function ladoAladoB() {
	let classe = Math.floor(Math.random() * 2)

	switch (classe) {
		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}