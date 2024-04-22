import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AdvertisersService } from "../../services/advertisers.service";
import { AddressesService } from "../../services/addresses.service";
import { switchMap } from "rxjs";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-create-advertiser-modal',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './create-advertiser-modal.component.html',
    styleUrl: './create-advertiser-modal.component.scss'
})
export class CreateAdvertiserModalComponent implements AfterViewInit, OnDestroy {
    private advertiserService = inject(AdvertisersService);
    private addressesService = inject(AddressesService);
    
    @ViewChild('MODAL')
    readonly modal?: ElementRef<HTMLDivElement>;
    
    advertiserForm = new FormGroup({
        name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        orgurl: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
        telephone: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        address: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        city: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        postcode: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    });
    success?: boolean;
    error?: boolean;
    
    ngAfterViewInit() {
        this.handleModalEvents();
    }
    
    ngOnDestroy() {
        this.modal?.nativeElement.removeEventListener('hidden.bs.modal', this.resetForm);
    }
    
    handleForm() {
        if (this.advertiserForm.invalid) return;
        
        this.error = false;
        const {address, city, postcode, ...advertiser} = this.advertiserForm.getRawValue();
        
        this.addressesService.addAddress({address, city, postcode}).pipe(
            switchMap(({id}) => {
                return this.advertiserService.addAdvertiser({
                    ...advertiser,
                    address: `/address/${id}`
                });
            })
        ).subscribe({
            next: () => {
                this.success = true;
            },
            error: () => {
                this.error = true;
            }
        })
    }
    
    private handleModalEvents() {
        this.modal?.nativeElement.addEventListener('hidden.bs.modal', this.resetForm);
    }
    
    private resetForm() {
        this.advertiserForm.reset();
        this.success = false;
        this.error = false;
    }
}
