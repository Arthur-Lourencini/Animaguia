// Importa a biblioteca do sqlite
const sqlite3 = require('sqlite3').verbose();
// Conecta ao banco de dados (o arquivo 'animaguia.db' será criado)
const db = new sqlite3.Database('./animaguia.db');

// Executa os comandos em sequência
db.serialize(() => {
    console.log("Criando a tabela 'animais' se não existir...");
    // 1. Cria a tabela
    db.run(`CREATE TABLE IF NOT EXISTS animais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria TEXT NOT NULL,
        cientifico TEXT,
        cientifico_geral TEXT,
        habitat TEXT,
        alimentacao TEXT,
        tamanho TEXT,
        peso TEXT,
        vida TEXT,
        curiosidade TEXT,
        imagem_path TEXT,
        descricao TEXT
    )`);

    console.log("Tabela 'animais' pronta.");

    // 2. Prepara o comando de inserção
    const stmt = db.prepare(`INSERT INTO animais (
        nome, categoria, cientifico, cientifico_geral, habitat, alimentacao, 
        tamanho, peso, vida, curiosidade, imagem_path, descricao
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    console.log("Inserindo dados...");

    // 3. Insere os dados (copiados dos seus arquivos HTML)

    // Dados de animais-da-fazenda.html
    stmt.run("Vaca", "fazenda", "Bos taurus", "", "Fazendas e pastagens", "Herbívora (gramíneas, feno)", 
             "1,4 a 1,5 metros de altura", "500 a 800 kg", "15 a 20 anos", 
             "Uma vaca pode produzir até 25 litros de leite por dia!", "img/vaca.jpg",
             "A vaca é um animal domesticado, criado para a produção de leite e carne. São conhecidas por sua natureza dócil.");
    
    stmt.run("Galinha", "fazenda", "Gallus gallus domesticus", "", "Fazendas e quintais", "Onívora (grãos, insetos)",
             "40 a 50 cm de altura", "1,5 a 4 kg", "5 a 10 anos",
             "As galinhas podem reconhecer até 100 rostos diferentes!", "img/galinha.jpg",
             "A galinha é uma ave domesticada, criada para a produção de ovos e carne. São conhecidas por ciscar o chão.");
    
    stmt.run("Porco", "fazenda", "Sus scrofa domesticus", "", "Fazendas e áreas rurais", "Onívora (raízes, frutas)",
             "0,9 a 1,5 metros de comprimento", "100 a 300 kg", "10 a 15 anos",
             "Os porcos são excelentes nadadores e podem correr a velocidades de até 17 km/h!", "img/porco.jfif",
             "O porco é um animal domesticado, criado para a produção de carne. São conhecidos por sua inteligência.");
    
    stmt.run("Ovelha", "fazenda", "Ovis aries", "", "Fazendas e pastagens", "Herbívora (gramíneas, feno)",
             "0,9 a 1,2 metros de altura", "45 a 160 kg", "10 a 12 anos",
             "As ovelhas têm uma visão panorâmica, podendo ver quase 360 graus ao seu redor!", "img/ovelha.jfif",
             "A ovelha é um animal domesticado, criado para a produção de lã, carne e leite. Vivem em grupos.");
    
    stmt.run("Cabra", "fazenda", "Capra aegagrus hircus", "", "Fazendas e áreas montanhosas", "Herbívora (gramíneas, arbustos)",
             "70 a 100 cm de altura", "45 a 90 kg", "10 a 15 anos",
             "As cabras têm pupilas retangulares, o que lhes dá uma visão periférica ampla para detectar predadores!", "img/cabra.webp",
             "A cabra é um animal domesticado, criado para a produção de leite, carne e pele. Conhecidas por sua agilidade.");

    stmt.run("Pato", "fazenda", "Anas platyrhynchos domesticus", "", "Fazendas e áreas aquáticas", "Onívora (plantas aquáticas, insetos)",
             "50 a 70 cm de comprimento", "1 a 3 kg", "5 a 10 anos",
             "Os patos têm glândulas especiais que produzem óleo para impermeabilizar suas penas!", "img/pato.jpg",
             "O pato é uma ave domesticada, criada para ovos, carne e penas. Conhecidos pela habilidade de nadar.");

    // Dados de animais-do-zoologico.html
    stmt.run("Leão", "zoologico", "Panthera leo", "", "Savanas e pastagens", "Carnívora",
             "1,2 metros de altura", "150 a 250 kg", "10 a 14 anos",
             "Os leões são os únicos felinos que vivem em grupos sociais!", "img/leão.webp",
             "O leão é conhecido como o 'rei da selva' devido à sua majestade e força. Vivem em grupos chamados de bandos.");

    stmt.run("Girafa", "zoologico", "Giraffa camelopardalis", "", "Savanas e florestas", "Herbívora",
             "4,5 a 6 metros de altura", "800 a 1.200 kg", "25 a 30 anos",
             "A língua da girafa pode medir até 45 cm de comprimento!", "img/girafa.jpg",
             "A girafa é o animal terrestre mais alto do mundo, conhecida por seu pescoço longo e manchas distintas.");

    stmt.run("Elefante", "zoologico", "Loxodonta africana / Elephas maximus", "", "Savanas e florestas", "Herbívora",
             "3 a 4 metros de altura", "2.500 a 6.000 kg", "60 a 70 anos",
             "Comunicam-se através de sons de baixa frequência que viajam longas distâncias!", "img/elefante.jpg",
             "O elefante é o maior animal terrestre do mundo, conhecido por sua inteligência e memória excepcionais.");
    
    stmt.run("Hipopótamo", "zoologico", "Hippopotamus amphibius", "", "Rios e lagos", "Herbívora",
             "1,5 a 1,7 metros de altura", "1.500 a 3.200 kg", "40 a 50 anos",
             "Apesar do peso, podem correr a velocidades de até 30 km/h em terra!", "img/hipopotamo.jpg",
             "O hipopótamo é um grande mamífero semi-aquático conhecido por seu corpo robusto e boca enorme.");
    
    stmt.run("Rinoceronte", "zoologico", "", "<em>Ceratotherium simum</em> (exemplo)", "Savanas e florestas", "Herbívora",
             "1,5 a 1,8 metros de altura", "800 a 2.300 kg", "35 a 50 anos",
             "Sua pele pode ter até 5 cm de espessura!", "img/rinoceronte.jpg",
             "Os rinocerontes são grandes mamíferos conhecidos por seus chifres característicos no focinho.");

    stmt.run("Flamingo", "zoologico", "Phoenicopterus roseus", "", "Lagoas e lagos salgados", "Onívora",
             "1,2 a 1,5 metros de altura", "2 a 4 kg", "20 a 30 anos",
             "Sua cor rosa vem dos pigmentos dos alimentos que consomem!", "img/flamingo.jpg",
             "O flamingo é uma ave pernalta, de plumagem rosa ou vermelha, que vive em bandos em áreas aquáticas.");

    // Dados de animais-aquaticos.html
    stmt.run("Tubarão", "aquatico", "Selachimorpha", "", "Oceanos e mares", "Carnívora",
             "Varia de 20 cm a 12 metros", "Varia de 2 kg a 20 toneladas", "20 a 30 anos",
             "Possuem um olfato aguçado, detectando uma gota de sangue a quilômetros.", "img/tubarão.webp",
             "Os tubarões são peixes cartilaginosos conhecidos por sua força e agilidade. São predadores no topo da cadeia alimentar.");
    
    stmt.run("Raia", "aquatico", "Batoidea", "", "Oceanos e águas costeiras", "Carnívora",
             "Varia de 30 cm a 7 metros", "Varia de 1 kg a 700 kg", "15 a 25 anos",
             "Algumas espécies possuem um ferrão venenoso na cauda para defesa!", "img/raia.jpg",
             "As raias são peixes cartilaginosos com um corpo achatado e nadadeiras peitorais que se estendem como asas.");

    stmt.run("Cavalo-Marinho", "aquatico", "Hippocampus", "", "Águas rasas e recifes de corais", "Carnívora",
             "1,5 a 35 cm", "Até 1 kg", "3 a 5 anos",
             "Nos cavalos-marinhos, é o macho que engravida e dá à luz aos filhotes!", "img/cavalo-marinho.webp",
             "Os cavalos-marinhos são peixes pequenos e únicos, conhecidos por sua aparência que se assemelha a um cavalo.");
    
    stmt.run("Axolote", "aquatico", "Ambystoma mexicanum", "", "Lagos de água doce", "Carnívora",
             "15 a 45 cm", "100 a 300 g", "10 a 15 anos",
             "É capaz de regenerar não apenas membros, mas também partes do cérebro e da medula espinhal!", "img/axolote.webp",
             "O axolote é um anfíbio que mantém características larvais durante toda a vida, famoso por sua capacidade de regeneração.");

    stmt.run("Polvo", "aquatico", "Octopoda", "", "Oceanos e mares", "Carnívora",
             "Varia de 1 cm a 3 metros", "Varia de 30 g a 50 kg", "1 a 3 anos",
             "Os polvos têm três corações e sangue azul devido à presença de cobre!", "img/polvo.jpg",
             "Os polvos são moluscos marinhos conhecidos por sua inteligência e habilidades de camuflagem. Possuem oito braços.");

    stmt.run("Pinguim", "aquatico", "Spheniscidae", "", "Regiões costeiras do hemisfério sul", "Carnívora",
             "Varia de 30 cm a 1 metro", "Varia de 1 kg a 40 kg", "15 a 20 anos",
             "São aves que não voam, mas são excelentes nadadores, usando suas asas como nadadeiras.", "img/pinguim.webp",
             "Os pinguins são aves marinhas que não voam, mas são excelentes nadadores. Vivem principalmente no hemisfério sul.");

    // Dados de animais-domesticos.html
    stmt.run("Cachorro", "domestico", "Canis lupus familiaris", "", "Casas e quintais", "Onívora",
             "Varia de 15 cm a 1 metro", "Varia de 1 kg a 70 kg", "10 a 13 anos",
             "Têm um olfato até 100.000 vezes melhor que o dos humanos!", "img/cachorro.jpg",
             "O cachorro é conhecido como o melhor amigo do homem. São leais, amorosos e proporcionam companhia e segurança.");

    stmt.run("Gato", "domestico", "Felis catus", "", "Casas e apartamentos", "Carnívora",
             "Varia de 20 a 40 cm", "Varia de 3 a 7 kg", "12 a 15 anos",
             "Têm um órgão especial que lhes permite 'cheirar' com a boca, ajudando a detectar feromônios.", "img/gato.jpg",
             "Os gatos são animais independentes e curiosos, conhecidos por sua habilidade de caça e por serem ótimos companheiros.");
    
    stmt.run("Peixe", "domestico", "", "Varia conforme a espécie", "Aquários domésticos", "Onívora",
             "Varia de 2 a 30 cm", "Varia de gramas a 1 kg", "1 a 10 anos",
             "Alguns peixes, como o Betta, são conhecidos por sua agressividade e territorialidade.", "img/peixe.jpg",
             "Os peixes são animais aquáticos que podem ser mantidos em aquários. São conhecidos pela variedade de cores e formas.");

    stmt.run("Hamster", "domestico", "", "<em>Mesocricetus auratus</em> (exemplo)", "Gaiolas domésticas", "Onívora",
             "Varia de 10 a 20 cm", "Varia de 100 a 200 g", "2 a 3 anos",
             "Possuem bochechas expansíveis que usam para armazenar e transportar comida!", "img/hamster.webp",
             "Os hamsters são pequenos roedores populares como animais de estimação devido ao seu tamanho e personalidade amigável.");
    
    stmt.run("Coelho", "domestico", "Oryctolagus cuniculus", "", "Gaiolas ou áreas cercadas", "Herbívora",
             "Varia de 20 a 50 cm", "Varia de 1 a 5 kg", "8 a 12 anos",
             "Seus dentes crescem continuamente, por isso precisam roer objetos para desgastá-los.", "img/coelho.webp",
             "Os coelhos são animais sociais e afetuosos que gostam de companhia, conhecidos por suas orelhas longas.");
    
    stmt.run("Papagaio", "domestico", "", "Varia conforme a espécie", "Gaiolas ou viveiros", "Onívora",
             "Varia de 20 cm a 1 metro", "Varia de 100 g a 1 kg", "Até 80 anos",
             "Têm uma língua muscular que lhes permite manipular objetos e alimentos com grande habilidade.", "img/papagaio.jpg",
             "Os papagaios são aves inteligentes e coloridas que podem aprender a imitar sons e palavras. São muito sociais.");


    // 4. Finaliza a inserção
    stmt.finalize((err) => {
        if (err) {
            console.error("Erro ao inserir dados:", err.message);
        } else {
            console.log("Todos os dados foram inseridos com sucesso!");
        }
        
        // 5. Fecha o banco de dados
        db.close((err) => {
            if (err) {
                console.error("Erro ao fechar o banco:", err.message);
            } else {
                console.log('Banco de dados fechado.');
            }
        });
    });
});