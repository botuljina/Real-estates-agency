import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorukaDodajComponent } from './poruka-dodaj.component';

describe('PorukaDodajComponent', () => {
  let component: PorukaDodajComponent;
  let fixture: ComponentFixture<PorukaDodajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorukaDodajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorukaDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
