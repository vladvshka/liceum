import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { dataGrid, pagination } from './plugins/angular-data-grid';

import quill from 'quill';
import ngQuill from 'ng-quill';

import dataService from './core/data-service/data-service.module';
import config from './app.config';

import LoginPageComponent from '../app/pages/login-page/login-page.component';
import MainPageComponent from '../app/pages/main-page/main-page.component';

import ContentBlocksPageComponent from '../app/pages/content-blocks-page/content-blocks-page.component';
import AddContentBlockPageComponent from '../app/pages/add-content-block-page/add-content-block-page.component';
import EditContentBlockPageComponent from '../app/pages/edit-content-block-page/edit-content-block-page.component';

import AppNavbarComponent from '../app/components/app-navbar/app-navbar.component';
import LoginFormComponent from '../app/components/login-form/login-form.component';

import bootstrap from 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/app.css';
import '../style/quill.snow.css';

angular
  .module('app', [
    'ui.router',
    'dataGrid',
    'pagination',
    'core.dataService',
    'ngQuill'
  ])
  .config(config)
  .component('loginPage', LoginPageComponent)
  .component('mainPage', MainPageComponent)
  .component('contentBlocksPage', ContentBlocksPageComponent)
  .component('addContentBlockPage', AddContentBlockPageComponent)
  .component('editContentBlockPage', EditContentBlockPageComponent)
  .component('appNavbar', AppNavbarComponent)
  .component('loginForm', LoginFormComponent);



