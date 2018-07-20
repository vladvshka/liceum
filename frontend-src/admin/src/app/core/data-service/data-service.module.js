export default angular
    .module('core.dataService', [])
    .factory('dataService', dataService);

const BASE_URL = 'http://localhost:3000';
const API_SECTION = 'admin';

dataService.$inject = ['$http'];

function dataService ($http) {
    const methods = {
        getItems,
        getItemById, 
        addItem,
        editItem,
        deleteItem
    };

    return methods;

    ////////////

    function getItems(itemAPIName) {
        return $http({
            method: 'GET',
            url: `${BASE_URL}/${API_SECTION}/api/${itemAPIName}`
        })
            .then(response => response.data)
            .catch(response => response);
    };

    function getItemById(itemAPIName, id) {
        return $http({
            method: 'GET',
            url: `${BASE_URL}/${API_SECTION}/api/${itemAPIName}/${id}`
        })
            .then(response => response.data)
            .catch(response => response);
    };

    function addItem(itemAPIName, data) {
        return $http({
            method: 'POST',
            url: `${BASE_URL}/${API_SECTION}/api/${itemAPIName}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(response => response)
            .catch(response => response);
    };

    function editItem(itemAPIName, id, data) {
        return $http({
            method: 'PUT',
            url: `${BASE_URL}/${API_SECTION}/api/${itemAPIName}/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(response => response)
            .catch(response => response);
    };

    function deleteItem(itemAPIName, id) {
        return $http({
            method: 'DELETE',
            url: `${BASE_URL}/${API_SECTION}/api/${itemAPIName}/${id}`
        })
            .then(response => response)
            .catch(response => response);
    };
};