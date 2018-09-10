define("dir-ng-tap", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ngTap() {
        return function (scope, element, attrs) {
            var cancelEvent = false;
            element.on('touchstart', function () {
                element.addClass('active');
                cancelEvent = false;
            });
            element.on('touchmove', function () {
                cancelEvent = true;
                element.removeClass('active');
            });
            element.on('touchend', function () {
                if (cancelEvent)
                    return;
                element.removeClass('active');
                scope.$apply(attrs['ngTap']);
            });
        };
    }
    exports.default = ngTap;
});
define("model", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Model = (function () {
        function Model() {
            this.schedule = [
                [
                    { group: 'M21', room: '6' },
                    { group: 'M21', room: '6' }
                ],
                [
                    { group: 'M11', room: '6' },
                    { group: 'M11', room: '6' },
                    { group: 'E12', room: '3' },
                    { group: 'M22', room: '7' }
                ],
                [
                    { group: 'E21', room: '6' },
                    { group: 'E21', room: '6' },
                    { group: 'M21', room: '6' }
                ],
                [
                    { group: 'E21', room: '6' },
                    { group: 'E41', room: '6' },
                    { group: 'E41', room: '6' },
                ],
                [
                    { group: 'M11', room: '5' },
                    { group: 'E12', room: '2' },
                    { group: 'E12', room: '2' },
                    { group: 'M22', room: '6' },
                    { group: 'M22', room: '6' },
                    { group: 'ČOS', room: '3/6' },
                    { group: 'E41', room: '6' }
                ]
            ];
            this.classTimes = {
                normal1: {
                    1: {
                        start: 800, end: 845
                    },
                    2: {
                        start: 850, end: 935
                    },
                    3: {
                        start: 940, end: 1025
                    },
                    4: {
                        start: 1035, end: 1120
                    },
                    5: {
                        start: 1125, end: 1210
                    },
                    6: {
                        start: 1215, end: 1255
                    },
                    7: {
                        start: 1300, end: 1330
                    }
                },
                normal2: {
                    1: {
                        start: 1345, end: 1430
                    },
                    2: {
                        start: 1435, end: 1520
                    },
                    3: {
                        start: 1525, end: 1610
                    },
                    4: {
                        start: 1620, end: 1705
                    },
                    5: {
                        start: 1710, end: 1755
                    },
                    6: {
                        start: 1800, end: 1840
                    },
                    7: {
                        start: 1845, end: 1915
                    }
                },
                short1: {
                    1: {
                        start: 800, end: 830
                    },
                    2: {
                        start: 835, end: 905
                    },
                    3: {
                        start: 910, end: 940
                    },
                    4: {
                        start: 950, end: 1020
                    },
                    5: {
                        start: 1025, end: 1055
                    },
                    6: {
                        start: 1100, end: 1130
                    },
                    7: {
                        start: 1135, end: 1205
                    }
                },
                short2: {
                    1: {
                        start: 1345, end: 1415
                    },
                    2: {
                        start: 1420, end: 1450
                    },
                    3: {
                        start: 1455, end: 1525
                    },
                    4: {
                        start: 1535, end: 1605
                    },
                    5: {
                        start: 1610, end: 1640
                    },
                    6: {
                        start: 1645, end: 1715
                    },
                    7: {
                        start: 1720, end: 1750
                    }
                }
            };
            this.periods = [
                {
                    type: 'class',
                    index: 1
                },
                {
                    type: 'break',
                    index: 11
                },
                {
                    type: 'class',
                    index: 2
                },
                {
                    type: 'break',
                    index: 22
                },
                {
                    type: 'class',
                    index: 3
                },
                {
                    type: 'bigbreak',
                    index: 33
                },
                {
                    type: 'class',
                    index: 4
                },
                {
                    type: 'break',
                    index: 44
                },
                {
                    type: 'class',
                    index: 5
                },
                {
                    type: 'break',
                    index: 55
                },
                {
                    type: 'class',
                    index: 6
                },
                {
                    type: 'break',
                    index: 66
                },
                {
                    type: 'class',
                    index: 7
                }
            ];
            this.initTimes();
            this.initScheduleME();
        }
        Model.prototype.initTimes = function () {
            _.forEach(this.classTimes, function (lengthShift) {
                _.forEach(lengthShift, function (classTime, prop) {
                    var index = parseInt(prop);
                    var nextClassTime = lengthShift[index + 1];
                    if (nextClassTime) {
                        lengthShift[prop + '' + prop] = {
                            start: classTime.end + 1,
                            end: nextClassTime.start - 1
                        };
                    }
                });
            });
        };
        Model.prototype.initScheduleME = function () {
            _.forEach(this.schedule, function (day) {
                _.forEach(day, function (klass) {
                    if (klass.hasOwnProperty('group')) {
                        klass.type = klass.group[0].toLowerCase();
                    }
                });
            });
        };
        return Model;
    }());
    exports.Model = Model;
});
define("ls-service", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LsService = (function () {
        function LsService() {
            this.keyPrefix = 'ras';
            this.keyLink = '.';
        }
        LsService.prototype.set = function (key, value) {
            localStorage.setItem(this.prefixKey(key), angular.toJson(value));
        };
        LsService.prototype.get = function (key) {
            var value = localStorage.getItem(this.prefixKey(key));
            if (value) {
                return angular.fromJson(value);
            }
            return undefined;
        };
        LsService.prototype.remove = function (key) {
            localStorage.removeItem(this.prefixKey(key));
        };
        LsService.prototype.prefixKey = function (key) {
            var prefixAndLink = this.keyPrefix + this.keyLink;
            if (key.indexOf(prefixAndLink) === 0) {
                return key;
            }
            return prefixAndLink + key;
        };
        return LsService;
    }());
    exports.default = LsService;
});
define("main-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Tabs;
    (function (Tabs) {
        Tabs["schedule"] = "schedule";
        Tabs["grader"] = "grader";
    })(Tabs || (Tabs = {}));
    var rasMain = (function () {
        function rasMain(Model, LsService, $interval) {
            this.Model = Model;
            this.LsService = LsService;
            this.$interval = $interval;
            this.tab = Tabs.schedule;
            this.shift = '1';
            this.length = 'normal';
            this.grades = [];
            this.model = Model;
            this.initModel();
            this.mark();
            this.$interval(this.mark.bind(this), 60000);
        }
        rasMain.prototype.initModel = function () {
            var rest = new Date().getWeek() % 2;
            if (rest) {
                this.shift = '2';
            }
            else {
                this.shift = '1';
            }
            this.length = this.LsService.get('length') || 'normal';
        };
        rasMain.prototype.toggleShift = function () {
            this.shift = this.shift === '1' ? '2' : '1';
            this.mark();
        };
        rasMain.prototype.getShiftName = function () {
            return 'smena ' + this.shift;
        };
        rasMain.prototype.toggleLength = function () {
            this.length = this.length === 'normal' ? 'short' : 'normal';
            this.LsService.set('length', this.length);
            this.mark();
        };
        rasMain.prototype.getLengthName = function () {
            return this.length === 'normal' ? 'normalno' : 'skraćeno';
        };
        rasMain.prototype.getLengthShift = function () {
            return this.length + this.shift;
        };
        rasMain.prototype.getClassStart = function (index) {
            return this.model.classTimes[this.getLengthShift()][index].start;
        };
        rasMain.prototype.getClassStartTime = function (index) {
            if (!index)
                return '';
            return this.getClassStart(index).toTime();
        };
        rasMain.prototype.getClassEnd = function (index) {
            return this.model.classTimes[this.getLengthShift()][index].end;
        };
        rasMain.prototype.getClassEndTime = function (index) {
            if (!index)
                return '';
            return this.getClassEnd(index).toTime();
        };
        rasMain.prototype.mark = function () {
            var _this = this;
            console.log('refresh...');
            var date = new Date();
            var dayOfWeek = date.getDay();
            if (dayOfWeek === 6 || dayOfWeek === 0) {
                return;
            }
            var timeInt = this.timeToInt(date);
            _.forEach(this.model.periods, function (period) {
                var periodStart = _this.getClassStart(period.index);
                var periodEnd = _this.getClassEnd(period.index);
                if (timeInt >= periodStart && timeInt <= periodEnd) {
                    period.active = true;
                }
                else {
                    period.active = false;
                }
            });
            _.forEach(this.model.schedule, function (day, index) {
                if (index === dayOfWeek - 1) {
                    day.active = true;
                }
                else {
                    day.active = false;
                }
                _.forEach(day, function (klass, index) {
                    if (!klass.group) {
                        return;
                    }
                    var periodStart = _this.getClassStart(index + 1);
                    var periodEnd = _this.getClassEnd(index + 1);
                    if (day.active && timeInt >= periodStart && timeInt <= periodEnd) {
                        klass.active = true;
                    }
                    else {
                        klass.active = false;
                    }
                });
            });
        };
        rasMain.prototype.timeToInt = function (date) {
            var h = date.getHours();
            var m = date.getMinutes();
            return h * 100 + m;
        };
        rasMain.prototype.addGrade = function (grade) {
            this.grades.push(grade);
        };
        rasMain.prototype.removeGrade = function (index) {
            this.grades.splice(index, 1);
        };
        rasMain.prototype.clearGrades = function () {
            this.grades = [];
        };
        rasMain.prototype.calculateFinalGrade = function (decimals) {
            if (!this.grades.length) {
                return '';
            }
            var finalGrade = 0;
            this.grades.forEach(function (grade) {
                finalGrade += grade;
            });
            return (finalGrade / this.grades.length).toFixed(decimals);
        };
        return rasMain;
    }());
    var rasMainComponent = {
        templateUrl: 'js/main-component-template.html',
        controller: rasMain
    };
    exports.default = rasMainComponent;
});
define("app", ["require", "exports", "dir-ng-tap", "model", "ls-service", "main-component"], function (require, exports, dir_ng_tap_1, model_1, ls_service_1, main_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    angular.module('app', [])
        .service('Model', model_1.Model)
        .service('LsService', ls_service_1.default)
        .directive('ngTap', dir_ng_tap_1.default)
        .component('rasMain', main_component_1.default);
    angular
        .bootstrap(document.documentElement, ['app']);
});
String.prototype.toInt = function () {
    return parseInt(this);
};
Number.prototype.toInt = function () {
    return parseInt(this);
};
Number.prototype.toTime = function () {
    var hours = parseInt((this / 100) + '');
    var mins = this % 100;
    mins = mins < 9 ? ('0' + mins) : mins;
    return hours + ':' + mins;
};
Date.prototype.getWeek = function () {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 2, 12));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};
//# sourceMappingURL=app.js.map