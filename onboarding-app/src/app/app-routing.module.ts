/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AuctionItemComponent } from './AuctionItem/AuctionItem.component';
import { AuctionComponent } from './Auction/Auction.component';
import { MarketPlaceComponent } from './MarketPlace/MarketPlace.component';

import { PartnerComponent } from './Partner/Partner.component';

import { ChangeOwnerComponent } from './ChangeOwner/ChangeOwner.component';
import { ChangeDescriptionComponent } from './ChangeDescription/ChangeDescription.component';
import { AddBuyerToAuctionComponent } from './AddBuyerToAuction/AddBuyerToAuction.component';
import { FinalizeAuctionComponent } from './FinalizeAuction/FinalizeAuction.component';
import { AddPartnerToMarketPlaceComponent } from './AddPartnerToMarketPlace/AddPartnerToMarketPlace.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'AuctionItem', component: AuctionItemComponent },
  { path: 'Auction', component: AuctionComponent },
  { path: 'MarketPlace', component: MarketPlaceComponent },
  { path: 'Partner', component: PartnerComponent },
  { path: 'ChangeOwner', component: ChangeOwnerComponent },
  { path: 'ChangeDescription', component: ChangeDescriptionComponent },
  { path: 'AddBuyerToAuction', component: AddBuyerToAuctionComponent },
  { path: 'FinalizeAuction', component: FinalizeAuctionComponent },
  { path: 'AddPartnerToMarketPlace', component: AddPartnerToMarketPlaceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
