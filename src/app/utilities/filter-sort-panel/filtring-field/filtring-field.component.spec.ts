import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltringFieldComponent } from './filtring-field.component';

describe('FiltringFieldComponent', () => {
  let component: FiltringFieldComponent;
  let fixture: ComponentFixture<FiltringFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltringFieldComponent]
    });
    fixture = TestBed.createComponent(FiltringFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
