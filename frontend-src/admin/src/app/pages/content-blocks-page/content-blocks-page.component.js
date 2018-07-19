import template from './content-blocks-page.template.html';

export default {
    template,
    controller: ('ContentBlocksPageController', ContentBlocksPageController)
};

ContentBlocksPageController.$inject = ['dataService'];

function ContentBlocksPageController(dataService) {
    const vm = this;
    
    vm.gridOptions = {
        data: []
    }

    vm.paginationOptions = {
        totalItems: vm.gridOptions.data.length,
        itemsPerPage: 2
    }

    main();

    function main() {
        dataService.getContentBlocks().then(data => vm.gridOptions.data = data);
    }

}