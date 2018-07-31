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
        const body = `Ваш запрос с методом ${response.config.method} по URL ${response.config.url} отработал успешно! :)`;
        MSG = {
            type: 'success',
            body
        }

        $state.go(redirectTo);
    }

    function onError(response) {
        const body = `Что-то пошло не так для запроса с методом ${response.config.method} по URL ${response.config.url} :(`;

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