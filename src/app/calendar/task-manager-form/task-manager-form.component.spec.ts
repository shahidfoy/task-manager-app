import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerFormComponent } from './task-manager-form.component';

describe('TaskManagerFormComponent', () => {
  let component: TaskManagerFormComponent;
  let fixture: ComponentFixture<TaskManagerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskManagerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
