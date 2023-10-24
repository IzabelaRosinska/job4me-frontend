import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAccountComponent } from './employer-account.component';

describe('EmployerAccountComponent', () => {
  let component: EmployerAccountComponent;
  let fixture: ComponentFixture<EmployerAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerAccountComponent]
    });
    fixture = TestBed.createComponent(EmployerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
