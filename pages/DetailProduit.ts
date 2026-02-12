import { Page, Locator } from '@playwright/test';

// Gère la page de détail d'un produit
export class DetailProduit {
  page: Page;
  addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByTestId('product-detail-add-to-cart');
  }

  // Ajoute le produit au panier
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
