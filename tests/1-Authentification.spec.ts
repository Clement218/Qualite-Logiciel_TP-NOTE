import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { faker } from '@faker-js/faker';

const { URL } = process.env;

// Je fais ça pour eviter de le remettre à chaque fois
test.beforeEach(async ({ page }) => {
  await page.goto(URL!);
});

test('Création de compte valide', async ({ page, auth }) => {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 8 });
  await auth.signup(name, email, password);
  await expect(auth.userMenu).toBeVisible();
});

// Pour ce test j'ai crée et mis dans le Authentification.ts un compte en amont pour vérifier que ça fonctionne
test('Login valide', async ({ page, auth }) => {
  await auth.loginTest();
  await expect(auth.userMenu).toBeVisible();
});
