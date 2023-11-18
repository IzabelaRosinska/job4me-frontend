import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerInfoFormComponent } from './organizer-info-form.component';

describe('OrganizerInfoFormComponent', () => {
  let component: OrganizerInfoFormComponent;
  let fixture: ComponentFixture<OrganizerInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerInfoFormComponent]
    });
    fixture = TestBed.createComponent(OrganizerInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
