import { DateRange } from './date-range.interface';

export interface TaskRequest {
  taskName: string;
  dateRange: DateRange;
  startTime: string;
  endTime: string;
  includedDayIndex: Array<number>;
}
