export default function generateController(ITEM_API_NAME) {
    controller.$inject = ['dataService'];
    return controller;

    function controller(dataService) {
        const vm = this;
        vm.ITEM_API_NAME = ITEM_API_NAME;
        vm.item = {};

        vm.onAdd = onAdd;

        function onAdd() {
            console.log(vm.item)
            dataService.addItem(vm.ITEM_API_NAME, vm.item);
        }
    }
}