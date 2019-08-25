const writefile = require('../../helpers/writefile');

module.exports = {
    cadastrarToken
}

function cadastrarToken(req, res) {
    if(req.body.token)
        writefile('firebase', req.body);

    res.json({ message: 'ok' });
}