const jsreport = require('../../helpers/jsreport'),
    fs = require('fs');

module.exports = {
    gerar
}

async function gerar(produto) {
    let content = await jsreport.render(produto);
    let fullPath = require('path').resolve(__dirname, '../infra/uploads/etiqueta/etiqueta.pdf');
    let existe = fs.existsSync(fullPath);

    if (existe)
        fs.unlinkSync(fullPath);

    fs.writeFileSync(`./src/infra/uploads/etiqueta/etiqueta.pdf`, content);
    // let pdf = fs.readFileSync('./src/infra/uploads/etiqueta/etiqueta.pdf', 'utf-8');
    return content;
}