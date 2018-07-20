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

    // empty object for ng-model binding
    vm.item = {};
    /*
     * initializing a boolean in the object because by default
     * ng-model in input type=checkbox doesn't do that
     */
    vm.item.visible = true;
    
    vm.addSuccess = false;
    vm.addFailure = false;

    vm.onAdd = onAdd;

    function onAdd() {
        dataService
            .addItem(ITEM_API_NAME, vm.item)
            .then(response => {
                console.log(response);
                console.log(response.status);
                if (response.status === 200) {
                    vm.addSuccess = true;
                    vm.addFailure = false;
                } else if (response.status === 500) {
                    vm.addSuccess = false;
                    vm.addFailure = true;
                }
            });
    }
}