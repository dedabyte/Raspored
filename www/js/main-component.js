(function(){

  ras.component('rasMain', {
    templateUrl: 'js/main-component-template.html',
    controller: rasMain
  });

  function rasMain(Model, LsService, $interval){
    var ctrl = this;
    ctrl.model = Model;
    ctrl.shift = '1';
    ctrl.length = 'normal';

    function initModel(){
      var rest = new Date().getWeek() % 2;
      if(rest){
        ctrl.shift = '2';
      }else{
        ctrl.shift = '1';
      }

      ctrl.length = LsService.get('length') || 'normal';
    }

    function toggleShift(){
      ctrl.shift = ctrl.shift === '1' ? '2' : '1';
      mark();
    }

    function getShiftName(){
      return 'smena ' + ctrl.shift;
    }

    function toggleLength(){
      ctrl.length = ctrl.length === 'normal' ? 'short' : 'normal';
      LsService.set('length', ctrl.length);
      mark();
    }

    function getLengthName(){
      return ctrl.length === 'normal' ? 'normalno' : 'skraćeno';
    }

    function getLengthShift(){
      return ctrl.length + ctrl.shift;
    }

    function getClassStart(index){
      return ctrl.model.classTimes[getLengthShift()][index].start;
    }

    function getClassStartTime(index){
      if(!index) return '';
      return getClassStart(index).toTime();
    }

    function getClassEnd(index){
      return ctrl.model.classTimes[getLengthShift()][index].end
    }

    function getClassEndTime(index){
      if(!index) return '';
      return getClassEnd(index).toTime();
    }

    function mark(){
      console.log('refresh...');

      var date = new Date();
      var dayOfWeek = date.getDay();
      if(dayOfWeek === 6 || dayOfWeek === 0){
        return;
      }
      var timeInt = timeToInt(date);

      _.forEach(ctrl.model.periods, function(period){
        var periodStart = getClassStart(period.index);
        var periodEnd = getClassEnd(period.index);
        if(timeInt >= periodStart && timeInt <= periodEnd){
          period.active = true;
        }else{
          period.active = false;
        }
      });

      _.forEach(ctrl.model.schedule, function(day, index){
        if(index === dayOfWeek - 1){
          day.active = true;
        }else{
          day.active = false;
        }

        _.forEach(day, function(klass, index){
          // skip empty klasses
          if(!klass.group){
            return;
          }
          var periodStart = getClassStart(index + 1);
          var periodEnd = getClassEnd(index + 1);
          if(day.active && timeInt >= periodStart && timeInt <= periodEnd){
            klass.active = true;
          }else{
            klass.active = false;
          }
        });
      });
    }

    function timeToInt(date){
      var h = date.getHours();
      var m = date.getMinutes();
      return h * 100 + m;
    }

    initModel();
    mark();
    $interval(mark, 60000);

    ctrl.getClassStartTime = getClassStartTime;
    ctrl.getClassEndTime = getClassEndTime;
    ctrl.toggleShift = toggleShift;
    ctrl.getShiftName = getShiftName;
    ctrl.getLengthName = getLengthName;
    ctrl.toggleLength = toggleLength;
  }

})();
