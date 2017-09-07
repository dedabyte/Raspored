String.prototype.toInt = function(){
  return parseInt(this);
};
Number.prototype.toInt = function(){
  return parseInt(this);
};
Number.prototype.toTime = function(){
  var hours = parseInt(this / 100);
  var mins = this % 100;
  mins = mins < 9 ? ('0' + mins) : mins;
  return hours + ':' + mins;
};

var ras = angular.module('app', []);