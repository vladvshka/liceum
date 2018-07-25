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
    vm.editedItem = {};

    vm.$onChanges = onChanges;
    vm.onSave = onSave;
    vm.onDelete = onDelete;
    vm.isFormSubmissionDisabled = isFormSubmissionDisabled;

    function onSave() {
        dataService.editItem(ITEM_API_NAME, vm.item._id, vm.editedItem);
    }

    function onDelete() {
        const id = vm.item._id;
        dataService.deleteItem(ITEM_API_NAME, id);
    }

    function isFormSubmissionDisabled() {
        const itemKeys = Object.keys(vm.editedItem);
        return itemKeys.every(key => vm.editedItem[key] === vm.item[key]);
    }

    function onChanges(changes) {
        const pv = changes.item.previousValue;
        const cv = changes.item.currentValue;
        /*
        * onChanges should only fire once because of 1 binded property
        * which is sent here via Angular UI Router route resolve,
        * but just to be sure we check for uninitialized previous value
        */
        if (Object.keys(pv).length === 0) {
            vm.editedItem = { ...cv };
            // DB-related default fields which should not be sent back to the server
            ['created', 'updated', '__v', '_id'].forEach(prop => delete vm.editedItem[prop]);
        }
    };
}