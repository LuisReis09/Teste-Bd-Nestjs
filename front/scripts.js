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

function carregarDados() {
    var tabela = opcao_tabela.value;
    var acao   = opcao_acao.value;
    
    carregarDiv(acao);

    switch(acao){
        case 'listar':
            limparTabela("tela_listar");
            fetch(`http://localhost:4000/${tabela}/getAll`)
            .then(response => response.json())
            .then(data => {
                var tabela = document.getElementById("tela_listar");
                if (data.length == 0) {
                    alert("Nenhum dado encontrado!");
                }

                let colunas = Object.keys(item[0]);

                // Insere a linha de cabecalho das colunas
                let cabecalho = document.createElement('div');
                cabecalho.className = 'linha_cabecalho';
                colunas.forEach(coluna => {
                    let cabecalho_coluna = document.createElement('div');
                    cabecalho_coluna.className = 'celula_cabecalho';
                    cabecalho_coluna.innerText = coluna;
                    cabecalho.appendChild(cabecalho_coluna);
                })
                tabela.appendChild(cabecalho);

                data.forEach(item => {
                    let linha   = document.createElement('div');
                    let valores = Object.values(item);

                    linha.className = 'linha_dados';
                    valores.forEach(valor => {
                        let celula = document.createElement('div');
                        celula.className = 'celula_dados';
                        celula.innerText = valor;
                        linha.appendChild(celula);
                    })
                });
            })

    }
}

function limparTabela(tela) {
    var tabela = document.getElementById(tela);

    var cabecalho = tabela.querySelector('.linha_cabecalho');
    if (cabecalho) cabecalho.remove();
    
    var linhas = [...tabela.querySelectorAll('.linha_dados')];
    if (!linhas || linhas.length == 0) return;
    
    linhas.forEach(linha => {
        linha.remove();
    });
}