import template from './content-blocks-page.template.html';

export default {
    template,
    controller: ('ContentBlocksPageController', ContentBlocksPageController)
};

const ITEM_API_NAME = 'content-blocks';

ContentBlocksPageController.$inject = ['$scope', 'dataService', '$sce'];

function ContentBlocksPageController($scope, dataService, $sce) {
    const vm = this;

    vm.parseBody = parseBody;

    vm.gridOptions = {
        data: [],
        urlSync: true,
        getData: getServerData
    };

    function parseBody(body) {
        return $sce.trustAsHtml(body);
    }

    function getServerData(params, callback) {
        console.log('***calling getServerData fn; params below***');
        console.log(params);
        console.log('***end params***');

        dataService
            .getItems(ITEM_API_NAME)
            .then(data => {
                callback(data, data.length);
            });
    }
}