import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferEditFormComponent } from './job-offer-edit-form.component';

describe('JobOfferEditFormComponent', () => {
  let component: JobOfferEditFormComponent;
  let fixture: ComponentFixture<JobOfferEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobOfferEditFormComponent]
    });
    fixture = TestBed.createComponent(JobOfferEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
