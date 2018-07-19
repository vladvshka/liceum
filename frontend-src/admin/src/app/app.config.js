export default function config($stateProvider, $urlRouterProvider) {
    const mainPageState = {
        name: 'main',
        url: '/main',
        component: 'mainPage'
    }

    const contentBlocksPageState = {
        name: 'contentBlocks',
        url: '/contentBlocks',
        component: 'contentBlocksPage'
    }

    const addContentBlockPageState = {
        name: 'addContentBlock',
        url: '/addContentBlock',
        component: 'addContentBlockPage'
    }

    const editContentBlockPageState = {
        name: 'editContentBlock',
        url: '/contentBlocks/{sectionId}',
        resolve: {
            block: getContentBlock
        },
        component: 'editContentBlockPage'
    }

    function getContentBlock (dataService, $transition$) {
        const sectionId = $transition$.params().sectionId;
        return dataService.getContentBlockById(sectionId);
    }

    $stateProvider.state(mainPageState);
    $stateProvider.state(contentBlocksPageState);
    $stateProvider.state(addContentBlockPageState);
    $stateProvider.state(editContentBlockPageState);
    $urlRouterProvider.otherwise('/main');
}



