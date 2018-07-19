import template from './main-page.template.html';

export default {
    template,
    controller: ('MainPageController', MainPageController)
};

MainPageController.$inject = [];

function MainPageController() {
    this.onLogOut = onLogOut;

    function onLogOut() {
    }
}