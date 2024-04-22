import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisersService } from "../../services/advertisers.service";
import { AddressesService } from "../../services/addresses.service";

@Component({
    selector: 'app-create-advertiser-modal',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './create-advertiser-modal.component.html',
    styleUrl: './create-advertiser-modal.component.scss'
})
export class CreateAdvertiserModalComponent {
    private advertiserService = inject(AdvertisersService);
    private addressesService = inject(AddressesService);
    
    advertiserForm = new FormGroup({
        name: new FormControl(),
        orgurl: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        telephone: new FormControl(),
        address: new FormControl(),
        city: new FormControl(),
        postcode: new FormControl(),
    });
    
    handleForm() {
    
    }
}
