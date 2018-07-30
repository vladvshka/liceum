const fs = require('fs-extra');

function genAppSettings(Model, path) {
    console.log('path', path)

    let appJs = fs.readFileSync(path + 'app.js', 'utf8').toString().split('\n');
    let appConfigJs = fs.readFileSync(path + 'config/app.config.js', 'utf8').toString().split('\n');
    let importStartLineNum = 0;
    let importEndLineNum = 0;
    let registerStartLineNum = 0;
    let registerEndLineNum = 0;
    let importUrl = '../app/pages/' + Model.name + '/components'
    let importExistsFlag = false;
    for (var i =0; i < appJs.length; i++) {
        if (appJs[i].indexOf('API-generator import start') > -1 ) {
            importStartLineNum = i + 1;
        }
        if (appJs[i].indexOf('API-generator import end') > -1 ) {
            importEndLineNum = i - 1;
        }
        if (appJs[i].indexOf('API-generator component register start') > -1 ) {
            registerStartLineNum = i + 1;
        }
        if (appJs[i].indexOf('API-generator component register ens') > -1 ) {
            registerEndLineNum = i - 1;
        }
    }
    for(i = importStartLineNum; i <= importEndLineNum; i++) {
        if (appJs[i].indexOf(importUrl) > -1) {
            importExistsFlag = true;
        }
    }

    if (!importExistsFlag) {
        appJs.splice(importEndLineNum, 0, "import * as " + toCamelCase(Model.name, true) + " from '" + importUrl + "';");
        appJs.splice(registerEndLineNum - 1, 0, "Object.keys(" + toCamelCase(Model.name, true) + ").map(name => APP.component(\`" + toCamelCase(Model.name, false) + "${name}Page\`, " + toCamelCase(Model.name, true) + "[name]));");
    }


    for (var i =0; i < appConfigJs.length; i++) {
        if (appConfigJs[i].indexOf('API-generator state names start') > -1 ) {
            importStartLineNum = i + 2;
        }
        if (appConfigJs[i].indexOf('API-generator state names end') > -1 ) {
            importEndLineNum = i - 2;
        }
    }

    importExistsFlag = false;

    for(i = importStartLineNum; i <= importEndLineNum; i++) {
        if (appConfigJs[i].indexOf(Model.name) > -1) {
            importExistsFlag = true;
        }
    }

    if (!importExistsFlag) {
        appConfigJs.splice(importStartLineNum, 0, "        '" + Model.name+ "',");
    }


    
    fs.writeFile(path + 'app.js', appJs.join('\n'), 'utf8', (err) => {
        if (err) throw err;
        console.log('FE app.js file has been saved!');
    });
    fs.writeFile(path + 'config/app.config.js', appConfigJs.join('\n'), 'utf8', (err) => {
        if (err) throw err;
        console.log('FE appconfig.js file has been saved!');
    });
} 


function toCamelCase(str, isFirstLetterCups) {
    return str.split('-').map(wordToCase).join('');

    function wordToCase(word, index) {

        if (index === 0 && !isFirstLetterCups) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
}

module.exports = genAppSettings;