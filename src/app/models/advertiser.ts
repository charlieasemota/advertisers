import { Address } from "./address";

export class Advertiser {
    id?: number;
    name: string;
    orgurl: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    updatedTs?: Date;
    address: string;
    addressObj?: Address;
    
    constructor(data: AdvertiserResponse) {
        this.id = data.id;
        this.name = data.name;
        this.orgurl = data.orgurl;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.telephone = data.telephone;
        this.updatedTs = data.updatedTs ? new Date(data.updatedTs) : undefined;
        this.address = data.address;
    }
}

export interface AdvertiserListResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    "hydra:member": AdvertiserResponse[];
    "hydra:totalItems": number;
    "hydra:view": {
        "@id": string;
        "@type": string;
    };
}

export interface AdvertiserResponse {
    "@id": string;
    "@type": string;
    id: number;
    name: string;
    orgurl: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    updatedTs: string;
    address: string;
}
