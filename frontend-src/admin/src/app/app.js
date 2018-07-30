/** Import Angular Components **/
import angular from 'angular';
import 'angular-ui-router';

/** Import Side Libs **/
import 'quill';
import 'ng-quill';
import { ngQuillConfigConstant, ngQuillConfig } from './config/ng-quill.config';
import 'bootstrap';

/** Import Angular Data Grid (with minor fixes) **/
import './plugins/angular-data-grid/dataGrid';
import './plugins/angular-data-grid/pagination';

import 'angular-bootstrap-calendar';
import calendarConfig from './config/calendar.config';
//import 'angular-ui-bootstrap';

/** Import own Angular Services **/
import './core/data-service/data-service.module';
import './core/response-service/response-service.module';

/** Import Config **/
import config from './config/app.config';

/** Import Components **/
import AppNavbarComponent from '../app/components/app-navbar/app-navbar.component';
import LoginFormComponent from '../app/components/login-form/login-form.component';
import ResponseServiceMessageComponent from './core/response-service-message/response-service-message.component';

/** Import Page Components **/
import LoginPageComponent from '../app/pages/login-page/login-page.component';
import MainPageComponent from '../app/pages/main-page/main-page.component';
import RtScheduleComponent from '../app/pages/rt-schedule/';

/** API-generator import start **/
import * as Disciplines from '../app/pages/disciplines/components';
import * as ContentBlocks from '../app/pages/content-blocks/components';
/** API-generator import end **/

/**  Import CSS **/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/app.css';
import '../style/pagination.css';
import '../style/quill.snow.css';
import 'angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css';

/** Registering main module and it's components **/
const APP = angular
  .module('app', [
    'ui.router',
    'dataGrid',
    'pagination',
    'ngQuill',
    'mwl.calendar',
    'core.dataService',
    'core.responseService'
  ])
  .config(config)
  .config(calendarConfig)

  /** Ng Quill Configuration **/
APP
  .constant('NG_QUILL_CONFIG', ngQuillConfigConstant)
  .config(ngQuillConfig)

APP
  .component('responseServiceMessage', ResponseServiceMessageComponent)
  .component('appNavbar', AppNavbarComponent)
  .component('loginForm', LoginFormComponent)

/** Register page comonents **/
APP
  .component('loginPage', LoginPageComponent)
  .component('mainPage', MainPageComponent)
  .component('rtSchedule', RtScheduleComponent);


/** API-generator component register start **/
Object.keys(ContentBlocks).map(name => APP.component(`contentBlocks${name}Page`, ContentBlocks[name]));
Object.keys(Disciplines).map(name => APP.component(`disciplines${name}Page`, Disciplines[name]));
/** API-generator component register end **/