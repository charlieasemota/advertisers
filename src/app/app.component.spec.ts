import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
  
  it('When the component is loaded Then there should be an "Add advertiser" button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(true).toBe(false);
  });
  
  it('When the"Add advertiser" button is clicked Then a modal will be opened', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(true).toBe(false);
  });
  
  it('When the request to fetch advertisers is fired Then a loading animation will be displayed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(true).toBe(false);
  });
  
  it('When there are no advertisers Then "No advertisers found" should be displayed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(true).toBe(false);
  });
  
  describe('When advertisers are returned from the API', () => {
    it('Then the table should have a Name Column', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(true).toBe(false);
    });
    it('Then the table should have a Url Columns', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(true).toBe(false);
    });
    it('Then the table should have a Phone Number Column', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(true).toBe(false);
    });
    it('Then the table should have a Address Column', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(true).toBe(false);
    });
    it('Then the table should have a Postcode Column', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(true).toBe(false);
    });
  })
  
  
});
