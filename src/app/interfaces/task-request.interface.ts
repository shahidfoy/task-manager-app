export interface TaskRequest {
  taskName: string;
  dateRange: Array<Date>;
  startTime: string;
  endTime: string;
  includedDayIndex: Array<number>;
}
