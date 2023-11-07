import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccountComponent } from './employee-account.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";

describe('EmployeeAccountComponent', () => {
  let component: EmployeeAccountComponent;
  let fixture: ComponentFixture<EmployeeAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule,HttpClientModule],
      declarations: [EmployeeAccountComponent]
    });
    fixture = TestBed.createComponent(EmployeeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
