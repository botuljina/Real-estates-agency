import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorukaPregledChatovaComponent } from './poruka-pregled-chatova.component';

describe('PorukaPregledChatovaComponent', () => {
  let component: PorukaPregledChatovaComponent;
  let fixture: ComponentFixture<PorukaPregledChatovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorukaPregledChatovaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorukaPregledChatovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
