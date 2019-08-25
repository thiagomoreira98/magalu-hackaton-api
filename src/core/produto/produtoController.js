const repository = require('./produtoRepository'),
    service = require('./produtoService'),
    crypt = require('../../helpers/crypt');

module.exports = {
    listar,
    buscarPorQrCode,
    alterar,
    gerarQrCode
}

function listar(req, res) {
    let produtos = repository.listar(req.query.nome);
    produtos = service.calcPrecoArray(produtos);
    res.json({ produtos });

    const notificacao = require('../notificacao/notificacaoService');
    notificacao.enviar();
}

function buscarPorQrCode(req, res) {
    let id = service.getIdFromQrCode(req.params.qrCode);
    let produto = repository.buscarPorId(id);
    
    if(!produto)
        return res.status(404).json({ message: 'Produto não encontrado' });
    
    produto = service.calcPreco(produto);
    res.json({ produto });
}

function alterar(req, res) {
    repository.alterar(req.params.id, req.body);
    res.end();
}

function gerarQrCode(req, res) {
    let produtos = repository.listar();

    produtos.forEach(p => {
        p.qrCode = crypt.encrypt(`${p.id}-${p.nome}`);
    });

    res.json({ produtos });
}