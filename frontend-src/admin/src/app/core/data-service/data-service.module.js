export default angular
    .module('core.dataService', ['core.responseService'])
    .factory('dataService', dataService);

const BASE_URL = 'http://localhost:3000';
const API_SECTION = 'admin';
let BASE_API_NAME = '';

dataService.$inject = ['$http', 'responseService'];

function dataService ($http, responseService) {
    const methods = {
        getItems,
        getItemById,
        getFilteredItems,
        addItem,
        editItem,
        deleteItem
    };

    return methods;

    ////////////

    function getItems(baseAPIName) {
        BASE_API_NAME = baseAPIName;

        return $http({
            method: 'GET',
            url: `${BASE_URL}/${API_SECTION}/api/${BASE_API_NAME}`
        })
            .then(handleSuccess, handleError);
    };

    function getItemById(baseAPIName, id) {
        BASE_API_NAME = baseAPIName;
        
                return $http({
            method: 'GET',
            url: `${BASE_URL}/${API_SECTION}/api/${BASE_API_NAME}/${id}`
        })
            .then(handleSuccess, handleError);
    };

    function getFilteredItems(baseAPIName, params) {
        BASE_API_NAME = baseAPIName;

        return $http({
            method: 'GET',
            url: `${BASE_URL}/${API_SECTION}/api/${BASE_API_NAME}${params}`
        })
            .then(handleSuccess, handleError);
    };

    function addItem(baseAPIName, data) {
        BASE_API_NAME = baseAPIName;
        
        return $http({
            method: 'POST',
            url: `${BASE_URL}/${API_SECTION}/api/${BASE_API_NAME}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(handleSuccess, handleError);
    };

    function editItem(baseAPIName, id, data) {
        BASE_API_NAME = baseAPIName;
        
        return $http({
            method: 'PUT',
            url: `${BASE_URL}/${API_SECTION}/api/${BASE_API_NAME}/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(handleSuccess, handleError);
    };

    function deleteItem(baseAPIName, id) {
        BASE_API_NAME = baseAPIName;
        
        return $http({
            method: 'DELETE',
            url: `${BASE_URL}/${API_SECTION}/api/${BASE_API_NAME}/${id}`
        })
            .then(handleSuccess, handleError);
    };

    /*
    * If response method was 'GET' we return data
    * for subsequent handling inside components
    * which called the corresponding dataService method
    * else we delegate further actions to responseService
    */
    function handleSuccess(response) {
        if (response.config.method === 'GET') {
            return response.data;            
        } else {
            responseService.onSuccess(response, BASE_API_NAME);
        }
    }

    function handleError(response) {
        responseService.onError(response);
    }

};