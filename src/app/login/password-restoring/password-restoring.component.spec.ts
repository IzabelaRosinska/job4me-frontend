import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRestoringComponent } from './password-restoring.component';

describe('PasswordRestoringComponent', () => {
  let component: PasswordRestoringComponent;
  let fixture: ComponentFixture<PasswordRestoringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRestoringComponent]
    });
    fixture = TestBed.createComponent(PasswordRestoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
