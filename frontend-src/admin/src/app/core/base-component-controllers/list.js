export default function generateController(ITEM_API_NAME) {
    controller.$inject = ['dataService', '$sce'];
    return controller;

    function controller(dataService, $sce) {
        const vm = this;
        vm.ITEM_API_NAME = ITEM_API_NAME;

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
            dataService
                .getFilteredItems(vm.ITEM_API_NAME, params)
                .then(data => callback(data.items, data.count));
        }
    }
}
