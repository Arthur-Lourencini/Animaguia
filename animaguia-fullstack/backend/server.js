const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'animaguia.db');

// --- Servidor de Arquivos (Front-end) ---
// 1. Servir arquivos estáticos (CSS, JS, Imagens)
// Colocar isso ANTES de todas as rotas.
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath)); // Isso já serve o index.html na rota '/'

// Conecta ao banco de dados SQLite
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco:", err.message);
    } else {
        console.log('Conectado ao banco de dados Animaguia.');
    }
});

// --- API (Back-end) ---
// 2. Definir rotas da API
app.get('/api/animais/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    const sql = "SELECT * FROM animais WHERE categoria = ?";

    db.all(sql, [categoria], (err, rows) => {
        if (err) {
            console.error("Erro na consulta:", err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// --- Rotas das Páginas (Front-end) ---
// 3. Definir rotas para as páginas HTML
// Isso garante que /animais-da-fazenda sirva o .html correto
const pages = ['animais-da-fazenda', 'animais-do-zoologico', 'animais-aquaticos', 'animais-domesticos', 'quiz'];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(frontendPath, `${page}.html`));
    });
    // Adiciona suporte para a extensão .html também
    app.get(`/${page}.html`, (req, res) => {
        res.sendFile(path.join(frontendPath, `${page}.html`));
    });
});

// --- Rota da Página Inicial ---
// Garante que /index.html também funcione
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});


// 4. (Opcional, mas bom) Rota catch-all para 404
// Se não for API e não for uma página, manda 404
// Esta rota deve ser a ÚLTIMA.
app.use((req, res) => {
    // Se não for uma rota de API, manda o index.html (bom para 404 customizado)
    if (!req.path.startsWith('/api/')) {
        res.status(404).sendFile(path.join(frontendPath, 'index.html'));
    } else {
        // Se for API, manda 404 JSON
        res.status(404).json({ error: 'API endpoint not found' });
    }
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse http://localhost:${PORT} no seu navegador.`);
});