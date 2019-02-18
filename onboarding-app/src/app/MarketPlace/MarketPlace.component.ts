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
import { MarketPlaceService } from './MarketPlace.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-marketplace',
  templateUrl: './MarketPlace.component.html',
  styleUrls: ['./MarketPlace.component.css'],
  providers: [MarketPlaceService]
})
export class MarketPlaceComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  marketPlaceId = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  validFrom = new FormControl('', Validators.required);
  validTo = new FormControl('', Validators.required);
  attendees = new FormControl('', Validators.required);
  creator = new FormControl('', Validators.required);
  auctionTrades = new FormControl('', Validators.required);

  constructor(public serviceMarketPlace: MarketPlaceService, fb: FormBuilder) {
    this.myForm = fb.group({
      marketPlaceId: this.marketPlaceId,
      description: this.description,
      validFrom: this.validFrom,
      validTo: this.validTo,
      attendees: this.attendees,
      creator: this.creator,
      auctionTrades: this.auctionTrades
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMarketPlace.getAll()
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
      $class: 'org.onboarding.marketplace.MarketPlace',
      'marketPlaceId': this.marketPlaceId.value,
      'description': this.description.value,
      'validFrom': this.validFrom.value,
      'validTo': this.validTo.value,
      'attendees': this.attendees.value,
      'creator': this.creator.value,
      'auctionTrades': this.auctionTrades.value
    };

    this.myForm.setValue({
      'marketPlaceId': null,
      'description': null,
      'validFrom': null,
      'validTo': null,
      'attendees': null,
      'creator': null,
      'auctionTrades': null
    });

    return this.serviceMarketPlace.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'marketPlaceId': null,
        'description': null,
        'validFrom': null,
        'validTo': null,
        'attendees': null,
        'creator': null,
        'auctionTrades': null
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
      $class: 'org.onboarding.marketplace.MarketPlace',
      'description': this.description.value,
      'validFrom': this.validFrom.value,
      'validTo': this.validTo.value,
      'attendees': this.attendees.value,
      'creator': this.creator.value,
      'auctionTrades': this.auctionTrades.value
    };

    return this.serviceMarketPlace.updateAsset(form.get('marketPlaceId').value, this.asset)
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

    return this.serviceMarketPlace.deleteAsset(this.currentId)
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

    return this.serviceMarketPlace.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'marketPlaceId': null,
        'description': null,
        'validFrom': null,
        'validTo': null,
        'attendees': null,
        'creator': null,
        'auctionTrades': null
      };

      if (result.marketPlaceId) {
        formObject.marketPlaceId = result.marketPlaceId;
      } else {
        formObject.marketPlaceId = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.validFrom) {
        formObject.validFrom = result.validFrom;
      } else {
        formObject.validFrom = null;
      }

      if (result.validTo) {
        formObject.validTo = result.validTo;
      } else {
        formObject.validTo = null;
      }

      if (result.attendees) {
        formObject.attendees = result.attendees;
      } else {
        formObject.attendees = null;
      }

      if (result.creator) {
        formObject.creator = result.creator;
      } else {
        formObject.creator = null;
      }

      if (result.auctionTrades) {
        formObject.auctionTrades = result.auctionTrades;
      } else {
        formObject.auctionTrades = null;
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
      'marketPlaceId': null,
      'description': null,
      'validFrom': null,
      'validTo': null,
      'attendees': null,
      'creator': null,
      'auctionTrades': null
      });
  }

}
