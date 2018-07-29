var fs = require('fs-extra');
const render = require('../../templateEngine/');

function genSchema(Model, path) {
    let fileContent;

    let schemaStr = JSON.stringify(Model.schema, null, 4);

    schemaStr = schemaStr
        .replace(/"#/g, '')
        .replace(/#"/g, '');

    fileContent = render('model.schema.tmpl', {
        name: Model.name,
        schema: schemaStr
    })     
    
    fs.writeFile(path + Model.name + '.js', fileContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('Model schema .js file has been saved!');
    });
}

module.exports = genSchema;