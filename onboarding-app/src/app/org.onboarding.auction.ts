import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Partner} from './org.onboarding.partner';
// export namespace org.onboarding.auction{
   export class Commodity {
      commodityId: string;
      description: string;
   }
   export class AuctionItem extends Asset {
      owner: Partner;
      commodity: Commodity;
      serialNumber: string;
      description: string;
   }
   export class Auction extends Asset {
      auctionId: string;
      marketPlaceId: string;
      auctionItem: AuctionItem;
      offer: number;
      active: boolean;
      buyers: Partner[];
   }
   export class ChangeOwner extends Transaction {
      assetId: string;
      newPartnerId: string;
   }
   export class ChangeDescription extends Transaction {
      assetId: string;
      newDescription: string;
   }
   export class AddBuyerToAuction extends Transaction {
      auctionId: string;
      buyerId: string;
   }
   export class FinalizeAuction extends Transaction {
      auctionId: string;
      winnerId: string;
   }
// }
