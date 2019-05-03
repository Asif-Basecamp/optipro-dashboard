import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLookupComponent } from './warehouse-lookup.component';

describe('WarehouseLookupComponent', () => {
  let component: WarehouseLookupComponent;
  let fixture: ComponentFixture<WarehouseLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
