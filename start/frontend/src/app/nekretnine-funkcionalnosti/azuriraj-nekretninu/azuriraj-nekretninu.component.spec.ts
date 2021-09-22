import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajNekretninuComponent } from './azuriraj-nekretninu.component';

describe('AzurirajNekretninuComponent', () => {
  let component: AzurirajNekretninuComponent;
  let fixture: ComponentFixture<AzurirajNekretninuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajNekretninuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajNekretninuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
