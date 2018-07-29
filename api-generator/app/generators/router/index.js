var fs = require('fs-extra');
var render = require('../../templateEngine/');

function genRouter(Model, path) {
    let fileContent;
    const textFilters = [];
    
    Model.fe.pages.list.filters.forEach(filter => {
        if (filter.type === 'text') {
            textFilters.push(filter.name);
        }
    });

    fileContent = render('model.router.tmpl', {
        name: Model.name,
        textFilters: '["' + textFilters.join('", "') + '"]'
    });
    
    fs.writeFile(path + Model.name + '.js', fileContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('Router BE .js file has been saved!');
    });
}

module.exports = genRouter;