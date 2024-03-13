import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpageComponent } from './searchpage.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchpageComponent', () => {
  let component: SearchpageComponent;
  let fixture: ComponentFixture<SearchpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchpageComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
