export class Address {
    id: number;
    advertiserAddress: string;
    address: string;
    city: string;
    postcode: string;
    updatedTs?: Date;
    
    constructor(data: AddressResponse) {
        this.advertiserAddress = data["@id"];
        this.id = data.id;
        this.address = data.address;
        this.city = data.city;
        this.postcode = data.postcode;
        this.updatedTs = data.updatedTs ? new Date(data.updatedTs) : undefined;
    }
}

export interface AddressListResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    "hydra:member": AddressResponse[];
    "hydra:totalItems": number;
    "hydra:view": {
        "@id": string;
        "@type": string;
    };
}

export interface AddressResponse {
    "@id": string;
    "@type": string;
    id: number;
    address: string;
    city: string;
    postcode: string;
    updatedTs: string;
}
