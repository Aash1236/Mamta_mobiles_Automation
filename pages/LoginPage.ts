import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly profileIcon: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly adminPanelButton: Locator;


    constructor( page: Page) {
    this.page = page;

    //Navbar profile icon
    this.profileIcon =  page.getByTestId('user-icon')
    //login
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });

        // Admin validation
        this.adminPanelButton = page.getByRole('button', { name: 'Admin Panel' });
    }
    async navigateToHome() {
        await this.page.goto('/');
    }

    async clickNavbarLoginIcon() {
        await this.profileIcon.waitFor({ state: 'visible' });
        await this.profileIcon.scrollIntoViewIfNeeded();
        await this.profileIcon.click({ force: true });
    }

    async login(email: string, password: string) {
        await this.page.waitForURL(/login/);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccess() {
        await this.page.waitForURL('/');
    }

    async goToProfile() {
        await this.profileIcon.waitFor({ state: 'visible' });
        await this.profileIcon.click({ force: true });
        await this.page.waitForURL(/profile/);
    }

    async isAdminUser(): Promise<boolean> {
        try {
            await this.adminPanelButton.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
        
    }
    }

