import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRedirectComponent } from './login-redirect.component';

describe('LoginRedirectComponent', () => {
  let component: LoginRedirectComponent;
  let fixture: ComponentFixture<LoginRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRedirectComponent]
    });
    fixture = TestBed.createComponent(LoginRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
