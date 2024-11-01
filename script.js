// URL da API para obter a lista de edifícios lendários
const apiUrl = 'https://api.foe-helper.com/v1/LegendaryBuilding/list';

// Dicionário de traduções
const translations = {
    "Observatory": "Observatório",
    "Temple of Relics": "Templo das Relíquias",
    "Oracle of Delphi": "Oráculo de Delfos",
    "Gaea Statue": "Estátua de Gaia",
    "Arctic Orangery": "Jardim de inverno ártico",
    "Seed Vault": "Depósito de sementes",
    "Tower of Babel": "Torre de Babel",
    "Statue of Zeus": "Estátua de Zeus",
    "Frauenkirche of Dresden": "Frauenkirche Dresden",
    "Deal Castle": "Castelo de Deal",
    "Lotus Temple": "Templo de Lótus",
    "Innovation Tower": "Torre da Inovação",
    "Hagia Sophia": "Basílica de Santa Sofia",
    "Cathedral of Aachen": "Catedral de Aachen",
    "Galata Tower": "Torre de Gálata",
    "The Arc": "O Arco",
    "Rain Forest Project": "Projeto Floresta Tropical",
    "St. Mark's Basilica": "Basílica de São Marcos",
    "Notre Dame": "Catedral de Notre-Dame",
    "Royal Albert Hall": "Royal Albert Hall",
    "Capitol": "Congresso Nacional",
    "Koloseum": "Coliseu",
    "Lighthouse of Alexandria": "Farol de Alexandria",
    "Saint Basils Cathedral": "Catedral de São Basílio",
    "Castel del Monte": "Castel del Monte",
    "Space Needle": "Obelisco Espacial",
    "Atomium": "Atomium",
    "Atlantis Museum": "Museu de Atlântida",
    "The Kraken": "O Kraken",
    "The Blue Galaxy": "A Galáxia Azul",
    "Cape Canaveral": "Cabo Canaveral",
    "The Habitat": "O Habitat",
    "Alcatraz": "Alcatraz",
    "Château Frontenac": "Castelo Frontenac",
    "Space Carrier": "Transportador Espacial",
    "A.I. Core": "Núcleo de I.A.",
    "Star Gazer": "Observador das Estrelas",
    "The Virgo Project": "Projeto Virgem",
    "Saturn VI Gate CENTAURUS": "Portal CENTAURO de Saturno VI",
    "Saturn VI Gate PEGASUS": "Portal PÉGASO de Saturno VI",
    "Saturn VI Gate HYDRA": "Portal HIDRA de Saturno VI",
    "Flying Island": "Ilha Voadora",
    "Voyager V1": "Viajante",
    "Truce Tower": "Torre da Trégua",
    "Terracotta Army": "Exército de Terracota",
    "Himeji Castle": "Castelo de Himeji",
};

// Armazena o edifício atual após buscar os detalhes
let currentBuilding = null;

// Função para buscar a lista de edifícios lendários
async function fetchLegendaryBuildings() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }

        const data = await response.json();
        console.log('Dados recebidos:', data); // Inspeciona os dados retornados

        if (data.response && Array.isArray(data.response.buildings)) {
            populateSelect(data.response.buildings);
        } else {
            console.error('Propriedade "buildings" não encontrada ou não é um array:', data);
        }
    } catch (error) {
        console.error('Erro ao buscar edifícios:', error);
        alert('Falha ao carregar a lista de edifícios.');
    }
}

// Função para popular o select com os edifícios
function populateSelect(buildings) {
    const select = document.getElementById('buildingSelect');
    select.innerHTML = ''; // Limpa qualquer conteúdo existente

    buildings.forEach(building => {
        const option = document.createElement('option');
        option.value = building.id;

        // Usa a tradução, se disponível
        option.textContent = translations[building.name] || building.name;
        select.appendChild(option);
    });
}

// Função para buscar detalhes de um edifício selecionado
async function fetchLegendaryBuildingDetails(id, level) {
    if (level < 1) {
        alert("O nível deve ser pelo menos 1.");
        return;
    }

    const apiUrl = `https://api.foe-helper.com/v1/LegendaryBuilding/get?id=${id}&level=${level}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }

        const data = await response.json();
        console.log('Dados da API:', data); // Inspeciona a resposta da API

        currentBuilding = data.response; // Armazena o edifício atual
        console.log('Dados do edifício atual:', currentBuilding); // Verifica o conteúdo de currentBuilding

        displayDetails(currentBuilding, level); // Passa o nível desejado
    } catch (error) {
        console.error('Erro ao buscar detalhes do edifício:', error);
        alert('Coloque um nivel válido.');
    }
}

// Função para exibir os detalhes do edifício
function displayDetails(building, desiredLevel) {
    if (!building) {
        console.error('O edifício é undefined.');
        return;
    }

    let resultContent = `<p>Nome do Edifício: ${translations[building.name] || building.name}</p>`;
    resultContent += `<p>Nível desejado: ${desiredLevel}</p>`;

    const patronBonus = building.patron_bonus;
    const fatores = [1, 2, 3, 4, 5]; // Ranks de 1 a 5

    const resultados = fatores.map(rank => {
        const bonus = patronBonus.find(pb => pb.rank === rank);
        return bonus ? bonus.forgepoints : 0;
    });

    const resultadosMultiplicados = resultados.map(value => Math.ceil(value * 1.9));

    resultadosMultiplicados.forEach((valor, index) => {
        resultContent += `<p>${index + 1}º lugar: ${valor}</p>`;
    });

    const totalDePontos = resultadosMultiplicados.reduce((acc, cur) => acc + cur, 0);
    const totalRestante = building.total_fp - totalDePontos;

    resultContent += `<p>Total de pontos que o dono deve colocar: ${totalRestante}</p>`;

    openModal(resultContent); // Abre o modal com os resultados
    
    // Adiciona um botão para copiar apenas as posições
    document.getElementById('copiarPosicoesButton').onclick = () => copiarPosicoes(resultadosMultiplicados);
}

// Função para copiar as posições de 1º a 5º lugar
function copiarPosicoes(resultadosMultiplicados) {
    const posicoesText = resultadosMultiplicados.map((valor, index) => `${index + 1}º lugar: ${valor}`).join('\n');

    navigator.clipboard.writeText(posicoesText)
        .then(() => {
            alert("Posições copiadas!");
        })
        .catch(err => {
            console.error("Erro ao copiar posições: ", err);
        });
}

document.getElementById('fetchDetails').addEventListener('click', () => {
    const selectedBuildingId = document.getElementById('buildingSelect').value;
    const level = parseInt(document.getElementById('buildingLevel').value, 10) || 1; // Pega o nível como número, se inválido usa 1

    // Chama a função para buscar detalhes do edifício
    fetchLegendaryBuildingDetails(selectedBuildingId, level);
});

// Chama a função para buscar a lista de edifícios ao carregar a página
fetchLegendaryBuildings();

// Seleciona o modal e o botão de fechar
const modal = document.getElementById("myModal");
const closeButton = document.querySelector(".close-button");

// Função para abrir o modal e preencher o conteúdo
function openModal(content) {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = content; // Preenche o modal com os resultados
    modal.style.display = "block"; // Mostra o modal
}

// Função para fechar o modal
closeButton.onclick = function () {
    modal.style.display = "none"; // Esconde o modal
}

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Esconde o modal
    }
}
