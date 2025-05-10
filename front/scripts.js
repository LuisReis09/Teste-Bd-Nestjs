var opcao_tabela = document.getElementById('tabela');
var opcao_acao   = document.getElementById('acao');
var telas        = [...document.querySelectorAll('.container')];
var tabela_ativa;
var filtrar      = document.getElementById('filtrar');

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
            fetch(`http://localhost:3000/${tabela}/colunas`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var cabecalho = document.createElement('div');
                cabecalho.classList.add('linha_cabecalho');
                data.colunas.forEach(coluna => {
                    var colunaCabecalho = document.createElement('div');
                    colunaCabecalho.classList.add('coluna_cabecalho');
                    colunaCabecalho.innerText = coluna;
                    cabecalho.appendChild(colunaCabecalho);
                });
                tabela_ativa.appendChild(cabecalho);
            })
            .then(() => {
                fetch(`http://localhost:3000/${tabela}/listar`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data.forEach(linha => {
                        var linhaDados = document.createElement('div');
                        linhaDados.classList.add('linha_dados');
                        Object.values(linha).forEach(valor => {
                            var colunaDados = document.createElement('div');
                            colunaDados.classList.add('coluna_dados');
                            colunaDados.innerText = valor;
                            linhaDados.appendChild(colunaDados);
                        });
                        tabela_ativa.appendChild(linhaDados);
                    });
                });
            });

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

filtrar.addEventListener('click', () => {
    let tipo_filtro = document.getElementById('tipo_filtro').value;
    let valor_filtro = document.getElementById('valor_filtro').value;

    if (tipo_filtro == 'idade'){
        fetch(`http://localhost:3000/${opcao_tabela.value}/listarPorIdade/${valor_filtro}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            limparTabela("tela_listar");
            var cabecalho = document.createElement('div');
            cabecalho.classList.add('linha_cabecalho');
            Object.keys(data[0]).forEach(coluna => {
                var colunaCabecalho = document.createElement('div');
                colunaCabecalho.classList.add('coluna_cabecalho');
                colunaCabecalho.innerText = coluna;
                cabecalho.appendChild(colunaCabecalho);
            });
            tabela_ativa.appendChild(cabecalho);

            data.forEach(linha => {
                var linhaDados = document.createElement('div');
                linhaDados.classList.add('linha_dados');
                Object.values(linha).forEach(valor => {
                    var colunaDados = document.createElement('div');
                    colunaDados.classList.add('coluna_dados');
                    colunaDados.innerText = valor;
                    linhaDados.appendChild(colunaDados);
                });
                tabela_ativa.appendChild(linhaDados);
            });
        });
    }else{
        fetch(`http://localhost:3000/${opcao_tabela.value}/listarPorNome/${valor_filtro}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            limparTabela("tela_listar");
            var cabecalho = document.createElement('div');
            cabecalho.classList.add('linha_cabecalho');
            Object.keys(data[0]).forEach(coluna => {
                var colunaCabecalho = document.createElement('div');
                colunaCabecalho.classList.add('coluna_cabecalho');
                colunaCabecalho.innerText = coluna;
                cabecalho.appendChild(colunaCabecalho);
            });
            tabela_ativa.appendChild(cabecalho);

            data.forEach(linha => {
                var linhaDados = document.createElement('div');
                linhaDados.classList.add('linha_dados');
                Object.values(linha).forEach(valor => {
                    var colunaDados = document.createElement('div');
                    colunaDados.classList.add('coluna_dados');
                    colunaDados.innerText = valor;
                    linhaDados.appendChild(colunaDados);
                });
                tabela_ativa.appendChild(linhaDados);
            });
        });
    }
});