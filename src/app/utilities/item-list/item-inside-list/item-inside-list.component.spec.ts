import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInsideListComponent } from './item-inside-list.component';

describe('ItemInsideListComponent', () => {
  let component: ItemInsideListComponent;
  let fixture: ComponentFixture<ItemInsideListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemInsideListComponent]
    });
    fixture = TestBed.createComponent(ItemInsideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
