import { TestBed } from '@angular/core/testing';

import { AddressesService } from './addresses.service';

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('When getAddresses request succeded Then return an array of Address objects', () => {
    expect(true).toBe(false);
  });
  
  it('When getAddresses request fails Then return an empty array', () => {
    expect(true).toBe(false);
  });
});
