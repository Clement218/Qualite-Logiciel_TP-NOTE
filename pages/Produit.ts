import { Page, Locator } from '@playwright/test';

// Gère la page des produits (navigation, filtres, sélection)
export class Produit {
  page: Page;
  productsNav: Locator; 
  filtersButton: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.productsNav = page.getByTestId('nav-link-products');
    this.filtersButton = page.getByRole('button', { name: 'Filtres' });
  }

  // Navigue vers la page produits
  async goto(): Promise<void> {
    await this.productsNav.click();
  }

  // Ouvre le détail d'un produit par son ID
  async openProduct(id: string | number): Promise<void> {
    await this.page.getByTestId(`product-card-${id}`).click();
  }

  // Ouvre le panneau des filtres
  async openFilters(): Promise<void> {
    await this.filtersButton.click();
  }

  // Filtre les produits par catégorie
  async filterByCategory(categoryName: string): Promise<void> {
    await this.page.getByRole('button', { name: categoryName }).click();
  }
}
