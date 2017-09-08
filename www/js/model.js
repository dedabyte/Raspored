(function(){

  ras.service('Model', Model);

  function Model(){
    var self = this;

    self.schedule = [
      [
        { group: '32', room: '1' },
        { group: '41', room: '1' },
      ],
      [
        {},
        {},
        {},
        {},
        { group: '11', room: '1' },
        { group: '11', room: '1' },
        { group: '11', room: '1' },
      ],
      [
        { group: '41', room: '1' },
        { group: '41', room: '1' },
        { group: '23', room: '1' },
      ],
      [
        {},
        {},
        {},
        {},
        { group: '41', room: '1' },
        { group: '12', room: '1' },
        { group: '12', room: '1' },
      ],
      [
        { group: '11', room: '1' },
        { group: '11', room: '1' },
        { group: '12', room: '1' },
        { group: '11', room: '1' },
        { group: '??', room: '1' },
        { group: '41', room: '1' },
        { group: '41', room: '1' },
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
        type: 'break'
      },
      {
        type: 'class',
        index: 2
      },
      {
        type: 'break'
      },
      {
        type: 'class',
        index: 3
      },
      {
        type: 'bigbreak'
      },
      {
        type: 'class',
        index: 4
      },
      {
        type: 'break'
      },
      {
        type: 'class',
        index: 5
      },
      {
        type: 'break'
      },
      {
        type: 'class',
        index: 6
      },
      {
        type: 'break'
      },
      {
        type: 'class',
        index: 7
      }
    ];

    function initPeriods(){
      self.periods.forEach(function(period, index){
        if(period.type === 'class') return;

        period.start = self.periods[index - 1].end + 1;
        period.end = self.periods[index + 1].end - 1;
      });
    }

    initPeriods();
  }

})();