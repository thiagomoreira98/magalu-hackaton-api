const crypt = require('../../helpers/crypt'),
    QRCode = require('qrcode');

module.exports = {
    getIdFromQrCode,
    calcPreco,
    calcPrecoArray,
    gerarQrCode
}

function getIdFromQrCode(qrCode) {
    try {
        let id = crypt.decrypt(qrCode).split('-')[0];
        return id;
    }
    catch (ex) {
        throw { message: 'QrCode inválido' };
    }
}

function calcPrecoArray(produtos) {
    if (!produtos)
        return [];

    produtos.forEach(p => {
        p = calcPreco(p);
    });

    return produtos;
}

function calcPreco(p) {
    p.precoParcelado = (p.preco + (p.preco * (p.taxaJuros / 100)))
    p.preco = p.preco.toFixed(2);
    p.parcelas = (p.precoParcelado / 15).toFixed(2);
    p.precoParcelado = p.precoParcelado.toFixed(2);
    return p;
}

async function gerarQrCode(produto) {
    let text = crypt.encrypt(`${produto.id}-${produto.nome}`);
    return QRCode.toDataURL(text);
}