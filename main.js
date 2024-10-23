//1 declarei todas variaveis
let totalPf = document.getElementById('total-pf')
let primeiroLugar = document.getElementById('first-place')
let segundoLugar = document.getElementById('second-place')
let terceiroLugar = document.getElementById('third-place')
let quartoLugar = document.getElementById('fourth-place')
let quintoLugar = document.getElementById('fifth-place')
const botao = document.getElementById('bt')
botao.addEventListener('click', somar);

//função para pegar o valor de cada campo e multiplicar e depois somar 
function somar() {
    let primeiroLugarValue = primeiroLugar.value || 0;
    let segundoLugarValue = segundoLugar.value || 0;
    let terceiroLugarValue = terceiroLugar.value || 0;
    let quartoLugarValue = quartoLugar.value || 0;
    let quintoLugarValue = quintoLugar.value || 0;
    let totalPfValue = totalPf.value || 0;
    // Calcular cada resultado antes de arredondar math.ceil arredonda o valor
    let primeiroResultado = Math.ceil(primeiroLugarValue * 1.9);
    let segundoResultado = Math.ceil(segundoLugarValue * 1.9);
    let terceiroResultado = Math.ceil(terceiroLugarValue * 1.9);
    let quartoResultado = Math.ceil(quartoLugarValue * 1.9);
    let quintoResultado = Math.ceil(quintoLugarValue * 1.9);

    // Soma das posições
    let resultadoPosicao = primeiroResultado + segundoResultado + terceiroResultado + quartoResultado + quintoResultado;
    //Soma total
    let resultadoTotal = totalPfValue - resultadoPosicao;
    // Chama a função para mostrar os resultados individuais
    mostrarColocacao(primeiroResultado, segundoResultado, terceiroResultado, quartoResultado, quintoResultado, resultadoTotal);
}
function mostrarColocacao(primeiro, segundo, terceiro, quarto, quinto, resultadoTotal) {
    alert("Você tem que colocar " + resultadoTotal + " pontos e o" + " 1º lugar: " + primeiro + " pontos" +
        " 2º lugar: " + segundo + " pontos" +
        " 3º lugar: " + terceiro + " pontos" +
        " 4º lugar: " + quarto + " pontos" +
        " 5º lugar: " + quinto + " pontos");
}
