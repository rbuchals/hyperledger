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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuctionService } from './Auction.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-auction',
  templateUrl: './Auction.component.html',
  styleUrls: ['./Auction.component.css'],
  providers: [AuctionService]
})
export class AuctionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  auctionId = new FormControl('', Validators.required);
  marketPlaceId = new FormControl('', Validators.required);
  auctionItem = new FormControl('', Validators.required);
  offer = new FormControl('', Validators.required);
  active = new FormControl('', Validators.required);
  buyers = new FormControl('', Validators.required);

  constructor(public serviceAuction: AuctionService, fb: FormBuilder) {
    this.myForm = fb.group({
      auctionId: this.auctionId,
      marketPlaceId: this.marketPlaceId,
      auctionItem: this.auctionItem,
      offer: this.offer,
      active: this.active,
      buyers: this.buyers
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAuction.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.onboarding.auction.Auction',
      'auctionId': this.auctionId.value,
      'marketPlaceId': this.marketPlaceId.value,
      'auctionItem': this.auctionItem.value,
      'offer': this.offer.value,
      'active': this.active.value,
      'buyers': this.buyers.value
    };

    this.myForm.setValue({
      'auctionId': null,
      'marketPlaceId': null,
      'auctionItem': null,
      'offer': null,
      'active': null,
      'buyers': null
    });

    return this.serviceAuction.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'auctionId': null,
        'marketPlaceId': null,
        'auctionItem': null,
        'offer': null,
        'active': null,
        'buyers': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.onboarding.auction.Auction',
      'marketPlaceId': this.marketPlaceId.value,
      'auctionItem': this.auctionItem.value,
      'offer': this.offer.value,
      'active': this.active.value,
      'buyers': this.buyers.value
    };

    return this.serviceAuction.updateAsset(form.get('auctionId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAuction.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceAuction.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'auctionId': null,
        'marketPlaceId': null,
        'auctionItem': null,
        'offer': null,
        'active': null,
        'buyers': null
      };

      if (result.auctionId) {
        formObject.auctionId = result.auctionId;
      } else {
        formObject.auctionId = null;
      }

      if (result.marketPlaceId) {
        formObject.marketPlaceId = result.marketPlaceId;
      } else {
        formObject.marketPlaceId = null;
      }

      if (result.auctionItem) {
        formObject.auctionItem = result.auctionItem;
      } else {
        formObject.auctionItem = null;
      }

      if (result.offer) {
        formObject.offer = result.offer;
      } else {
        formObject.offer = null;
      }

      if (result.active) {
        formObject.active = result.active;
      } else {
        formObject.active = null;
      }

      if (result.buyers) {
        formObject.buyers = result.buyers;
      } else {
        formObject.buyers = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'auctionId': null,
      'marketPlaceId': null,
      'auctionItem': null,
      'offer': null,
      'active': null,
      'buyers': null
      });
  }

}
