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
