//Global setup to save login session to reuse it
import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ENV } from '../../utils/env';

setup('Authenticate and save session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
    await loginPage.clickNavbarLoginIcon();
    await loginPage.login(ENV.ADMIN_EMAIL!, ENV.ADMIN_PASSWORD!);
    await loginPage.verifyLoginSuccess();

    //save session
    await page.context().storageState({ path: 'storageState.json' });
})