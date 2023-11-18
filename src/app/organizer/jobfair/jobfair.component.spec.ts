import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairComponent } from './jobfair.component';

describe('JobfairComponent', () => {
  let component: JobfairComponent;
  let fixture: ComponentFixture<JobfairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobfairComponent]
    });
    fixture = TestBed.createComponent(JobfairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
