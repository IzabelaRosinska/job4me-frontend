import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSortPanelComponent } from './filter-sort-panel.component';

describe('FilterSortPanelComponent', () => {
  let component: FilterSortPanelComponent;
  let fixture: ComponentFixture<FilterSortPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSortPanelComponent]
    });
    fixture = TestBed.createComponent(FilterSortPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
