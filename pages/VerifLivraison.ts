import { Page, Locator } from '@playwright/test';

// Interface des données de livraison
interface ShippingDetails {
  phone: string;
  address: string;
  city: string;
  postal: string;
}

// Gère la page de vérification de livraison
export class VerifLivraison {
  page: Page;
  phone: Locator; 
  address: Locator; 
  city: Locator; 
  postal: Locator; 
  submit: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.phone = page.getByTestId('shipping-phone-input');
    this.address = page.getByTestId('shipping-address-input');
    this.city = page.getByTestId('shipping-city-input');
    this.postal = page.getByTestId('shipping-postalcode-input');
    this.submit = page.getByTestId('shipping-submit-button');
  }

  // Remplit et soumet le formulaire de livraison
  async fillShipping(details: ShippingDetails): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    
    await this.phone.click();
    await this.phone.clear();
    await this.phone.fill(details.phone);
    
    await this.address.click();
    await this.address.clear();
    await this.address.fill(details.address);
    
    await this.city.click();
    await this.city.clear();
    await this.city.fill(details.city);
    
    await this.postal.click();
    await this.postal.clear();
    await this.postal.fill(details.postal);
    
    await this.submit.click();
    await this.page.waitForSelector('[data-testid="payment-cardnumber-input"]');
  }
}
