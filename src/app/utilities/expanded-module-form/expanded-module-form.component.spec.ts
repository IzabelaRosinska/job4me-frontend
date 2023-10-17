import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedModuleFormComponent } from './expanded-module-form.component';

describe('ExpandedModuleFormComponent', () => {
  let component: ExpandedModuleFormComponent;
  let fixture: ComponentFixture<ExpandedModuleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandedModuleFormComponent]
    });
    fixture = TestBed.createComponent(ExpandedModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
