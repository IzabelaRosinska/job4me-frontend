import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTrueFalsePopUpComponent } from './simple-true-false-pop-up.component';

describe('SimpleTrueFalsePopUpComponent', () => {
  let component: SimpleTrueFalsePopUpComponent;
  let fixture: ComponentFixture<SimpleTrueFalsePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleTrueFalsePopUpComponent]
    });
    fixture = TestBed.createComponent(SimpleTrueFalsePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
