export interface AvailabilityRequest {
  dateRange: Array<Date>;
  startTime: string;
  endTime: string;
  includedDayIndex: Array<number>;
}
