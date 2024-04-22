import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import addressesResponse from '../mocks/_addresses.json';
import advertisersResponse from '../mocks/_advertisers.json';


describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();
    
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  
  it('When the component is loaded Then there should be an "Add advertiser" button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('[data-testid="button-create-advertiser"]')
    expect(element).not.toBeNull();
  });
  
  it('When the request to fetch advertisers is fired Then a loading animation will be displayed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('[data-testid="button-create-advertiser"]')
    expect(element).not.toBeNull();
  });
  
  it('When there are no advertisers Then "No advertisers found" should be displayed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();
    httpTestingController.expectOne('/addresses').flush(addressesResponse);
    httpTestingController.expectOne('/advertisers').flush('', {status: 400, statusText: ''});
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('[data-testid="table-no-advertisers"]')
    expect(element).not.toBeNull();
  });
  
  describe('When advertisers are returned from the API', () => {
    
    afterEach(() => {
      httpTestingController.verify();
    })
    
    it('Then the table should have a Name Column', waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.componentInstance.ngOnInit();
      httpTestingController.expectOne('/addresses').flush(addressesResponse);
      httpTestingController.expectOne('/advertisers').flush(advertisersResponse);
      
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const element = compiled.querySelector('[data-testid="table-name-column"]')
      expect(element).not.toBeNull();
      
    }));
    it('Then the table should have a Url Columns', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.componentInstance.ngOnInit();
      httpTestingController.expectOne('/addresses').flush(addressesResponse);
      httpTestingController.expectOne('/advertisers').flush(advertisersResponse);
      
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const element = compiled.querySelector('[data-testid="table-url-column"]')
      expect(element).not.toBeNull();
    });
    it('Then the table should have a Phone Number Column', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.componentInstance.ngOnInit();
      httpTestingController.expectOne('/addresses').flush(addressesResponse);
      httpTestingController.expectOne('/advertisers').flush(advertisersResponse);
      
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const element = compiled.querySelector('[data-testid="table-phone-column"]')
      expect(element).not.toBeNull();
    });
    
    it('Then the table should have a Address Column', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.componentInstance.ngOnInit();
      httpTestingController.expectOne('/addresses').flush(addressesResponse);
      httpTestingController.expectOne('/advertisers').flush(advertisersResponse);
      
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const element = compiled.querySelector('[data-testid="table-address-column"]')
      expect(element).not.toBeNull();
    });
    
    it('Then the table should have a Postcode Column', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.componentInstance.ngOnInit();
      httpTestingController.expectOne('/addresses').flush(addressesResponse);
      httpTestingController.expectOne('/advertisers').flush(advertisersResponse);
      
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const element = compiled.querySelector('[data-testid="table-postcode-column"]')
      expect(element).not.toBeNull();
    });
  })
  
  
});
