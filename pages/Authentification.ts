import { Page, Locator } from '@playwright/test';

// Gère la modale d'authentification (login/signup)
export class Authentification {
  page: Page;
  openButton: Locator;
  signupTab: Locator;
  signupName: Locator;
  signupEmail: Locator;
  signupPassword: Locator;
  signupConfirm: Locator;
  signupSubmit: Locator;
  loginEmail: Locator;
  loginPassword: Locator;
  loginSubmit: Locator;
  userMenu: Locator;
  loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openButton = page.getByTestId('login-button');
    this.signupTab = page.getByTestId('signup-tab');
    this.signupName = page.getByTestId('signup-name-input');
    this.signupEmail = page.getByTestId('signup-email-input');
    this.signupPassword = page.getByTestId('signup-password-input');
    this.signupConfirm = page.getByTestId('signup-confirm-password-input');
    this.signupSubmit = page.getByTestId('signup-submit-button');
    this.loginEmail = page.getByTestId('login-email-input');
    this.loginPassword = page.getByTestId('login-password-input');
    this.loginSubmit = page.getByTestId('login-submit-button');
    this.userMenu = page.getByTestId('user-menu-button');
    this.loginError = page.locator('text=/invalid|incorrect|failed/i');
  }

  // Ouvre la modale
  async open() {
    await this.openButton.click();
  }

  // Crée un nouveau compte
  async signup(name: string, email: string, password: string): Promise<void> {
    await this.open();
    await this.signupTab.click();
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupPassword.fill(password);
    await this.signupConfirm.fill(password);
    await this.signupSubmit.click();
    await this.userMenu.waitFor({ state: 'visible', timeout: 10000 });
  }

  // Se connecter
  async login(email: string, password: string): Promise<void> {
    await this.open();
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginSubmit.click();
    await this.userMenu.waitFor({ state: 'visible', timeout: 10000 });
  }

  // Se connecter avec le compte de test prédéfini
  async loginTest(): Promise<void> {
    await this.login('test.test@gmail.com', '123456');
  }
}
