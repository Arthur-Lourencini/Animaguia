# Animaguia 🐾 (Versão Full-Stack)

## Resumo
O Animaguia é um site educativo e interativo focado no mundo animal, voltado para crianças. Diferente de um site estático, este projeto utiliza um backend com Node.js e um banco de dados SQLite para carregar dinamicamente o conteúdo dos animais, tornando a manutenção e a escalabilidade muito mais fáceis.

## Principais Funcionalidades
- **Servidor Dinâmico:** Um backend em **Node.js + Express** serve o site e uma API RESTful.
- **Banco de Dados:** As informações de todos os animais (nomes, curiosidades, habitats, etc.) são armazenadas em um banco de dados **SQLite**.
- **Carregamento Dinâmico:** As páginas de animais (`Fazenda`, `Zoológico`, etc.) usam JavaScript (`fetch`) para buscar os dados dos animais na API e construir os cards dinamicamente.
- **Modo Claro/Escuro:** Seletor de tema (light/dark) que salva a preferência do usuário no `localStorage`.
- **Quiz Interativo:** Um quiz de múltipla escolha para testar o conhecimento do usuário.
- **Design Responsivo:** O layout se adapta a telas de desktop e mobile (com menu hamburger).
- **Modais de Informação:** Cards de animais com um botão "Mais Informações" que abre um modal com detalhes.

## Tecnologias Utilizadas
- **Frontend:**
    - HTML5 Semântico
    - CSS3 (Variáveis CSS, Flexbox, Grid)
    - JavaScript (ES6+, `fetch`, Manipulação do DOM)
- **Backend:**
    - Node.js
    - Express.js (para o servidor e API)
- **Banco de Dados:**
    - SQLite (com o driver `sqlite3`)

## Estrutura do Projeto
O projeto é dividido em duas pastas principais: `frontend` (o que o usuário vê) e `backend` (o cérebro da aplicação).

=====================================================================================================================================

## Como Executar Localmente

Para rodar este projeto na sua máquina, siga os passos:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Arthur-Lourencini/Animaguia.git](https://github.com/Arthur-Lourencini/Animaguia.git)
    cd Animaguia/animaguia-fullstack
    ```

2.  **Instale as dependências do Backend:**
    * Navegue até a pasta `backend`:
        ```bash
        cd backend
        ```
    * Instale os pacotes (Express, SQLite):
        ```bash
        npm install
        ```

3.  **Prepare o Banco de Dados:**
    * (Se o arquivo `animaguia.db` não existir) Execute o script de setup **apenas uma vez** para criar e popular o banco:
        ```bash
        node setupDatabase.js
        ```

4.  **Inicie o Servidor:**
    * Ainda na pasta `backend`, inicie o servidor:
        ```bash
        node server.js
        ```

5.  **Acesse no Navegador:**
    * O terminal mostrará: `Servidor rodando em http://localhost:3000`.
    * Abra esse endereço no seu navegador.

## Autores / Integrantes
Este projeto foi desenvolvido por:
- Arthur Lourencini
- Bruno Carvalho de Oliveira
- Gustavo Duarte Strob
- Miguel Cardoso Alcalde
