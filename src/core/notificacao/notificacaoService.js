const config = require('../../../config/settings')

module.exports = {
    enviar
}

async function enviar(idFcm, produto) {
    const options = {
        url: config.firebase.url,
        method: 'POST',
        headers: {
            'Authorization': `key=${config.firebase.key}`,
            'Content-Type': 'application/json'
        },
        body: {
            to: idFcm,
            data: {
                title: '',
                message: ''
            }
        },
        json: true
    }

    try {
        await request(options);
    }
    catch (ex) {
        throw { message: 'Erro ao enviar a notificacao' };
    }
}