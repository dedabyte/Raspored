import ngTap from './dir-ng-tap';
import LsService from './ls-service';
import Model from './model';
import rasMain from './main-component';

angular.module('app', [])
  .service('Model', Model)
  .service('LsService', LsService)
  .directive('ngTap', ngTap)
  .component('rasMain', rasMain);