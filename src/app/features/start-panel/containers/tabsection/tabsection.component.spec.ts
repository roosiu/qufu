import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsectionComponent } from './tabsection.component';

describe('TabsectionComponent', () => {
  let component: TabsectionComponent;
  let fixture: ComponentFixture<TabsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
