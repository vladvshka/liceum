const adminRouter = require('./admin');
const cabinetRouter = require('./cabinet');
const indexRouter = require('./index');

const contentBlocksRouter = require('./adminApi/contentBlocks');
const adminApiRouter = [contentBlocksRouter];

function routesConfig (app) {
    app.use('/', indexRouter);
    app.use('/cabinet', cabinetRouter);
    app.use('/admin', adminRouter);

    adminApiRouter.forEach(function(route) {
        app.use('/admin/api', route);
    });

    return app;
}

module.exports = routesConfig;