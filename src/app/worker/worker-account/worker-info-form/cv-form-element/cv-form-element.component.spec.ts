import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvFormElementComponent } from './cv-form-element.component';

describe('CvFormElementComponent', () => {
  let component: CvFormElementComponent;
  let fixture: ComponentFixture<CvFormElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvFormElementComponent]
    });
    fixture = TestBed.createComponent(CvFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
