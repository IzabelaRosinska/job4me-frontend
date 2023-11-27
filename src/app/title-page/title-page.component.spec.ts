import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePageComponent } from './title-page.component';

describe('TitlePageComponent', () => {
  let component: TitlePageComponent;
  let fixture: ComponentFixture<TitlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitlePageComponent]
    });
    fixture = TestBed.createComponent(TitlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
