import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerAccountComponent } from './organizer-account.component';

describe('OrganizerAccountComponent', () => {
  let component: OrganizerAccountComponent;
  let fixture: ComponentFixture<OrganizerAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerAccountComponent]
    });
    fixture = TestBed.createComponent(OrganizerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
