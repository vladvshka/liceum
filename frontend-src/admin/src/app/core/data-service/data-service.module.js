export default angular
    .module('core.dataService', [])
    .factory('dataService', dataService);

dataService.$inject = ['$http', '$q'];

function dataService($http, $q) {

    const methods = {
        getContentBlocks,
        getContentBlockById,
        editContentBlock,
        deleteContentBlock,
        addContentBlock
    };

    return methods;

    ////////////

    function getContentBlocks() {
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/admin/api/content-blocks'
        })
            .then(response => response.data)
            .catch(response => console.log(response));
    };

    function getContentBlockById(id) {
        return $http({
            method: 'GET',
            url: `http://localhost:3000/admin/api/content-blocks/${id}`
        })
            .then(response => response.data)
            .catch(response => console.log(response));
    };

    function editContentBlock(id, data) {
        return $http({
            method: 'PUT',
            url: `http://localhost:3000/admin/api/content-blocks/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(response => response)
            .catch(response => console.log(response));
    };

    function deleteContentBlock(id) {
        return $http({
            method: 'DELETE',
            url: `http://localhost:3000/admin/api/content-blocks/${id}`
        })
            .then(response => response)
            .catch(response => console.log(response));
    };

    function addContentBlock(data) {
        return $http({
            method: 'POST',
            url: 'http://localhost:3000/admin/api/content-blocks',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(response => response)
            .catch(response => console.log(response));
    };
};