import template from './add-content-block-page.template.html';

export default {
    template,
    controller: ('AddContentBlockPageController', AddContentBlockPageController)
};

AddContentBlockPageController.$inject = ['dataService'];

function AddContentBlockPageController(dataService) {
    const vm = this;

    vm.block = {
        visible: true
    };
    vm.onAdd = onAdd;
    vm.onCancel = onCancel;
    vm.addSuccess = false;

    function onAdd() {
        console.log(vm.block);
        dataService
            .addContentBlock(vm.block)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    vm.addSuccess = true;
                }
            })

    }

    function onCancel() {

    }
}