export default angular
    .module('core.responseService', [])
    .factory('responseService', responseService);

let MSG = {
    // 'success' or 'error'
    type: null,
    body: null
};

responseService.$inject = ['$state'];

function responseService($state) {
    const methods = {
        onSuccess,
        onError,
        checkMSG
    };

    return methods;

    ////////////

    /*
    * Redirects to API base state
    * method is triggered when add / edit / delete
    * operations are successful
    */
    function onSuccess(response, redirectTo) {
        const body = `Your request with ${response.config.method} method to URL ${response.config.url} was successful! :)`;
        MSG = {
            type: 'success',
            body
        }

        $state.go(redirectTo);
    }

    function onError(response) {
        const body = `Something went wrong for your request with ${response.config.method} method to URL ${response.config.url} :(`;

        $state.reload();

        MSG = {
            type: 'error',
            body
        }
    }

    function checkMSG() {
        let returnMsg = MSG;
        resetMSG();
        return returnMsg;
    }

    function resetMSG() {
        MSG = {
            type: null,
            body: null
        };
    }
};