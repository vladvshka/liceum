import template from './response-service-message.template.html';

export default {
    template,
    controller: ('ResponseServiceMessage', ResponseServiceMessage)
};

ResponseServiceMessage.$inject = ['$scope', 'responseService'];

function ResponseServiceMessage($scope, responseService) {
    const vm = this;
    vm.alertMessage = {};
    vm.alertNgClassMap = {
        'success': 'alert-success',
        'error': 'alert-danger'
    };
    
    $scope.$on('ResponseError', checkMessage);
    
    checkMessage();

    function checkMessage() {
        vm.alertMessage = responseService.checkMSG();
    }
}