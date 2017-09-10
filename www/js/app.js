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
Date.prototype.getWeek = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 2, 12));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

var ras = angular.module('app', []);