import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeNekretnineComponent } from './moje-nekretnine.component';

describe('MojeNekretnineComponent', () => {
  let component: MojeNekretnineComponent;
  let fixture: ComponentFixture<MojeNekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojeNekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeNekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
