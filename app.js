const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    config = require('./config/settings'),
    app = express();

app.use('/public/produtos', express.static(path.join(__dirname, '/src/infra/uploads')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./src/api/routes/produtoRoute')(app);
require('./src/api/routes/etiquetaRoute')(app);

app.listen(config.port, () => {
    console.log('Server Online');
});

module.exports = app;