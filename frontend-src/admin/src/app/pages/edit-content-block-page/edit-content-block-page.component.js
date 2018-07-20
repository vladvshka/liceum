import template from './edit-content-block-page.template.html';

export default {
    template,
    controller: ('EditContentBlockPageController', EditContentBlockPageController),
    bindings: {
        item: '<'
    }
};

const ITEM_API_NAME = 'content-blocks';

EditContentBlockPageController.$inject = ['dataService'];

function EditContentBlockPageController(dataService) {
    const vm = this;

    vm.saveSuccess = false;

    vm.onSave = onSave;
    vm.onDelete = onDelete;
    vm.isFormSubmissionDisabled = isFormSubmissionDisabled;

    console.log(vm);
    console.log(vm.item);

    function onSave() {
        console.log('on save fired');
        const { body, header, menuHeader, visible, order, _id } = vm.item;
        const itemData = {
            body,
            header,
            menuHeader,
            visible,
            order
        };

        dataService
            .editItem(ITEM_API_NAME, _id, itemData)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    vm.saveSuccess = true;
                }
            });
    }

    function onDelete() {
        const id = vm.item._id;
        console.log(`i'm calling a del function with ${id}`);
        console.log(dataService.deleteItem(ITEM_API_NAME, id));
    }

    function isFormSubmissionDisabled() {
        return false;
    }
}