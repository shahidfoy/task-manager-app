import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-manager-form',
  templateUrl: './task-manager-form.component.html',
  styleUrls: ['./task-manager-form.component.scss']
})
export class TaskManagerFormComponent implements OnInit {

  @Input() selectDayIsVisiable: boolean;

  validateForm!: FormGroup;

  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: 'Sun', value: 'sun', checked: false },
    { label: 'Mon', value: 'mon', checked: true },
    { label: 'Tues', value: 'tues', checked: true },
    { label: 'Wed', value: 'wed', checked: true },
    { label: 'Thurs', value: 'thurs', checked: true },
    { label: 'Fri', value: 'fri', checked: true },
    { label: 'Sat', value: 'sat', checked: false },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      datePicker: [null],
      datePickerTime: [null],
      monthPicker: [null],
      rangePicker: [[]],
      rangePickerTime: [[]],
      timePicker: [null],
      checkedDayOptions: [null],
    });
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
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
    console.log(this.validateForm.value);
  }
}
