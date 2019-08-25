const writefile = require('../../helpers/writefile');

module.exports = {
    listar,
    buscarPorId,
    alterar
}

function listar(nome) {
    // removendo o cache do require
    delete require.cache[require.resolve('../../infra/db/produto.json')];

    const produtos = require('../../infra/db/produto.json');
    return produtos.filter(p => p.nome.includes(nome || ''));
}

function buscarPorId(id) {
    // removendo o cache do require
    delete require.cache[require.resolve('../../infra/db/produto.json')];

    const produtos = require('../../infra/db/produto.json');

    return produtos.find(p => p.id == id);
}

function alterar(id, produto) {
    const produtos = require('../../infra/db/produto.json');

    produtos.forEach((p, i) => {
        if (p.id == id) {
            produtos.splice(i, 1, { ...produto, carrinho: p.carrinho });
            writefile('produto', produtos);
        }
    });
}