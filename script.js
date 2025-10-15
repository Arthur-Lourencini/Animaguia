document.addEventListener('DOMContentLoaded', () => {
    console.log('Animaguia carregado e pronto!');

    // --- LÓGICA DO SELETOR DE TEMA ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- LÓGICA DO MODAL ---
    const modal = document.getElementById('animal-modal');
    if (modal) {
        const closeButton = modal.querySelector('.close-button');
        const infoButtons = document.querySelectorAll('.info-button');
        const modalTitle = modal.querySelector('#modal-title');
        const modalDetails = modal.querySelector('#modal-details');

        infoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.animal-card');
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
                modalTitle.textContent = animalData.nome;
                modalDetails.innerHTML = `
                    <li><strong>Nome Científico:</strong> <i>${animalData.cientifico}</i></li>
                    <li><strong>Habitat:</strong> ${animalData.habitat}</li>
                    <li><strong>Alimentação:</strong> ${animalData.alimentacao}</li>
                    <li><strong>Tamanho:</strong> ${animalData.tamanho}</li>
                    <li><strong>Peso:</strong> ${animalData.peso}</li>
                    <li><strong>Expectativa de Vida:</strong> ${animalData.vida}</li>
                    <li><strong>Curiosidade:</strong> ${animalData.curiosidade}</li>
                `;
                modal.style.display = 'block';
            });
        });

        const closeModal = () => {
            modal.style.display = 'none';
        }
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                closeModal();
            }
        });
    }

    // --- LÓGICA PARA O BOTÃO VOLTAR AO TOPO ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // --- LÓGICA DO QUIZ ---
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        const allQuestions = [
            { question: "Qual destes animais é conhecido como o 'melhor amigo do homem'?", image: "img/cachorro.jpg", answers: [{ text: 'Gato', correct: false }, { text: 'Cachorro', correct: true }, { text: 'Papagaio', correct: false }, { text: 'Vaca', correct: false }] },
            { question: "Que animal da fazenda é famoso por produzir lã?", image: "img/ovelha.jfif", answers: [{ text: 'Porco', correct: false }, { text: 'Galinha', correct: false }, { text: 'Ovelha', correct: true }, { text: 'Pato', correct: false }] },
            { question: "Qual é o maior animal terrestre do mundo?", image: "img/elefante.jpg", answers: [{ text: 'Leão', correct: false }, { text: 'Girafa', correct: false }, { text: 'Rinoceronte', correct: false }, { text: 'Elefante', correct: true }] },
            { question: "Este animal marinho tem três corações e sangue azul. Quem é ele?", image: "img/polvo.jpg", answers: [{ text: 'Tubarão', correct: false }, { text: 'Polvo', correct: true }, { text: 'Raia', correct: false }, { text: 'Foca', correct: false }] },
            { question: "Qual destes animais domésticos tem dentes que nunca param de crescer?", image: "img/coelho.webp", answers: [{ text: 'Gato', correct: false }, { text: 'Cachorro', correct: false }, { text: 'Coelho', correct: true }, { text: 'Peixe', correct: false }] },
            { question: "Qual animal é famoso por viver em grupos chamados 'bandos'?", image: "img/leão.webp", answers: [{ text: 'Leão', correct: true }, { text: 'Hipopótamo', correct: false }, { text: 'Girafa', correct: false }, { text: 'Pinguim', correct: false }] },
            { question: "Que animal da fazenda é conhecido por sua inteligência e por gostar de lama?", image: "img/porco.jfif", answers: [{ text: 'Vaca', correct: false }, { text: 'Cavalo', correct: false }, { text: 'Porco', correct: true }, { text: 'Cabra', correct: false }] },
            { question: "Este animal aquático pode regenerar partes do seu cérebro.", image: "img/axolote.webp", answers: [{ text: 'Cavalo-marinho', correct: false }, { text: 'Axolote', correct: true }, { text: 'Raia', correct: false }, { text: 'Tubarão', correct: false }] },
            { question: "Qual animal terrestre é o mais alto do mundo?", image: "img/girafa.jfif", answers: [{ text: 'Elefante', correct: false }, { text: 'Rinoceronte', correct: false }, { text: 'Girafa', correct: true }, { text: 'Leão', correct: false }] },
            { question: "Que animal doméstico é conhecido por sua independência e habilidade de caça?", image: "img/gato.jfif", answers: [{ text: 'Cachorro', correct: false }, { text: 'Gato', correct: true }, { text: 'Hamster', correct: false }, { text: 'Coelho', correct: false }] },
            { question: "Qual ave de fazenda pode reconhecer até 100 rostos diferentes?", image: "img/galinha.jpg", answers: [{ text: 'Pato', correct: false }, { text: 'Ganso', correct: false }, { text: 'Galinha', correct: true }, { text: 'Ovelha', correct: false }] },
            { question: "Qual destes peixes cartilaginosos é um predador de topo no oceano?", image: "img/tubarão.webp", answers: [{ text: 'Raia', correct: false }, { text: 'Tubarão', correct: true }, { text: 'Polvo', correct: false }, { text: 'Cavalo-marinho', correct: false }] },
            { question: "Apesar de pesado, que animal pode correr a 30 km/h e passa muito tempo na água?", image: "img/hipopotamo.jpg", answers: [{ text: 'Elefante', correct: false }, { text: 'Rinoceronte', correct: false }, { text: 'Hipopótamo', correct: true }, { text: 'Leão', correct: false }] },
            { question: "Qual ave doméstica é famosa por sua capacidade de imitar a fala humana?", image: "img/papagaio.jfif", answers: [{ text: 'Galinha', correct: false }, { text: 'Papagaio', correct: true }, { text: 'Pato', correct: false }, { text: 'Ganso', correct: false }] },
            { question: "Que animal de fazenda é criado principalmente para a produção de leite?", image: "img/vaca.jpg", answers: [{ text: 'Porco', correct: false }, { text: 'Ovelha', correct: false }, { text: 'Vaca', correct: true }, { text: 'Cabra', correct: false }] }
        ];

        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;

        const questionElement = document.getElementById('question');
        const answerButtonsElement = document.getElementById('answer-buttons');
        const nextButton = document.getElementById('next-btn');
        const feedbackText = document.getElementById('feedback-text');
        const feedbackImageContainer = document.getElementById('feedback-image-container');
        const feedbackImage = document.getElementById('feedback-image');
        const quizArea = document.getElementById('quiz-area');
        const scoreContainer = document.getElementById('score-container');
        const scoreText = document.getElementById('score-text');
        const restartButton = document.getElementById('restart-btn');

        function startQuiz() {
            currentQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 7);
            currentQuestionIndex = 0;
            score = 0;
            scoreContainer.classList.add('hide');
            quizArea.classList.remove('hide');
            showQuestion();
        }

        function showQuestion() {
            resetState();
            let currentQuestion = currentQuestions[currentQuestionIndex];
            questionElement.innerText = currentQuestion.question;
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
                answerButtonsElement.appendChild(button);
            });
        }

        function resetState() {
            nextButton.classList.add('hide');
            feedbackText.innerText = '';
            feedbackText.className = '';
            feedbackImageContainer.classList.add('hide');
            while (answerButtonsElement.firstChild) {
                answerButtonsElement.removeChild(answerButtonsElement.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === 'true';
            const currentQuestion = currentQuestions[currentQuestionIndex];
            if (isCorrect) {
                score++;
                feedbackText.innerText = 'Correto!';
                feedbackText.classList.add('correct');
            } else {
                feedbackText.innerText = 'Resposta errada.';
                feedbackText.classList.add('incorrect');
            }
            feedbackImage.src = currentQuestion.image;
            feedbackImage.alt = `Imagem de: ${currentQuestion.answers.find(ans => ans.correct).text}`;
            feedbackImageContainer.classList.remove('hide');
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add('correct');
                }
                button.disabled = true;
            });
            nextButton.classList.remove('hide');
        }
        
        function showScore() {
            quizArea.classList.add('hide');
            scoreContainer.classList.remove('hide');
            scoreText.innerText = `Você acertou ${score} de ${currentQuestions.length} perguntas!`;
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }
        nextButton.addEventListener('click', handleNextButton);
        restartButton.addEventListener('click', startQuiz);
        startQuiz();
    }
});