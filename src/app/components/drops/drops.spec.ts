import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drops } from './drops';

describe('Drops', () => {
  let component: Drops;
  let fixture: ComponentFixture<Drops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drops]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drops);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
