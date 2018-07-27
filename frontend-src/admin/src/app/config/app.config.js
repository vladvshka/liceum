export default function config($stateProvider, $urlRouterProvider) {
    const dataItemsNames = [
        'content-blocks',
        'disciplines'
    ];

    const mainPageState = {
        name: 'main',
        url: '/main',
        component: 'mainPage'
    }

    $stateProvider.state(mainPageState);

    dataItemsNames.forEach(function (itemName) {
        $stateProvider.state(generateState(itemName, 'list'));
        $stateProvider.state(generateState(itemName, 'add'));
        $stateProvider.state(generateState(itemName, 'edit'));
    });

    $urlRouterProvider.otherwise('/main');

    function generateState(itemName, stateType) {
        const componentName = `${itemName}-${stateType}`;
        let url = `/${itemName}/${stateType}`;
        let resolve = {};

        if (stateType === 'edit') {
            url = url + '/{itemId}';
            resolve = {
                item: getItemGetter(itemName)
            }
        }
        
        return {
            name: componentName,
            url: url,
            component: `${toCamelCase(componentName)}Page`,
            resolve: resolve
        }
    }

    function getItemGetter(itemName) {
        return getItem;

        function getItem(dataService, $transition$) {
            const itemId = $transition$.params().itemId;
            return dataService.getItemById(itemName, itemId);
        }
    }

    function toCamelCase(str) {
        return str.split('-').map(wordToCase).join('');

        function wordToCase(word, index) {

            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    }
}