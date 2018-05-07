import LsService from "./ls-service";
import {Index, IPeriodTypeModel, Model} from "./model";
import {IIntervalService} from "angular";

class rasMain {
  shift = '1';
  length = 'normal';
  model: Model;

  constructor(private Model: Model,
              private LsService: LsService,
              private $interval: IIntervalService) {
    this.model = Model;

    this.initModel();
    this.mark();
    this.$interval(this.mark.bind(this), 60000);
  }

  private initModel() {
    let rest = (new Date() as any).getWeek() % 2;
    if (rest) {
      this.shift = '2';
    } else {
      this.shift = '1';
    }

    this.length = this.LsService.get('length') || 'normal';
  }

  toggleShift() {
    this.shift = this.shift === '1' ? '2' : '1';
    this.mark();
  }

  getShiftName() {
    return 'smena ' + this.shift;
  }

  toggleLength() {
    this.length = this.length === 'normal' ? 'short' : 'normal';
    this.LsService.set('length', this.length);
    this.mark();
  }

  getLengthName() {
    return this.length === 'normal' ? 'normalno' : 'skraćeno';
  }

  private getLengthShift() {
    return this.length + this.shift;
  }

  private getClassStart(index: Index) {
    return this.model.classTimes[this.getLengthShift()][index].start;
  }

  private getClassStartTime(index: Index) {
    if (!index) return '';
    return this.getClassStart(index).toTime();
  }

  getClassEnd(index: Index) {
    return this.model.classTimes[this.getLengthShift()][index].end
  }

  getClassEndTime(index: Index) {
    if (!index) return '';
    return this.getClassEnd(index).toTime();
  }

  private mark() {
    console.log('refresh...');

    let date = new Date();
    let dayOfWeek = date.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return;
    }
    let timeInt = this.timeToInt(date);

    _.forEach(this.model.periods, (period: IPeriodTypeModel) => {
      let periodStart = this.getClassStart(period.index);
      let periodEnd = this.getClassEnd(period.index);
      if (timeInt >= periodStart && timeInt <= periodEnd) {
        period.active = true;
      } else {
        period.active = false;
      }
    });

    _.forEach(this.model.schedule, (day, index) => {
      if (index === dayOfWeek - 1) {
        day.active = true;
      } else {
        day.active = false;
      }

      _.forEach(day, (klass, index) => {
        // skip empty klasses
        if (!klass.group) {
          return;
        }
        let periodStart = this.getClassStart(index + 1);
        let periodEnd = this.getClassEnd(index + 1);
        if (day.active && timeInt >= periodStart && timeInt <= periodEnd) {
          klass.active = true;
        } else {
          klass.active = false;
        }
      });
    });
  }

  private timeToInt(date) {
    let h = date.getHours();
    let m = date.getMinutes();
    return h * 100 + m;
  }
}

let rasMainComponent = {
  templateUrl: 'js/main-component-template.html',
  controller: rasMain
};
export default rasMainComponent;
