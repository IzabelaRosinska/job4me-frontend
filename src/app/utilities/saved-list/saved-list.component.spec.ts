import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedListComponent } from './saved-list.component';

describe('SavedListComponent', () => {
  let component: SavedListComponent;
  let fixture: ComponentFixture<SavedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedListComponent]
    });
    fixture = TestBed.createComponent(SavedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
