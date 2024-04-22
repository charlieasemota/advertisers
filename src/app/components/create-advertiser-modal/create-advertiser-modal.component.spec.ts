import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvertiserModalComponent } from './create-advertiser-modal.component';

describe('CreateAdvertiserModalComponent', () => {
  let component: CreateAdvertiserModalComponent;
  let fixture: ComponentFixture<CreateAdvertiserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdvertiserModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAdvertiserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
