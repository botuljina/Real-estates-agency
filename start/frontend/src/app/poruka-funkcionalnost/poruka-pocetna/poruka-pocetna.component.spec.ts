import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorukaPocetnaComponent } from './poruka-pocetna.component';

describe('PorukaPocetnaComponent', () => {
  let component: PorukaPocetnaComponent;
  let fixture: ComponentFixture<PorukaPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorukaPocetnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorukaPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
