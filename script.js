/*
=====================================================================
  ADS Sistemas | Catálogo de Veículos
  script.js — Introdução ao JavaScript, em etapas

  Cada ETAPA apresenta um conceito novo. A ideia é ir liberando
  uma etapa por vez em aula (dá para comentar as etapas seguintes
  e ir "descomentando" conforme a turma avança).

  Etapa 1 – Eventos e alert           (botão Login)
  Etapa 2 – Variáveis e DOM           (ano do rodapé)
  Etapa 3 – Condicionais              (saudação no cabeçalho)
  Etapa 4 – Classes CSS via JS        (menu no celular)
  Etapa 5 – Arrays, objetos e laços   (cards gerados por dados)
  Etapa 6 – Strings e lógica de busca (barra de busca)
  Extra   – Favoritar um card         (revisão de eventos + classList)

  Obs.: a etapa 5 vem ANTES da busca porque a busca precisa
  enxergar os cards que o JavaScript criou.
=====================================================================
*/

// Primeiro teste: abra o console do navegador (F12 → Console).
// Se esta mensagem aparecer, o arquivo foi carregado corretamente.
console.log('script.js carregado!');


/* =================================================================
   ETAPA 1 — EVENTOS
   Conceitos: selecionar um elemento, "escutar" um clique, alert.
   ================================================================= */

// document.querySelector usa o MESMO seletor que usamos no CSS
const btnLogin = document.querySelector('.btn-login');

// addEventListener: "quando acontecer um clique, execute esta função"
btnLogin.addEventListener('click', function () {
    alert('Área de login em construção!');
    console.log('O botão de login foi clicado.');
});


/* =================================================================
   ETAPA 2 — VARIÁVEIS E ALTERAÇÃO DO HTML (DOM)
   Conceitos: const, objeto Date, textContent, template string.
   ================================================================= */

// const = valor que não vai mudar dentro deste trecho
const anoAtual = new Date().getFullYear();

const textoRodape = document.querySelector('.rodape-conteudo p');

// Template string: usa crase (`) e permite inserir variáveis com ${ }
textoRodape.textContent = `© ${anoAtual} | ADS Sistemas. Desenvolvido para fins didáticos.`;


/* =================================================================
   ETAPA 3 — CONDICIONAIS
   Conceitos: let, if / else if / else, operadores de comparação.
   ================================================================= */

const hora = new Date().getHours(); // número de 0 a 23
let saudacao; // let = variável que vai receber valor depois

if (hora < 12) {
    saudacao = 'Bom dia!';
} else if (hora < 18) {
    saudacao = 'Boa tarde!';
} else {
    saudacao = 'Boa noite!';
}

const titulo = document.querySelector('.header-block h1');
titulo.textContent = `${saudacao} A empresa certa para você!`;


/* =================================================================
   ETAPA 4 — MENU NO CELULAR (CLASSES CSS PELO JAVASCRIPT)
   Conceitos: classList.toggle. O JS só liga/desliga uma classe;
   quem decide a aparência continua sendo o CSS (.menu-aberto).
   Para testar: diminua a janela para menos de 800px de largura.
   ================================================================= */

const btnMenu = document.querySelector('.btn-menu');
const listaMenu = document.querySelector('nav ul');

btnMenu.addEventListener('click', function () {
    // toggle: se a classe existe, remove; se não existe, adiciona
    listaMenu.classList.toggle('menu-aberto');
});


/* =================================================================
   ETAPA 5 — CARDS GERADOS A PARTIR DE DADOS
   Conceitos: array, objeto, forEach, innerHTML, formatação de moeda.
   Para adicionar um carro novo, basta acrescentar um item no array!
   ================================================================= */

// Array (lista) de objetos (cada objeto descreve um veículo)
const veiculos = [
    {
        icone: '🚗',
        nome: 'Modelo Urbano',
        descricao: 'Compacto e ágil, ideal para o trânsito na cidade.',
        preco: 70000
    },
    {
        icone: '🏎️',
        nome: 'Modelo Esportivo',
        descricao: 'Design arrojado, dinâmico, para quem gosta de estilo.',
        preco: 380000
    },
    {
        icone: '🚙',
        nome: 'Modelo Família',
        descricao: 'Mais espaço para a sua família, com porta-malas grande.',
        preco: 170000
    },
    {
        icone: '🛻',
        nome: 'Modelo Aventura',
        descricao: 'Picape elétrica para trabalho e lazer fora da cidade.',
        preco: 290000
    }
];

// Função que transforma um número em moeda brasileira: 70000 → R$ 70.000,00
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const grade = document.querySelector('.grade-catalogo');

// Apaga os cards escritos à mão no HTML; agora quem cria é o JS
grade.innerHTML = '';

// Para cada veículo da lista, criamos um card
veiculos.forEach(function (veiculo) {
    grade.innerHTML += `
        <div class="card">
            <div class="imagem-card">${veiculo.icone}</div>
            <h3>${veiculo.nome}</h3>
            <p>${veiculo.descricao}</p>
            <span class="preco">${formatarPreco(veiculo.preco)}</span>
        </div>
    `;
});

console.log(`Foram criados ${veiculos.length} cards.`);


/* =================================================================
   ETAPA 6 — BARRA DE BUSCA
   Conceitos: ler o valor de um input, strings (toLowerCase,
   includes), querySelectorAll, operador ternário, eventos de teclado.
   ================================================================= */

const campoBusca = document.querySelector('.buscatexto');
const botaoBusca = document.querySelector('.buscabotao');
const semResultados = document.querySelector('.sem-resultados');

function buscar() {
    // .value pega o que foi digitado; .trim() tira espaços das pontas
    const termo = campoBusca.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    let encontrados = 0;

    cards.forEach(function (card) {
        const textoDoCard = card.textContent.toLowerCase();

        if (textoDoCard.includes(termo)) {
            card.style.display = 'block'; // mostra
            encontrados++;                // soma 1
        } else {
            card.style.display = 'none';  // esconde
        }
    });

    // Mostra a mensagem só quando nada foi encontrado
    semResultados.hidden = encontrados > 0;
}

// Busca ao clicar no botão...
botaoBusca.addEventListener('click', buscar);

// ...e também enquanto o usuário digita
campoBusca.addEventListener('keyup', buscar);


/* =================================================================
   EXTRA — FAVORITAR UM CARD
   Revisão: eventos + classList, agora em vários elementos.
   ================================================================= */

document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
        card.classList.toggle('favorito');
    });
});
