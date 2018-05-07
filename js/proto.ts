interface String {
  toInt(): number;
}

interface Number {
  toInt(): number;
  toTime(): string;
}

interface Date {
  getWeek(): number;
}

String.prototype.toInt = function(){
  return parseInt(this);
};
Number.prototype.toInt = function(){
  return parseInt(this);
};
Number.prototype.toTime = function(){
  let hours = parseInt((this / 100) + '');
  let mins: string | number = this % 100;
  mins = mins < 9 ? ('0' + mins) : mins;
  return hours + ':' + mins;
};
Date.prototype.getWeek = function(){
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 2, 12));
  let dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
};
