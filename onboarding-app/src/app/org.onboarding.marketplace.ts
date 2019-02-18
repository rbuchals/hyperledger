import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Partner} from './org.onboarding.partner';
import {Auction} from './org.onboarding.auction';
// export namespace org.onboarding.marketplace{
   export class MarketPlace extends Asset {
      marketPlaceId: string;
      description: string;
      validFrom: Date;
      validTo: Date;
      attendees: Partner[];
      creator: Partner;
      auctionTrades: Auction[];
   }
   export class AddPartnerToMarketPlace extends Transaction {
      marketplaceId: string;
      partnerId: string;
   }
// }
