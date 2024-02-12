import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookpageComponent } from './cookpage.component';

describe('CookpageComponent', () => {
  let component: CookpageComponent;
  let fixture: ComponentFixture<CookpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
