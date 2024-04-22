import { TestBed } from '@angular/core/testing';

import { AddressesService } from './addresses.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import addressesResponse from "../../mocks/_addresses.json";

describe('AddressesService', () => {
  let service: AddressesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AddressesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpTestingController.verify();
  })
  
  it('When getAddresses request succeeded Then return an array of Address objects', () => {
    service.getAddresses().subscribe(data => {
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBeGreaterThan(1);
    })
    httpTestingController.expectOne('/addresses').flush(addressesResponse);
  });
  
  it('When getAddresses request fails Then return an empty array', () => {
    service.getAddresses().subscribe(data => {
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBe(0);
    })
    
    httpTestingController
        .expectOne('/addresses')
        .flush(null, {status: 500, statusText: ''})
  });
  
  it('When a new address is created Then it should be stored in the storedAddress map', () => {
    service.addAddress({city: 'city', address: 'address', postcode: 'postcode'}).subscribe(data => {
      expect(service.storedAddresses.has(data.id!)).toBeTruthy();
    })
    
    httpTestingController.expectOne('/addresses').flush(addressesResponse);
  });
  
  it('When getAddress is called and the item is not in the store Then it should make a request and store it', () => {
    expect(service.storedAddresses.has(1)).toBeFalse();
    
    service.getAddress(1).subscribe(() => {
      expect(service.storedAddresses.has(1)).toBeTrue();
    })
    
    httpTestingController.expectOne('/addresses/1');
  });
});
