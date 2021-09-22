import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPocetnaComponent } from './agent-pocetna.component';

describe('AgentPocetnaComponent', () => {
  let component: AgentPocetnaComponent;
  let fixture: ComponentFixture<AgentPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPocetnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
