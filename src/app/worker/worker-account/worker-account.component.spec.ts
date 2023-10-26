import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAccountComponent } from './worker-account.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";

describe('WorkerAccountComponent', () => {
  let component: WorkerAccountComponent;
  let fixture: ComponentFixture<WorkerAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule,HttpClientModule],
      declarations: [WorkerAccountComponent]
    });
    fixture = TestBed.createComponent(WorkerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
