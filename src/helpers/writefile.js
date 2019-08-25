const fs = require('fs');

module.exports = (collection, array) => {
    fs.writeFileSync(`./src/infra/db/${collection}.json`, JSON.stringify(array));
}