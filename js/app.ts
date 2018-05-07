import ngTap from "./dir-ng-tap";
import {Model} from "./model";
import LsService from "./ls-service";
import rasMainComponent from "./main-component";

angular.module('app', [])
  .service('Model', Model)
  .service('LsService', LsService)
  .directive('ngTap', ngTap)
  .component('rasMain', rasMainComponent);

angular
  .bootstrap(document.documentElement, ['app']);