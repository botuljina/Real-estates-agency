import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciPregledComponent } from './korisnici-pregled.component';

describe('KorisniciPregledComponent', () => {
  let component: KorisniciPregledComponent;
  let fixture: ComponentFixture<KorisniciPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisniciPregledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
