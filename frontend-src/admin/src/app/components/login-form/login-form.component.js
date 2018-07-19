import template from './login-form.template.html';

export default {
    template,
    bindings: {
        onLogIn: '<'
    },
    controller: ('LoginFormController', LoginFormController)
};


function LoginFormController() {
    console.log('hello from LoginFormController');
}