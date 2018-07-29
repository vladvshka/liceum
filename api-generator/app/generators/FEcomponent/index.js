const fs = require('fs-extra');
const path = require('path');
const render = require('../../templateEngine/');
const jade = require('jade');

const viewsFolder = path.join(__dirname, '../../templates/');

function genFEComponent(Model, path) {
    
    path = path + Model.name +'/';
    console.log(path)

    let indexFile = render('fe-pages/index.js.tmpl', {
        name: Model.name
    });

    let componentsFile = render('fe-pages/components.js.tmpl', {
        name: Model.name
    });

    let listPageComponentFile = render('fe-pages/list/page.component.js.tmpl', {
        name: Model.name
    }); 

    let listPageHTML = jade.compileFile(viewsFolder + 'fe-pages/list/page.template.jade', {pretty: true})(Model);
    
    let addPageComponentFile = render('fe-pages/add/page.component.js.tmpl', {
        name: Model.name
    }); 

    let addPageHTML = jade.compileFile(viewsFolder + 'fe-pages/add/page.template.jade', {pretty: true})(Model);

    let editPageComponentFile = render('fe-pages/edit/page.component.js.tmpl', {
        name: Model.name
    }); 

    let editPageHTML = jade.compileFile(viewsFolder + 'fe-pages/edit/page.template.jade', {pretty: true})(Model);
    
    fs.writeFile(path + 'index.js', indexFile, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE pages index.js file has been saved!');
    });

    fs.writeFile(path + 'components.js', componentsFile, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE pages components.js file has been saved!');
    });

    fs.writeFile(path + 'list/page.component.js', listPageComponentFile, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE list/page.component.js file has been saved!');
    });
    fs.writeFile(path + 'list/page.template.html', listPageHTML, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE list/page.template.html file has been saved!');
    });

    fs.writeFile(path + 'add/page.component.js', addPageComponentFile, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE add/page.component.js file has been saved!');
    });
    fs.writeFile(path + 'add/page.template.html', addPageHTML, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE add/page.template.html file has been saved!');
    });

    fs.writeFile(path + 'edit/page.component.js', editPageComponentFile, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE edit/page.component.js file has been saved!');
    });
    fs.writeFile(path + 'edit/page.template.html', editPageHTML, 'utf8', (err) => {
        if (err) throw err;
        console.log('FE edit/page.template.html file has been saved!');
    });
    
    
}



module.exports = genFEComponent;