let somLiberado = false;

// Colaboradores
const colaboradores = [
    { nome: "Francisco", hora: "12:00", avisado: false },
    { nome: "Samuel", hora: "13:05", avisado: false },
    { nome: "Alberto", hora: "14:10", avisado: false }
];
// Preenche tabela
function carregarTabela() {
    const tabela = document.getElementById("tabela-colaboradores");

    colaboradores.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.hora}</td>
        `;
        tabela.appendChild(tr);
    });
}

// Função de fala
function falar(texto) {
    if (!somLiberado) return;

    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = "pt-BR";
    speechSynthesis.speak(msg);
}

// Destaque na tabela
function marcarLinha(nome) {
    document.querySelectorAll("#tabela-colaboradores tr").forEach(linha => {
        if (linha.children[0].textContent === nome) {
            linha.classList.add("aviso");
        }
    });
}

// Função que repete o aviso 2 vezes
function avisarDuasVezes(nome, hora) {
    const mensagem = `${nome}, deu ${hora}, está na hora do seu almoço!`;

    // 1ª vez (agora)
    falar(mensagem);

    // 2ª vez após 10 segundos
    setTimeout(() => {
        falar(mensagem);
    }, 10000);
}

// Verifica horário
function verificarHorarios() {
    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 5);

    colaboradores.forEach(item => {
        if (item.hora === horaAtual && !item.avisado) {

            item.avisado = true;
            marcarLinha(item.nome);

            avisarDuasVezes(item.nome, item.hora);
        }
    });
}

// Botão libera som
document.getElementById("ativarSom").addEventListener("click", () => {
    somLiberado = true;
    speechSynthesis.resume();
    speechSynthesis.cancel();
    document.getElementById("ativarSom").style.display = "none";
});

carregarTabela();
setInterval(verificarHorarios, 1000);
