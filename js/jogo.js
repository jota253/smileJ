// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    btnJogarNovamente.className = 'visivel';
    btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
    jogar = true;
    let divis = document.getElementsByTagName("div");
    for (i = 0; i < divis.length; i++) {
        if (divis[i].id >= 0 && divis[i].id <= 4) {
            divis[i].className = "inicial";
            divis[i].innerHTML = divis[i].id; // Resetando o texto das cartas
        }
    }

    let imagem = document.getElementById("imagem");
    if (imagem) {
        imagem.remove();
    }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    desempenho = (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acertou
function acertou(obj) {
    obj.className = "acertou";
    const img = new Image(100);
    img.id = "imagem";
    img.src = "https://img.europapress.es/fotoweb/fotonoticia_20080522083805_690.jpg"; // Imagem do Smile
    img.style.maxWidth = '100%'; // Ajusta a imagem para caber dentro da carta
    img.style.maxHeight = '100%'; // Ajusta a imagem para caber dentro da carta
    obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 4 e verifica se o jogador acertou
function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;
        if (tentativas == 5) {
            btnJogarNovamente.className = 'invisivel';
            btnReiniciar.className = 'visivel';
        }
        let sorteado = Math.floor(Math.random() * 5);
        if (obj.id == sorteado) {
            acertou(obj);
            acertos++;
        } else {
            obj.className = "errou";
            const objSorteado = document.getElementById(sorteado);
            objSorteado.className = "acertou"; // Marcar a carta correta
            const img = new Image(100);
            img.src = "https://a.espncdn.com/photo/2022/1210/r1105022_1571x2750cc.jpg"; // Imagem de erro
            img.style.maxWidth = '100%'; // Ajusta a imagem para caber dentro da carta
            img.style.maxHeight = '100%'; // Ajusta a imagem para caber dentro da carta
            obj.appendChild(img); // Adiciona a imagem de erro na carta errada
            acertou(objSorteado); // Adiciona a imagem correta na carta sorteada
        }
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente"');
    }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
