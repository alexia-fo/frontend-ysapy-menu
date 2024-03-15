import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmcMenuComponent } from './abmc-menu.component';

describe('AbmcMenuComponent', () => {
  let component: AbmcMenuComponent;
  let fixture: ComponentFixture<AbmcMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmcMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmcMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
