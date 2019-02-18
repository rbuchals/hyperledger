import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.onboarding.partner{
   export enum PartnerType {
      CUSTOMER,
      SUPPLIER,
      ADMIN,
   }
   export class Partner extends Participant {
      capgeminiCorpId: string;
      partnerTypes: PartnerType[];
   }
// }
