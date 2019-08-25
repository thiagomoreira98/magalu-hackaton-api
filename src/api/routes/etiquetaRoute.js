const fn = require('../../helpers/fn'),
    controller = require('../../core/etiqueta/etiquetaController');

module.exports = (app) => {

    app.route('/api/etiqueta-gerar/:idProduto').get(fn(controller.gerar, true));
}