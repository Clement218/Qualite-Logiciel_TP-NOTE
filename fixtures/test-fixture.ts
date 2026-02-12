import { test as base } from '@playwright/test';
import { Authentification } from '../pages/Authentification';
import { Produit } from '../pages/Produit';
import { DetailProduit } from '../pages/DetailProduit';
import { Panier } from '../pages/Panier';
import { VerifLivraison } from '../pages/VerifLivraison';
import { VerifPaiement } from '../pages/VerifPaiement';

type TestFixtures = {
  auth: Authentification;
  products: Produit;
  productDetail: DetailProduit;
  cart: Panier;
  shipping: VerifLivraison;
  payment: VerifPaiement;
  loggedUser: boolean;
};

export const test = base.extend<TestFixtures>({
  auth: async ({ page }, use) => {
    await use(new Authentification(page));
  },

  products: async ({ page }, use) => {
    await use(new Produit(page));
  },

  productDetail: async ({ page }, use) => {
    await use(new DetailProduit(page));
  },

  cart: async ({ page }, use) => {
    await use(new Panier(page));
  },

  shipping: async ({ page }, use) => {
    await use(new VerifLivraison(page));
  },

  payment: async ({ page }, use) => {
    await use(new VerifPaiement(page));
  },

  loggedUser: async ({ auth }, use) => {
    await auth.login('test.test@gmail.com', '123456');
    await use(true);
  }
});