(function(){

  ras.service('Model', Model);

  function Model(){
    var self = this;

    self.schedule = [
      [
        { group: 'M23', room: '1' },
        { group: 'M41', room: '11' }
      ],
      [
        {},
        {},
        {},
        { group: 'B', room: '' },
        { group: 'M11', room: '7' },
        { group: 'E11', room: '9' },
        { group: 'E11', room: '9' }
      ],
      [
        { group: 'M41', room: '11' },
        { group: 'M41', room: '11' },
        { group: 'M23', room: '10' }
      ],
      [
        {},
        {},
        {},
        {},
        { group: 'E41', room: '16' },
        { group: 'M12', room: '5' },
        { group: 'M12', room: '5' }
      ],
      [
        { group: 'M11', room: '9' },
        { group: 'M11', room: '9' },
        { group: 'M12', room: '9' },
        { group: 'E11', room: '2' },
        {},
        { group: 'E41', room: '16' },
        { group: 'E41', room: '16' }
      ]
    ];

    self.classTimes = {
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

    self.periods = [
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

    function initTimes(){
      _.forEach(self.classTimes, function(lengthShift){
        _.forEach(lengthShift, function(classTime, prop){
          var index = parseInt(prop);
          var nextClassTime = lengthShift[index + 1];
          if(nextClassTime){
            lengthShift[prop + '' + prop]  = {
              start: classTime.end + 1,
              end: nextClassTime.start - 1
            };
          }
        });
      });
    }

    function initScheduleME(){
      self.schedule.forEach(function(day){
        day.forEach(function(klass){
          if(klass.hasOwnProperty('group')){
            klass.type = klass.group[0].toLowerCase();
          }
        });
      });
    }

    initTimes();
    initScheduleME();
  }

})();