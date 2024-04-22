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
import { Advertiser, AdvertiserListResponse, AdvertiserResponse } from "../models/advertiser";

@Injectable({
    providedIn: 'root'
})
export class AdvertisersService {
    private httpClient = inject(HttpClient);
    
    private path = '/advertisers';
    private storeCountUpdate = new Subject<boolean>();
    
    readonly storedAdvertisers = new Map<number, BehaviorSubject<Advertiser>>();
    
    /**
     * Returns an observable with the existing advertisers.
     * Whenever an update event is received it will emit the new list to existing
     * active subscribers.
     */
    private getStoredList(): Observable<Advertiser[]> {
        return this.storeCountUpdate.pipe(
            startWith(true),
            switchMap(() => {
                const subjects = [...this.storedAdvertisers.values()];
                return combineLatest(subjects);
            })
        )
    }
    
    /**
     * Return stored item or fetch them if the store is empty.
     * Whenever any item is updated or created the subscription will receive the updated array
     */
    getAdvertisers(): Observable<Advertiser[]> {
        const request: Observable<Advertiser[]> = this.httpClient.get<AdvertiserListResponse>(this.path).pipe(
            map(response => response["hydra:member"].map((advertiser: AdvertiserResponse) => new Advertiser(advertiser))),
            catchError(() => of<Advertiser[]>([])),
            tap((advertisers) => {
                if (!advertisers.length) return;
                advertisers.forEach(advertiser => this.storedAdvertisers.set(advertiser.id, new BehaviorSubject(advertiser)));
                this.storeCountUpdate.next(true)
            }),
            switchMap(() => this.getStoredList())
        );
        
        return this.storedAdvertisers.size ? this.getStoredList() : request;
    }
    
    /**
     * Create new Advertiser and if the request is successful add it to the store
     */
    addAdvertiser(form: Advertiser) {
        return this.httpClient.post<AdvertiserResponse>(this.path, form).pipe(
            map(response => new Advertiser(response)),
            tap(response => {
                this.storedAdvertisers.set(response.id, new BehaviorSubject(response));
                this.storeCountUpdate.next(true);
            })
        );
    }
    
}
