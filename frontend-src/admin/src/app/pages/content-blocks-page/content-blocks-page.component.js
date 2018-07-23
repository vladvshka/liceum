import template from './content-blocks-page.template.html';

export default {
    template,
    controller: ('ContentBlocksPageController', ContentBlocksPageController)
};

const ITEM_API_NAME = 'content-blocks';

ContentBlocksPageController.$inject = ['dataService', '$sce'];

function ContentBlocksPageController(dataService, $sce) {
    const vm = this;

    vm.parseBody = parseBody;
    
    vm.gridOptions = {
        data: []
    }

    vm.paginationOptions = {
        totalItems: vm.gridOptions.data.length,
        itemsPerPage: 2
    }

    main();

    function main() {
        dataService
            .getItems(ITEM_API_NAME)
            .then(data => vm.gridOptions.data = data);
    }

    function parseBody(body) {
        return $sce.trustAsHtml(body);
    }

}