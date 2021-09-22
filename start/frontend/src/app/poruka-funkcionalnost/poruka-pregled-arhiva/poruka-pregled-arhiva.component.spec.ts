import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorukaPregledArhivaComponent } from './poruka-pregled-arhiva.component';

describe('PorukaPregledArhivaComponent', () => {
  let component: PorukaPregledArhivaComponent;
  let fixture: ComponentFixture<PorukaPregledArhivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorukaPregledArhivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorukaPregledArhivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
