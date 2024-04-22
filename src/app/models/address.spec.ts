import { Address, AddressResponse } from './address';
import addressesJson from '../../mocks/_addresses.json';

describe('Address', () => {
  
  it('When the updatedTs value is null then the updatedTs property should be undefined', () => {
    const [address]: AddressResponse[] = addressesJson["hydra:member"];
    const {updatedTs, ...restOfAddress} = address;
    console.log(updatedTs)
    expect(new Address(restOfAddress as AddressResponse).updatedTs).toBe(undefined);
  });
  
  it('When the updatedTs value is not null then the updatedTs property should be converted to a date object', () => {
    const addresses: AddressResponse[] = addressesJson["hydra:member"];
    expect(new Address(addresses[0]).updatedTs).toBeInstanceOf(Date);
  });
});
