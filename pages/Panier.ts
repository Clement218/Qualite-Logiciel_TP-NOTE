import { Page, Locator } from '@playwright/test';

// Gère la page du panier
export class Panier {
  page: Page;
  cartButton: Locator;
  checkoutButton: Locator; 
  browseProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.getByTestId('cart-button');
    this.checkoutButton = page.getByTestId('checkout-button');
    this.browseProducts = page.getByTestId('browse-products-button');
  }

  // Ouvre le panier
  async open(): Promise<void> {
    await this.cartButton.click();
    await this.page.waitForSelector('[data-testid="checkout-button"]');
  }

  // Va au checkout
  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForSelector('[data-testid="shipping-phone-input"]');
  }
}
