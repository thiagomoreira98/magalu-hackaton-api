const service = require('./etiquetaService'),
    produtoRepository = require("../produto/produtoRepository"),
    produtoService = require("../produto/produtoService");

module.exports = {
    gerar
}

async function gerar(req, res) {
    let produto = produtoRepository.buscarPorId(req.params.idProduto);
    produto = produtoService.calcPreco(produto);
    produto.qrCode = await produtoService.gerarQrCode(produto);
    let etiqueta = await service.gerar(produto);
    // res.contentType("application/pdf");
    // res.send(etiqueta);

    res.write(etiqueta, 'binary');
    res.end(null, 'binary');
}