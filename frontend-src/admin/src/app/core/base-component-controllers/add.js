export default function generateController() {
    controller.$inject = ['dataService'];
    return controller;

    function controller(dataService) {
        const vm = this;
        vm.item = {};

        vm.onAdd = onAdd;

        function onAdd() {
            dataService.addItem(vm.ITEM_API_NAME, vm.item);
        }
    }
}