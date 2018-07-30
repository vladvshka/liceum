import template from './page.template.html'; import generateController from '../../../core/base-component-controllers/add';  import settings from '../';
const controller = generateController(settings.ITEM_API_NAME);
export default {
  template,
  controller
};