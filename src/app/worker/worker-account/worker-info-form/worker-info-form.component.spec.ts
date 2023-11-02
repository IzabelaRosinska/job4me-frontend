import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerInfoFormComponent } from './worker-info-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {ExpandedModuleFormComponent} from "../../../utilities/expanded-module-form/expanded-module-form.component";
import {FormsModule} from "@angular/forms";

describe('InfoFormComponent', () => {
  let component: WorkerInfoFormComponent;
  let fixture: ComponentFixture<WorkerInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,RouterTestingModule,HttpClientTestingModule,HttpClientModule, FormsModule],
      declarations: [WorkerInfoFormComponent, ExpandedModuleFormComponent]
    });
    fixture = TestBed.createComponent(WorkerInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
