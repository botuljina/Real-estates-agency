import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdajaIznajmljivanjePrihodComponent } from './prodaja-iznajmljivanje-prihod.component';

describe('ProdajaIznajmljivanjePrihodComponent', () => {
  let component: ProdajaIznajmljivanjePrihodComponent;
  let fixture: ComponentFixture<ProdajaIznajmljivanjePrihodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdajaIznajmljivanjePrihodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdajaIznajmljivanjePrihodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
