import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

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
