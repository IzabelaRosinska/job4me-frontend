import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairSearchingPanelComponent } from './jobfair-searching-panel.component';

describe('JobfairSearchingPanelComponent', () => {
  let component: JobfairSearchingPanelComponent;
  let fixture: ComponentFixture<JobfairSearchingPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobfairSearchingPanelComponent]
    });
    fixture = TestBed.createComponent(JobfairSearchingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
