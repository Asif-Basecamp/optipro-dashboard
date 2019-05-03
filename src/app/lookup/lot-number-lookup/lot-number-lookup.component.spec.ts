import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotNumberLookupComponent } from './lot-number-lookup.component';

describe('LotNumberLookupComponent', () => {
  let component: LotNumberLookupComponent;
  let fixture: ComponentFixture<LotNumberLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotNumberLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotNumberLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
