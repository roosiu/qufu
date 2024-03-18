import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFileModalComponent } from './change-file-modal.component';

describe('ChangeFileModalComponent', () => {
  let component: ChangeFileModalComponent;
  let fixture: ComponentFixture<ChangeFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeFileModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
