document.addEventListener('DOMContentLoaded', () => {
    console.log('Animaguia carregado e pronto!');

    // Seleciona todos os elementos necessários para o modal
    const modal = document.getElementById('animal-modal');
    const closeButton = document.querySelector('.close-button');
    const infoButtons = document.querySelectorAll('.info-button');
    
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');

    // Adiciona um evento de clique para cada botão "Mais Informações"
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.animal-card');

            // Pega os dados do animal a partir dos atributos data-* do card
            const animalData = {
                nome: card.dataset.nome,
                cientifico: card.dataset.cientifico,
                habitat: card.dataset.habitat,
                alimentacao: card.dataset.alimentacao,
                tamanho: card.dataset.tamanho,
                peso: card.dataset.peso,
                vida: card.dataset.vida,
                curiosidade: card.dataset.curiosidade,
            };

            // Preenche o modal com as informações do animal
            modalTitle.textContent = animalData.nome;
            modalDetails.innerHTML = `
                <li><strong>Nome Científico:</strong> ${animalData.cientifico}</li>
                <li><strong>Habitat:</strong> ${animalData.habitat}</li>
                <li><strong>Alimentação:</strong> ${animalData.alimentacao}</li>
                <li><strong>Tamanho:</strong> ${animalData.tamanho}</li>
                <li><strong>Peso:</strong> ${animalData.peso}</li>
                <li><strong>Expectativa de Vida:</strong> ${animalData.vida}</li>
                <li><strong>Curiosidade:</strong> ${animalData.curiosidade}</li>
            `;

            // Exibe o modal
            modal.style.display = 'block';
        });
    });

    // Função para fechar o modal
    const closeModal = () => {
        modal.style.display = 'none';
    }

    // Fecha o modal ao clicar no botão (X)
    if(closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Fecha o modal ao clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});