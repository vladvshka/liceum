import template from './response-service-message.template.html';

export default {
    template,
    controller: ('ResponseServiceMessage', ResponseServiceMessage)
};

ResponseServiceMessage.$inject = ['responseService'];

function ResponseServiceMessage(responseService) {
    const vm = this;
    vm.alertMessage = {};
    vm.alertNgClassMap = {
        'success': 'alert-success',
        'error': 'alert-danger'
    };

    main();

    function main() {
        vm.alertMessage = responseService.checkMSG();
    }
}