import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAdvertiserModalComponent } from './create-advertiser-modal.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import addressesJson from '../../../mocks/_addresses.json'
import advertisersJson from '../../../mocks/_advertisers.json'

describe('CreateAdvertiserModalComponent', () => {
  let component: CreateAdvertiserModalComponent;
  let fixture: ComponentFixture<CreateAdvertiserModalComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdvertiserModalComponent, HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAdvertiserModalComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  
  it('There should be a button to toggle the modal', () => {
    const fixture = TestBed.createComponent(CreateAdvertiserModalComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="button-create-advertiser"]');
    expect(button).not.toBeNull();
  });
  
  it('When the"Add advertiser" button has not been clicked Then a modal should be closed', () => {
    const fixture = TestBed.createComponent(CreateAdvertiserModalComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('[data-testid="advertiser-modal"]') as HTMLDivElement;
    expect(getComputedStyle(modal).display).toBe('none');
  });
  
  it('When the"Add advertiser" button is clicked Then a modal will be opened', () => {
    const fixture = TestBed.createComponent(CreateAdvertiserModalComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('[data-testid="advertiser-modal"]') as HTMLDivElement;
    const button = compiled.querySelector('[data-testid="button-create-advertiser"]') as HTMLButtonElement;
    
    button.click();
    expect(getComputedStyle(modal).display).toBe('block');
  });
  
  it('When the form is invalid Then the submit button should be disabled', () => {
    const fixture = TestBed.createComponent(CreateAdvertiserModalComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="submit-button"]') as HTMLButtonElement;
    
    expect(button.disabled).toBeTrue();
  });
  
  describe('When the form is valid', () => {
    beforeEach(() => {
      fixture.componentInstance.advertiserForm.setValue({
        address: 'test',
        city: 'test',
        postcode: 'test',
        telephone: 'test',
        lastName: 'test',
        orgurl: 'test',
        firstName: 'test',
        name: 'test',
        email: 'test@test'
      });
      fixture.detectChanges();
    })
    
    it('Then the submit button should be clickable', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('[data-testid="submit-button"]') as HTMLButtonElement;
      
      expect(button.disabled).toBeFalse();
    });
    
    it('And The request is successful then display a success message', () => {
      component.handleForm();
      httpTestingController.expectOne('/addresses').flush(addressesJson);
      httpTestingController.expectOne('/advertisers').flush(advertisersJson);
      
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const success = compiled.querySelector('[data-testid="submit-success"]')
      
      expect(success).not.toBeNull();
    });
    
    it('And The request throws an error then display an error message', () => {
      component.handleForm();
      httpTestingController.expectOne('/addresses').flush('', {status: 500, statusText: ''});
      
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const success = compiled.querySelector('[data-testid="submit-error"]')
      
      expect(success).not.toBeNull();
    });
  })
  
});
