import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerInfoFormComponent } from './worker-info-form.component';

describe('InfoFormComponent', () => {
  let component: WorkerInfoFormComponent;
  let fixture: ComponentFixture<WorkerInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerInfoFormComponent]
    });
    fixture = TestBed.createComponent(WorkerInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
