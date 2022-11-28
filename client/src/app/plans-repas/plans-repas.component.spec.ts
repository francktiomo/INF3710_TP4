import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansRepasComponent } from './plans-repas.component';

describe('PlansRepasComponent', () => {
  let component: PlansRepasComponent;
  let fixture: ComponentFixture<PlansRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansRepasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
