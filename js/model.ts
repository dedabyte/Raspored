export interface IScheduleDayModel {
  [index: number]: IScheduleKlassModel;
  active?: any;
}

export interface IScheduleKlassModel {
  group?: string;
  room?: string;
  type?: string;
  active?: boolean;
}

export interface IPeriodTypeModel {
  type: 'class' | 'break' | 'bigbreak';
  index: number;
  active?: boolean;
}

export interface IClassTimesModel {
  normal1: IShiftModel;
  normal2: IShiftModel;
  short1: IShiftModel;
  short2: IShiftModel;
}

export interface ISingleClassTimeModel {
  start: number;
  end: number;
}

export interface IShiftModel {
  [index: number]: ISingleClassTimeModel
}

export type Index = number | string;


export class Model {
  schedule: Array<IScheduleDayModel> = [
    // mon
    [
      {group: 'M21', room: '6'},
      {group: 'M21', room: '6'}
    ],
    // tue
    [
      {group: 'M11', room: '6'},
      {group: 'M11', room: '6'},
      {group: 'E12', room: '3'},
      {group: 'M22', room: '7'}
    ],
    // wed
    [
      {group: 'E21', room: '6'},
      {group: 'E21', room: '6'},
      {group: 'M21', room: '6'}
    ],
    // thu
    [
      {group: 'E21', room: '6'},
      {group: 'E41', room: '6'},
      {group: 'E41', room: '6'},
    ],
    // fri
    [
      {group: 'M11', room: '5'},
      {group: 'E12', room: '2'},
      {group: 'E12', room: '2'},
      {group: 'M22', room: '6'},
      {group: 'M22', room: '6'},
      {group: 'ČOS', room: '3/6'},
      {group: 'E41', room: '6'}
    ]
  ];

  classTimes: IClassTimesModel = {
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

  periods: Array<IPeriodTypeModel> = [
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

  constructor() {
    this.initTimes();
    this.initScheduleME();
  }

  private initTimes() {
    _.forEach(this.classTimes, (lengthShift: IShiftModel) => {
      _.forEach(lengthShift, (classTime: ISingleClassTimeModel, prop: string) => {
        let index = parseInt(prop);
        let nextClassTime = lengthShift[index + 1];
        if (nextClassTime) {
          lengthShift[prop + '' + prop] = {
            start: classTime.end + 1,
            end: nextClassTime.start - 1
          };
        }
      });
    });
  }

  private initScheduleME() {
    _.forEach(this.schedule, (day: IScheduleDayModel) => {
      _.forEach(day, (klass: IScheduleKlassModel) => {
        if (klass.hasOwnProperty('group')) {
          klass.type = klass.group[0].toLowerCase();
        }
      });
    });
  }
}
