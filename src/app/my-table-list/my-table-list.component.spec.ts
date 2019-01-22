import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTableListComponent } from './my-table-list.component';

describe('MyTableListComponent', () => {
  let component: MyTableListComponent;
  let fixture: ComponentFixture<MyTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
