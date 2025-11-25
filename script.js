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

function falar(texto) {
    if (!somLiberado) return;  // bloqueia até clicar no botão

    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = "pt-BR";
    speechSynthesis.speak(msg);
}

function marcarLinha(nome) {
    document.querySelectorAll("#tabela-colaboradores tr").forEach(linha => {
        if (linha.children[0].textContent === nome) {
            linha.classList.add("aviso");
        }
    });
}

// Verificar horário
function verificarHorarios() {
    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 5);

    colaboradores.forEach(item => {
        if (item.hora === horaAtual && !item.avisado) {
            item.avisado = true;

            const mensagem = `${item.nome}, deu ${item.hora}, está na hora do seu almoço!`;

            console.log("Falando:", mensagem);

            falar(mensagem);
            marcarLinha(item.nome);
        }
    });
}

document.getElementById("ativarSom").addEventListener("click", () => {
    somLiberado = true;

    // libera áudio do navegador
    speechSynthesis.resume();
    speechSynthesis.cancel();

    document.getElementById("ativarSom").style.display = "none";
});

carregarTabela();
setInterval(verificarHorarios, 1000);
