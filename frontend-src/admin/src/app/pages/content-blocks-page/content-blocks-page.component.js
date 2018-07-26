import template from './content-blocks-page.template.html';

export default {
    template,
    controller: ('ContentBlocksPageController', ContentBlocksPageController)
};

const ITEM_API_NAME = 'content-blocks';

ContentBlocksPageController.$inject = ['$scope', 'dataService', '$sce'];

function ContentBlocksPageController($scope, dataService, $sce) {
    const vm = this;
    console.log('Controller creation');

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
        //debugger;
        console.log('get server data called');
        dataService
            .getFilteredItems(ITEM_API_NAME, params)
            .then(data => callback(data.items, data.count));
    }
}