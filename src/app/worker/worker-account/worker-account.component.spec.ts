import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAccountComponent } from './worker-account.component';

describe('WorkerAccountComponent', () => {
  let component: WorkerAccountComponent;
  let fixture: ComponentFixture<WorkerAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerAccountComponent]
    });
    fixture = TestBed.createComponent(WorkerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
