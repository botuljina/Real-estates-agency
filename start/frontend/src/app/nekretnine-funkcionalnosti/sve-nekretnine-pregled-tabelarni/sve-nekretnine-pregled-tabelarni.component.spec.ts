import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SveNekretninePregledTabelarniComponent } from './sve-nekretnine-pregled-tabelarni.component';

describe('SveNekretninePregledTabelarniComponent', () => {
  let component: SveNekretninePregledTabelarniComponent;
  let fixture: ComponentFixture<SveNekretninePregledTabelarniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SveNekretninePregledTabelarniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SveNekretninePregledTabelarniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
