import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NalogComponent } from './nalog.component';

describe('NalogComponent', () => {
  let component: NalogComponent;
  let fixture: ComponentFixture<NalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
