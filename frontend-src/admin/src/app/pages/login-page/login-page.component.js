import template from './login-page.template.html';

export default {
    template,
    controller: ('LoginPageController', LoginPageController)
};

LoginPageController.$inject = [];

function LoginPageController() {
    this.onLogIn = onLogIn;

    function onLogIn() {
    }
}