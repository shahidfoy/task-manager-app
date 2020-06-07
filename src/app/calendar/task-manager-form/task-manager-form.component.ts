import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { TaskRequest } from 'src/app/interfaces/task-request.interface';
import { AvailabilityRequest } from 'src/app/interfaces/availibility-request.interface';

@Component({
  selector: 'app-task-manager-form',
  templateUrl: './task-manager-form.component.html',
  styleUrls: ['./task-manager-form.component.scss']
})
export class TaskManagerFormComponent implements OnInit {

  @Input() selectDayIsVisiable: boolean;
  @Input() inputTaskIsVisible: boolean;
  @Input() selectedStartDate: string;
  @Input() selectedEndDate: string;

  validateForm!: FormGroup;

  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: 'Sun', value: 'Sun', checked: false },
    { label: 'Mon', value: 'Mon', checked: true },
    { label: 'Tues', value: 'Tues', checked: true },
    { label: 'Wed', value: 'Wed', checked: true },
    { label: 'Thurs', value: 'Thurs', checked: true },
    { label: 'Fri', value: 'Fri', checked: true },
    { label: 'Sat', value: 'Sat', checked: false },
  ];

  constructor(
    private taskManagerService: TaskManagerService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    if (!this.selectDayIsVisiable) {
      this.checkOptionsOne = [];
    }

    this.validateForm = this.fb.group({
      taskName: [null, [Validators.required]],
      dateRange: [null],
      timePickerStart: [null, [Validators.required]],
      timePickerEnd: [null, [Validators.required]],
      startTime: [null],
      endTime: [null],
      checkedDayOptions: [this.checkOptionsOne],
    });
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  submitForm(): void {
    const dateRange = {
      startDate: new Date(this.selectedStartDate),
      endDate: new Date(this.selectedEndDate)
    };
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const includedDayIndex: Array<number> = [];

    if (endDate) {
      for (let i = 0; i < this.checkOptionsOne.length; i++) {
        if (this.checkOptionsOne[i].checked) {
          includedDayIndex.push(i);
        }
      }
    } else {
      includedDayIndex.push(startDate.getDay());
    }

    const taskName = this.validateForm.controls.taskName.value;
    if (taskName) {
      const taskPostRequest: TaskRequest = {
        taskName,
        dateRange,
        startTime: this.validateForm.controls.startTime.value,
        endTime: this.validateForm.controls.endTime.value,
        includedDayIndex,
      };

      console.log('TASK REQUEST', taskPostRequest);
      this.taskManagerService.addTask(taskPostRequest).subscribe((response: any) => {
        // console.log(response);
        this.notification
        .blank(
          'Task Posted',
          response.message
        );
      });
    } else {
      const availabilityPostRequest: AvailabilityRequest = {
        dateRange,
        startTime: this.validateForm.controls.startTime.value,
        endTime: this.validateForm.controls.endTime.value,
        includedDayIndex,
      };

      console.log('AVAILIBILITY REQUEST', availabilityPostRequest);
      this.taskManagerService.setAvailability(availabilityPostRequest).subscribe((response: any) => {
        // console.log(response);
        this.notification
          .blank(
            'Availability Posted',
            response.message
          );
      });
    }
  }

  validate(): boolean {
    const timePickerStart = this.validateForm.controls.timePickerStart.value;
    const timePickerEnd = this.validateForm.controls.timePickerEnd.value;

    if (!timePickerStart || !timePickerEnd) {
      this.notification
      .blank(
        'Missing Time',
        `Time selection fields are missing. <br>
          Please fill out both Start & End time inputs.`
      );
      return false;
    } else {
      this.validateForm.controls.startTime.setValue(timePickerStart.toLocaleTimeString());
      this.validateForm.controls.endTime.setValue(timePickerEnd.toLocaleTimeString());
      return true;
    }
  }
}
