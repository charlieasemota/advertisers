import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdvertisersService } from "./services/advertisers.service";
import { map, Subscription, switchMap } from "rxjs";
import { Advertiser } from "./models/advertiser";
import { CommonModule } from "@angular/common";
import { CreateAdvertiserModalComponent } from "./components/create-advertiser-modal/create-advertiser-modal.component";
import { AddressesService } from "./services/addresses.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, CreateAdvertiserModalComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    private advertisersService = inject(AdvertisersService);
    private addressService = inject(AddressesService);
    
    private $getAdvertisers?: Subscription;
    
    title = 'advertisers';
    advertisers?: Advertiser[];
    
    ngOnInit(): void {
        this.$getAdvertisers = this.addressService.getAddresses().pipe(
            switchMap(() => this.advertisersService.getAdvertisers()),
            map((advertisers: Advertiser[]) => advertisers.map(item => {
                const addressId = item.address?.split('/').pop();
                if (!addressId) return item;
                
                const address = this.addressService.storedAddresses.get(Number(addressId))?.value;
                item.addressObj = address;
                return item;
            }))
        ).subscribe(data => this.advertisers = data)
    }
    
    ngOnDestroy(): void {
        this.$getAdvertisers?.unsubscribe();
    }
}
