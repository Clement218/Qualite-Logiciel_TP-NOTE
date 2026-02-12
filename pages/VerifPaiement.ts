import { Page, Locator } from '@playwright/test';

// Interface des données de paiement
interface PaymentDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

// Gère la page de vérification de paiement
export class VerifPaiement {
  page: Page;
  cardNumber: Locator; 
  cardName: Locator; 
  expiry: Locator;
  cvv: Locator; 
  submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardNumber = page.getByTestId('payment-cardnumber-input');
    this.cardName = page.getByTestId('payment-cardname-input');
    this.expiry = page.getByTestId('payment-expiry-input');
    this.cvv = page.getByTestId('payment-cvv-input');
    this.submit = page.getByTestId('payment-submit-button');
  }

  // Remplit et soumet le formulaire de paiement
  async pay(details: PaymentDetails): Promise<void> {
    await this.cardNumber.isVisible();

    await this.cardNumber.click();
    await this.cardNumber.clear();
    await this.cardNumber.fill(details.number);

    await this.cardName.click();
    await this.cardName.clear();
    await this.cardName.fill(details.name);

    await this.expiry.click();
    await this.expiry.clear();
    await this.expiry.fill(details.expiry);

    await this.cvv.click();
    await this.cvv.clear();
    await this.cvv.fill(details.cvv);

    await this.submit.click();
    await this.page.getByText('Numéro de commande').waitFor({ timeout: 10000 });
  }
}
