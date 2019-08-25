const config = require('../../../config/settings'),
    admin = require("firebase-admin"),
    serviceAccount = require("../../../magalu-app-firebase-adminsdk.json");

module.exports = {
    enviar
}

async function enviar(idFcm, produto) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://magalu-app.firebaseio.com"
        });
    
        const payload = {
            notification: {
                title: 'Notification Title',
                body: 'This is an example notification',
            }
        };
    
        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24 * 30, // 30     day
        };
    
        delete require.cache[require.resolve('../../infra/db/firebase.json')];
        const { token } = require('../../infra/db/firebase.json');
        admin.messaging().sendToDevice(token, payload, options);
    }
    catch(ex) {
        console.log('firebase err', ex.message || ex.stack);
    }

    // const options = {
    //     url: config.firebase.url,
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `key=${config.firebase.key}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: {
    //         to: idFcm,
    //         data: {
    //             title: '',
    //             message: ''
    //         }
    //     },
    //     json: true
    // }

    // try {
    //     await request(options);
    // }
    // catch (ex) {
    //     throw { message: 'Erro ao enviar a notificacao' };
    // }
}