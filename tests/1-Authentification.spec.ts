import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { faker } from '@faker-js/faker';

test('Création de compte valide', async ({ page, auth }) => {
  await page.goto('https://techhubecommerce.lovable.app/');

  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 8 });
  await auth.signup(name, email, password);
  await expect(auth.userMenu).toBeVisible();
});

// Pour ce test j'ai crée un compte en amont pour vérifier que ça fonctionne
test('Login valide', async ({ page, auth }) => {
  await page.goto('https://techhubecommerce.lovable.app/');

  await auth.login('test.test@gmail.com', '123456');
  await expect(auth.userMenu).toBeVisible();
});
