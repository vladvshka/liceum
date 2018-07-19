import template from './edit-content-block-page.template.html';

export default {
    template,
    bindings: {
        block: '<'
    },
    controller: ('EditContentBlockPageController', EditContentBlockPageController)
};

EditContentBlockPageController.$inject = ['dataService'];

function EditContentBlockPageController(dataService) {
    const vm = this;

    vm.saveSuccess = false;

    vm.onSave = onSave;
    vm.onDelete = onDelete;

    console.log(vm);

    function onSave() {
        console.log('on save fired');
        const { body, header, menuHeader, visible, order, _id } = vm.block;
        const blockData = {
            body,
            header,
            menuHeader,
            visible,
            order
        };

        dataService
            .editContentBlock(_id, blockData)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    vm.saveSuccess = true;
                }
            });
    }

    function onDelete() {
        const id = vm.block._id;
        console.log(`i'm calling a del function with ${id}`);
        console.log(dataService.deleteContentBlock(id));

    }
}