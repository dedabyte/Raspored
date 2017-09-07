(function(){

  ras.component('rasMain', {
    templateUrl: 'js/main-component-template.html',
    controller: rasMain
  });

  function rasMain(ModelService){
    var ctrl = this;
    ctrl.model = ModelService;
    ctrl.shift = '1';
    ctrl.length = 'normal';

    function toggleShift(){
      ctrl.shift = ctrl.shift === '1' ? '2' : '1';
    }

    function toggleLength(){
      ctrl.length = ctrl.length === 'normal' ? 'short' : 'normal';
    }

    function getLengthShift(){
      return ctrl.length + ctrl.shift;
    }

    function getClassStartTime(index){
      return ctrl.model.classTimes[getLengthShift()][index].start.toTime();
    }

    function getClassEndTime(index){
      return ctrl.model.classTimes[getLengthShift()][index].end.toTime();
    }

    ctrl.getClassStartTime = getClassStartTime;
    ctrl.getClassEndTime = getClassEndTime;
  }

})();
