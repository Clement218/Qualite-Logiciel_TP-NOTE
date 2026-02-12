import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { faker } from '@faker-js/faker';

test('E2E complet - création compte, navigation, achat, checkout', async ({ page, auth, products, productDetail, cart, shipping, payment }) => {

  await page.goto('https://techhubecommerce.lovable.app/');

  // Vérifie que la page d'accueil est chargée
  await expect(page).toHaveURL(/lovable\.app/);



  // Création de compte

  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  await auth.signup(randomName, randomEmail, '987654');



  // Ajout au panier
  await products.goto();
  await expect(page).toHaveURL(/products/i);
  await products.openProduct('1');
  await expect(page).toHaveURL(/product/i);
  await productDetail.addToCart();
  await expect(page.getByTestId('cart-count')).toHaveText('1');


  // Test navigation
  await products.goto();
  await page.getByTestId('nav-link-about').click();
  await expect(page).toHaveURL(/about/i);
  await page.getByTestId('nav-link-contact').click();
  await expect(page).toHaveURL(/contact/i);
  await page.getByTestId('search-button').click();


  // Panier & Checkout
  await cart.open();
  await expect(page).toHaveURL(/cart/i);
  await cart.goToCheckout();
  await shipping.fillShipping({
    phone: '0011223344',
    address: '22 rue des champignons',
    city: 'boeufville',
    postal: '59650'
  });
  await expect(
    page.locator('text=/paiement sécurisé/i')
  ).toBeVisible();
  await payment.pay({
    number: '9999888877774444',
    name: 'Jean Jack',
    expiry: '02/56',
    cvv: '789'
  });


  // Confirmation finale
  await expect(
    page.getByRole('heading', { name: 'Commande confirmée !' })
  ).toBeVisible();

  await expect(page.getByText('Numéro de commande')).toBeVisible();
});
