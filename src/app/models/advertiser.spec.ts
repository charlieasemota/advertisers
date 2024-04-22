import { Advertiser, AdvertiserResponse } from './advertiser';
import advertiserJson from '../../mocks/_advertisers.json';

describe('Advertiser', () => {
  
  it('When the updatedTs value is null then the updatedTs property should be undefined', () => {
    const [advertiser]: AdvertiserResponse[] = advertiserJson["hydra:member"];
    const {updatedTs, ...restOfAdvertiser} = advertiser;
    console.log(updatedTs)
    expect(new Advertiser(restOfAdvertiser as AdvertiserResponse).updatedTs).toBe(undefined);
  });
  
  it('When the updatedTs value is not null then the updatedTs property should be converted to a date object', () => {
    const advertisers: AdvertiserResponse[] = advertiserJson["hydra:member"];
    expect(new Advertiser(advertisers[0]).updatedTs).toBeInstanceOf(Date);
  });
});
