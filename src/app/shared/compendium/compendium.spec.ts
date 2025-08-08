import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compendium } from './compendium';

describe('Compendium', () => {
  let component: Compendium;
  let fixture: ComponentFixture<Compendium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compendium]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compendium);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
