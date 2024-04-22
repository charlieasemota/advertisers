import { TestBed } from '@angular/core/testing';

import { AdvertisersService } from './advertisers.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import advertisersResponse from "../../mocks/_advertisers.json";

describe('AdvertisersService', () => {
    let service: AdvertisersService;
    let httpTestingController: HttpTestingController;
    
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(AdvertisersService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpTestingController.verify();
    })
    
    it('When getAdvertisers request succeeded Then return an array of Advertiser objects', () => {
        service.getAdvertisers().subscribe(data => {
            expect(Array.isArray(data)).toBeTruthy();
            expect(data.length).toBeGreaterThan(1);
        })
        httpTestingController.expectOne('/advertisers').flush(advertisersResponse);
    });
    
    it('When getAddresses request fails Then return an empty array', () => {
        service.getAdvertisers().subscribe(data => {
            expect(Array.isArray(data)).toBeTruthy();
            expect(data.length).toBe(0);
        })
        
        httpTestingController
            .expectOne('/advertisers')
            .flush(null, {status: 500, statusText: ''})
    });
    
    it('When a new address is created Then it should be stored in the storedAddress map', () => {
        service.addAdvertiser({
            orgurl: '',
            address: '',
            name: '',
            telephone: '',
            firstName: '',
            lastName: '',
            email: ''
        })
            .subscribe(data => {
                expect(service.storedAdvertisers.has(data.id!)).toBeTruthy();
            })
        
        httpTestingController.expectOne('/advertisers').flush(advertisersResponse);
    });
});
