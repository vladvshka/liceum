const adminRouter = require('./admin');
const cabinetRouter = require('./cabinet');
const indexRouter = require('./index');
const loginApiRouter = require('./loginApi/login');

const contentBlocksRouter = require('./adminApi/contentBlocks');
const settingsRouter = require('./adminApi/settings');
const adminUserRouter = require('./adminApi/adminUser');
//req alll files from folder in 1 array at a time??
const adminApiRouter = [contentBlocksRouter, settingsRouter, adminUserRouter];

function routesConfig(app) {
    app.use('/', indexRouter);
    app.use('/cabinet', cabinetRouter);
    app.use('/admin', adminRouter);
    app.use('/login/api', loginApiRouter);

    adminApiRouter.forEach(function (route) {
        app.use('/admin/api', route);
    });
}

module.exports = routesConfig;