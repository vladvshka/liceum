import template from './add-content-block-page.template.html';

// global variable for route ??? exportedTemplate = template
// set variable inside controller ???
// https://stackoverflow.com/questions/38647207/is-there-a-way-to-dynamically-render-different-templates-for-an-angular-1-5-comp

export default {
    template,
    controller: ('AddContentBlockPageController', AddContentBlockPageController)
};

const ITEM_API_NAME = 'content-blocks';

AddContentBlockPageController.$inject = ['dataService'];

function AddContentBlockPageController(dataService) {
    const vm = this;

    // initialize object for ng-model binding
    vm.item = {
        header: '',
        menuHeader: '',
        body: '',
        visible: true,
        order: null
    };
    
    vm.onAdd = onAdd;

    function onAdd() {
        dataService.addItem(ITEM_API_NAME, vm.item);
    }
}