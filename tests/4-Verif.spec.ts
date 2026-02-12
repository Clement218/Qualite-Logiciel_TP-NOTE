import { test } from '../fixtures/test-fixture';

test.beforeEach(async ({ page }) => {
  await page.goto('https://techhubecommerce.lovable.app/');
});

// Pour effectuer ces tests il est impératif de se connecter en 1er car l'authentification ne reste pas en mémoire

test('Checkout - Livraison', async ({ page, auth, products, productDetail, cart, shipping }) => {
  await auth.loginTest();
  await products.goto();
  await products.openProduct('1');
  await productDetail.addToCart();
  await cart.open();
  await cart.goToCheckout();
  await shipping.fillShipping({
    phone: '0011223344',
    address: '22 rue des champignons',
    city: 'boeufville',
    postal: '40'
  });
});

test('Checkout - Paiement', async ({ page, auth, products, productDetail, cart, shipping, payment }) => {
  await auth.loginTest();
  await products.goto();
  await products.openProduct('1');
  await productDetail.addToCart();
  await cart.open();
  await cart.goToCheckout();
  await shipping.fillShipping({
    phone: '0011223344',
    address: '22 rue des champignons',
    city: 'boeufville',
    postal: '40'
  });
  await payment.pay({
    number: '9999888877774444',
    name: 'Jean Jack',
    expiry: '02/56',
    cvv: '789'
  });
});
