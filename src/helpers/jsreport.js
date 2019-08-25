const fs = require('fs'),
    jsreport = require("jsreport");

module.exports = {
    render
}

async function render(data) {
    return new Promise((resolve, reject) => {

        jsreport.render({
            template: {
                content: fs.readFileSync('./src/resources/etiqueta.html', 'utf-8'),
                phantom: { orientation: 'portrait' },
                engine: 'handlebars',
                recipe: 'phantom-pdf'
            },
            data: {
                ...data,
                nome: data.nome.toUpperCase()
            }
        }).then((out) => {
            resolve(out.content);
        }).catch((e) => {
            return reject(e);
        });
    })
}