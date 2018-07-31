var fs = require('fs-extra');
const render = require('../../templateEngine/');

function genSchema(Model, path) {
    let fileContent;
    const textFilters = [];
    
    let onUpdate = '';

    if (Model.onUpdate) {
        onUpdate = Model.onUpdate.join("\n");
    }

    let schemaStr = JSON.stringify(Model.schema, null, 4);

    schemaStr = schemaStr
        .replace(/"#/g, '')
        .replace(/#"/g, '');

    Model.fe.pages.list.filters.forEach(filter => {
        if (filter.type === 'text') {
            textFilters.push(filter.name);
        }
    });    

    fileContent = render('model.schema.tmpl', {
        name: Model.name,
        schema: schemaStr,
        textFilters: '["' + textFilters.join('", "') + '"]',
        onUpdate:  onUpdate,
    })     
    
    fs.writeFile(path + Model.name + '.js', fileContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('Model schema .js file has been saved!');
    });
}

module.exports = genSchema;