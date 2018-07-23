export default function config($stateProvider, $urlRouterProvider) {
    const mainPageState = {
        name: 'main',
        url: '/main',
        component: 'mainPage'
    }

    const contentBlocksPageState = {
        name: 'content-blocks',
        url: '/content-blocks',
        component: 'contentBlocksPage'
    }

    const addContentBlockPageState = {
        name: 'add-content-block',
        url: '/content-blocks/add',
        component: 'addContentBlockPage'
    }

    const editContentBlockPageState = {
        name: 'edit-content-block',
        url: '/content-blocks/{sectionId}',
        component: 'editContentBlockPage',
        resolve: {
            item: getContentBlock
        }
    }

    function getContentBlock (dataService, $transition$) {
        const sectionId = $transition$.params().sectionId;
        return dataService.getItemById('content-blocks', sectionId);
    }

    $stateProvider.state(mainPageState);
    $stateProvider.state(contentBlocksPageState);
    $stateProvider.state(addContentBlockPageState);
    $stateProvider.state(editContentBlockPageState);
    $urlRouterProvider.otherwise('/main');
}