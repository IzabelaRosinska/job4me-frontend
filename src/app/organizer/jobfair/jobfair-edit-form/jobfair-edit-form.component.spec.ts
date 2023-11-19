import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairEditFormComponent } from './jobfair-edit-form.component';

describe('JobfairEditFormComponent', () => {
  let component: JobfairEditFormComponent;
  let fixture: ComponentFixture<JobfairEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobfairEditFormComponent]
    });
    fixture = TestBed.createComponent(JobfairEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
