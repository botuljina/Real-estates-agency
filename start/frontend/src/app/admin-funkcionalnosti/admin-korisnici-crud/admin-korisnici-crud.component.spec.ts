import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKorisniciCrudComponent } from './admin-korisnici-crud.component';

describe('AdminKorisniciCrudComponent', () => {
  let component: AdminKorisniciCrudComponent;
  let fixture: ComponentFixture<AdminKorisniciCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKorisniciCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKorisniciCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
