const adminRouter = require('./admin');
const cabinetRouter = require('./cabinet');
const indexRouter = require('./index');

const contentBlocksRouter = require('./adminApi/contentBlocks');
const settingsRouter = require('./adminApi/settings');
const adminUserRouter = require('./adminApi/adminUser');
//req alll files from folder in 1 array at a time??
const adminApiRouter = [contentBlocksRouter, settingsRouter, adminUserRouter];

function routesConfig(app) {
    app.use('/', indexRouter);
    app.use('/cabinet', cabinetRouter);
    app.use('/admin', adminRouter);

    adminApiRouter.forEach(function (route) {
        app.use('/admin/api', route);
    });

    // cabinetApiRouter.forEach(function (route) {
    //     app.use('/cabinet/api', route);
    // });
}

module.exports = routesConfig;
