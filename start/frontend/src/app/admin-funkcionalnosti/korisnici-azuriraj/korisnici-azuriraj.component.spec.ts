import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciAzurirajComponent } from './korisnici-azuriraj.component';

describe('KorisniciAzurirajComponent', () => {
  let component: KorisniciAzurirajComponent;
  let fixture: ComponentFixture<KorisniciAzurirajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisniciAzurirajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciAzurirajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
