var opcao_tabela = document.getElementById('tabela');
var opcao_acao   = document.getElementById('acao');
var telas        = [...document.querySelectorAll('.container')];
var tabela_ativa;

function carregarDiv(acao) {
    telas.forEach(tela => {
        tela.style.display = 'none';
    });
    
    switch (acao) {
        case 'inserir':
            tabela_ativa = document.getElementById('tela_inserir');
            tabela_ativa.style.display = 'flex';
            break;
        case 'atualizar':
            tabela_ativa = document.getElementById('tela_atualizar');
            tabela_ativa.style.display = 'flex';
            break;
        case 'deletar':
            tabela_ativa = document.getElementById('tela_deletar');
            tabela_ativa.style.display = 'flex';
            break;
        case 'listar':
            tabela_ativa = document.getElementById('tela_listar');
            tabela_ativa.style.display = 'flex';
            break;
    }
}

// function carregarDados() {
//     var tabela = opcao_tabela.value;
//     var acao   = opcao_acao.value;
    
//     carregarDiv(acao);

//     switch(acao){
//         case 'listar':
//             fetch(`http://localhost:8080/${tabela}/`)
//             .then(response => {

//     }
// }