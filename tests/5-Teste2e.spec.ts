import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { faker } from '@faker-js/faker';

test('E2E complet - création compte, navigation, achat, checkout', async ({ page, auth, products, productDetail, cart, shipping, payment }) => {

  await page.goto('https://techhubecommerce.lovable.app/');
  await page.waitForTimeout(500);

  //Création compte
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  await auth.signup(randomName, randomEmail, '987654');
  await page.waitForTimeout(500);

  //Ajout d'un produit au panier
  await products.goto();
  await products.openProduct('1');
  await productDetail.addToCart();

  //Test de navigation
  await products.goto();
  await page.getByTestId('nav-link-about').click();
  await page.getByTestId('nav-link-contact').click();
  await page.getByTestId('search-button').click();
  await cart.open();

  //Voir le panier
  await cart.open();
  await cart.goToCheckout();

  //Vérification de la livraison
  await shipping.fillShipping({
    phone: '0011223344',
    address: '22 rue des champignons',
    city: 'boeufville',
    postal: '59650'
  });

  //Vérification paiement
  await payment.pay({
    number: '9999888877774444',
    name: 'Jean Jack',
    expiry: '02/56',
    cvv: '789'
  });

  //Fin du test
  await expect(page.getByText('Numéro de commande')).toBeVisible();
});