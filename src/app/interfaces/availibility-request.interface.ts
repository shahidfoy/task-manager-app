import { DateRange } from './date-range.interface';

export interface AvailabilityRequest {
  dateRange: DateRange;
  startTime: string;
  endTime: string;
  includedDayIndex: Array<number>;
}
