import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeNekretninePregledComponent } from './moje-nekretnine-pregled.component';

describe('MojeNekretninePregledComponent', () => {
  let component: MojeNekretninePregledComponent;
  let fixture: ComponentFixture<MojeNekretninePregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojeNekretninePregledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeNekretninePregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
