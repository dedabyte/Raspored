(function(){

  ras.component('rasMain', {
    templateUrl: 'js/main-component-template.html',
    controller: rasMain
  });

  function rasMain(Model, LsService){
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

      ctrl.length = LsService.get('length');
    }

    function toggleShift(){
      ctrl.shift = ctrl.shift === '1' ? '2' : '1';
    }

    function getShiftName(){
      return 'smena ' + ctrl.shift;
    }

    function toggleLength(){
      ctrl.length = ctrl.length === 'normal' ? 'short' : 'normal';
      LsService.set('length', ctrl.length);
    }

    function getLengthName(){
      return ctrl.length === 'normal' ? 'normalno' : 'skraćeno';
    }

    function getLengthShift(){
      return ctrl.length + ctrl.shift;
    }

    function getClassStartTime(index){
      if(!index) return '';
      return ctrl.model.classTimes[getLengthShift()][index].start.toTime();
    }

    function getClassEndTime(index){
      if(!index) return '';
      return ctrl.model.classTimes[getLengthShift()][index].end.toTime();
    }

    initModel();

    ctrl.getClassStartTime = getClassStartTime;
    ctrl.getClassEndTime = getClassEndTime;
    ctrl.toggleShift = toggleShift;
    ctrl.getShiftName = getShiftName;
    ctrl.getLengthName = getLengthName;
    ctrl.toggleLength = toggleLength;
  }

})();
