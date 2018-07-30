import template from './page.template.html'; import generateController from '../../../core/base-component-controllers/edit';  import settings from '../';
const controller = generateController(settings.ITEM_API_NAME);
export default {
  template,
  controller,
  bindings: {
    item: '<'
  }
};