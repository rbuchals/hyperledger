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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for onboarding-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be onboarding-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('onboarding-app');
    })
  });

  it('network-name should be onboarding@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('onboarding@0.0.1.bna');
    });
  });

  it('navbar-brand should be onboarding-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('onboarding-app');
    });
  });

  
    it('AuctionItem component should be loadable',() => {
      page.navigateTo('/AuctionItem');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AuctionItem');
      });
    });

    it('AuctionItem table should have 5 columns',() => {
      page.navigateTo('/AuctionItem');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Auction component should be loadable',() => {
      page.navigateTo('/Auction');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Auction');
      });
    });

    it('Auction table should have 7 columns',() => {
      page.navigateTo('/Auction');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('MarketPlace component should be loadable',() => {
      page.navigateTo('/MarketPlace');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MarketPlace');
      });
    });

    it('MarketPlace table should have 8 columns',() => {
      page.navigateTo('/MarketPlace');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Partner component should be loadable',() => {
      page.navigateTo('/Partner');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Partner');
      });
    });

    it('Partner table should have 3 columns',() => {
      page.navigateTo('/Partner');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ChangeOwner component should be loadable',() => {
      page.navigateTo('/ChangeOwner');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ChangeOwner');
      });
    });
  
    it('ChangeDescription component should be loadable',() => {
      page.navigateTo('/ChangeDescription');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ChangeDescription');
      });
    });
  
    it('AddBuyerToAuction component should be loadable',() => {
      page.navigateTo('/AddBuyerToAuction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddBuyerToAuction');
      });
    });
  
    it('FinalizeAuction component should be loadable',() => {
      page.navigateTo('/FinalizeAuction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('FinalizeAuction');
      });
    });
  
    it('AddPartnerToMarketPlace component should be loadable',() => {
      page.navigateTo('/AddPartnerToMarketPlace');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddPartnerToMarketPlace');
      });
    });
  

});