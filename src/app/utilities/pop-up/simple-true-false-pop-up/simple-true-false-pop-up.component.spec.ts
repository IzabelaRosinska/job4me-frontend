import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTrueFalsePopUpComponent } from './simple-true-false-pop-up.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";

describe('SimpleTrueFalsePopUpComponent', () => {
  let component: SimpleTrueFalsePopUpComponent;
  let fixture: ComponentFixture<SimpleTrueFalsePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ],
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
