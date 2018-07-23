import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import './plugins/angular-data-grid/dataGrid';
import './plugins/angular-data-grid/pagination';

import 'quill';
import 'ng-quill';
import { ngQuillConfigConstant, ngQuillConfig } from './config/ng-quill.config';

import './core/data-service/data-service.module';
import './core/response-service/response-service.module';
import config from './config/app.config';

import LoginPageComponent from '../app/pages/login-page/login-page.component';
import MainPageComponent from '../app/pages/main-page/main-page.component';

import ContentBlocksPageComponent from '../app/pages/content-blocks-page/content-blocks-page.component';
import AddContentBlockPageComponent from '../app/pages/add-content-block-page/add-content-block-page.component';
import EditContentBlockPageComponent from '../app/pages/edit-content-block-page/edit-content-block-page.component';

import AppNavbarComponent from '../app/components/app-navbar/app-navbar.component';
import LoginFormComponent from '../app/components/login-form/login-form.component';

import './core/response-service/response-service.module';
import ResponseServiceMessageComponent from './core/response-service-message/response-service-message.component';

import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/app.css';
import '../style/pagination.css';
import '../style/quill.snow.css';

angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'dataGrid',
    'pagination',
    'ngQuill',
    'core.dataService',
    'core.responseService'
  ])
  .constant('NG_QUILL_CONFIG', ngQuillConfigConstant)
  .config(ngQuillConfig)
  .config(config)
  .component('responseServiceMessage', ResponseServiceMessageComponent)
  .component('loginPage', LoginPageComponent)
  .component('mainPage', MainPageComponent)
  .component('contentBlocksPage', ContentBlocksPageComponent)
  .component('addContentBlockPage', AddContentBlockPageComponent)
  .component('editContentBlockPage', EditContentBlockPageComponent)
  .component('appNavbar', AppNavbarComponent)
  .component('loginForm', LoginFormComponent);