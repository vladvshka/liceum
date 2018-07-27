import template from './page.template.html';
import generateController from '../../../core/base-component-controllers/add';

const controller = generateController();
controller.prototype.ITEM_API_NAME = 'content-blocks';

export default {
    template,
    controller
};
