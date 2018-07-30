
var fs = require('fs-extra');
var path = require('path'); 

var genSchema = require('./generators/schema/');
var genRouter = require('./generators/router/');
var genFEComponent = require('./generators/FEcomponent/');
var genAppSettings = require('./generators/appSettings/');

const APP_FOLDER = path.join(__dirname, '../../');

const MODEL_PATH = path.join(APP_FOLDER, '/models/');
const ROUTER_PATH = path.join(APP_FOLDER, '/routes/adminApi/');

const FE_APP_PATH = path.join(APP_FOLDER, '/frontend-src/admin/src/app/');
const FE_COMPONENT_PATH = path.join(FE_APP_PATH, '/pages/');

function generateAPI (filename) {
    var Model = {};

    readModelFile()

    function readModelFile() {
        fs.readFile('./models/' + filename, 'utf8', onModelFileRead);
    }

    function onModelFileRead (err, buf) {
        if (buf) {
            Model = JSON.parse(buf);
            fs.mkdirsSync(FE_COMPONENT_PATH + Model.name + '/list/');
            fs.mkdirsSync(FE_COMPONENT_PATH + Model.name + '/add/');
            fs.mkdirsSync(FE_COMPONENT_PATH + Model.name + '/edit/');

            genSchema(Model, MODEL_PATH);
            genRouter(Model, ROUTER_PATH);
            genFEComponent(Model, FE_COMPONENT_PATH);
            genAppSettings(Model, FE_APP_PATH);

        } else {
            console.log('Can not read file ./models/'+filename)
        }
    }



    
}


module.exports = { generateAPI };