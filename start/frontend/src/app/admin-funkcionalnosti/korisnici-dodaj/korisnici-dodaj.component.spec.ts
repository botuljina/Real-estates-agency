import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciDodajComponent } from './korisnici-dodaj.component';

describe('KorisniciDodajComponent', () => {
  let component: KorisniciDodajComponent;
  let fixture: ComponentFixture<KorisniciDodajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisniciDodajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
