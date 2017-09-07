(function(){

  ras.service('ModelService', ModelService);

  function ModelService(){
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
  }

})();