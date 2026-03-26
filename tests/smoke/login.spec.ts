import { test, expect } from '../../fixtures/baseFixture';
import { LoginPage } from '../../pages/LoginPage';
import { ENV } from '../../utils/env';

test('Admin Login Smoke Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // await loginPage.navigateToHome();
    // await loginPage.clickNavbarLoginIcon();
    // await loginPage.login(ENV.ADMIN_EMAIL!, ENV.ADMIN_PASSWORD!)
    // //page redirects to home
    // await loginPage.verifyLoginSuccess();

    await page.goto('/');
    await loginPage.goToProfile();

    //validate admin
    const isAdmin = await loginPage.isAdminUser();
    expect(isAdmin).toBeTruthy();

})