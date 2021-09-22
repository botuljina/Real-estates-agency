import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorukaPregledJedneKonverzacijeComponent } from './poruka-pregled-jedne-konverzacije.component';

describe('PorukaPregledJedneKonverzacijeComponent', () => {
  let component: PorukaPregledJedneKonverzacijeComponent;
  let fixture: ComponentFixture<PorukaPregledJedneKonverzacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorukaPregledJedneKonverzacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorukaPregledJedneKonverzacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
