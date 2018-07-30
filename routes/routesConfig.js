const fs = require("fs");
const path = require("path");

const adminRouter = require('./admin');
const cabinetRouter = require('./cabinet');
const indexRouter = require('./index');
const loginApiRouter = require('./loginApi/login');
const loginRouter = require('./login');

const adminApiRouter = [];
const adminApiRouterPath = path.join(__dirname, "adminApi");

fs.readdirSync(adminApiRouterPath).forEach(function (file) {
    let router = require("./adminApi/" + file);
    adminApiRouter.push(router);
});

function routesConfig(app) {
    app.use('/', indexRouter);
    app.use('/cabinet', cabinetRouter);
    app.use('/admin', adminRouter);
    app.use('/login', loginRouter);

    app.use('/login/api', loginApiRouter);

    adminApiRouter.forEach(function (route) {
        app.use('/admin/api', route);
    });
}

module.exports = routesConfig;