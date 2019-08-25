const fn = require('../../helpers/fn'),
    controller = require('../../core/produto/produtoController');

module.exports = (app) => {

    app.route('/api/produtos').get(fn(controller.listar));
    app.route('/api/produtos/:qrCode').get(fn(controller.buscarPorQrCode));
    app.route('/api/produtos/:id').put(fn(controller.alterar));

    app.route('/api/gerar-qrCode').get(fn(controller.gerarQrCode));
}