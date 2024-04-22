import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
    BehaviorSubject,
    catchError,
    combineLatest,
    map,
    Observable,
    of,
    startWith,
    Subject,
    switchMap,
    tap
} from "rxjs";
import { Address, AddressListResponse, AddressResponse } from "../models/address";

@Injectable({
    providedIn: 'root'
})
export class AddressesService {
    private httpClient = inject(HttpClient);
    
    private path = '/addresses';
    private storeCountUpdate = new Subject<boolean>();
    
    readonly storedAddresses = new Map<string, BehaviorSubject<Address>>();
    
    /**
     * Returns an observable with the existing addresses.
     * Whenever an update event is received (example: a new address is added), it will emit the new list to existing
     * active subscribers.
     */
    private getStoredList(): Observable<Address[]> {
        return this.storeCountUpdate.pipe(
            startWith(true),
            switchMap(() => {
                const addressSubjects = [...this.storedAddresses.values()];
                return combineLatest(addressSubjects);
            })
        )
    }
    
    /**
     * Return stored addresses or fetch them if the store is empty.
     * Whenever any address is updated or created the subscription will receive the updated array
     */
    getAddresses(): Observable<Address[]> {
        const request: Observable<Address[]> = this.httpClient.get<AddressListResponse>(this.path).pipe(
            map(response => response["hydra:member"].map((address: AddressResponse) => new Address(address))),
            catchError(() => of<Address[]>([])),
            tap((addresses) => {
                if (!addresses.length) return;
                addresses.forEach(address => this.storedAddresses.set(address.advertiserAddress, new BehaviorSubject(address)));
                this.storeCountUpdate.next(true)
            }),
            switchMap(() => this.getStoredList())
        );
        
        return this.storedAddresses.size ? this.getStoredList() : request;
    }
    
    /**
     * Return a stored address or request it from the API then store it.
     */
    getAddress(address: string): Observable<Address> {
        if (!this.storedAddresses.has(address)) this.storedAddresses.set(address, new BehaviorSubject({} as Address));
        const request = this.httpClient.get<AddressResponse>(`${address}`).pipe(
            map(response => new Address(response)),
            tap(response => this.storedAddresses.get(address)!.next(response))
        );
        
        return this.storedAddresses.get(address)!.pipe(
            switchMap(address => address ? of(address) : request)
        );
    }
    
    /**
     * Create new address and if the request is successful add it to the store
     */
    addAddress(form: Address) {
        return this.httpClient.post<AddressResponse>(this.path, form).pipe(
            map(response => new Address(response)),
            tap(response => {
                this.storedAddresses.set(response.advertiserAddress, new BehaviorSubject(response));
                this.storeCountUpdate.next(true);
            })
        );
    }
    
}
