import { test, expect } from "@playwright/test";
import { AdminPage } from "../../pages/AdminPage";

test.describe('@sanity', () => {
    test('Admin flow', async ({ page }) => {
        const adminPage = new AdminPage(page);
        await page.goto('/');

        //admin panel
        await adminPage.goToProfile();
        await adminPage.openAdminPanel();

        //orders
        await adminPage.openOrders();
        await adminPage.backFromOrders();

        //products
        await adminPage.openProducts();
        await adminPage.verifyProduct('test pixel');
        await adminPage.backFromProducts();
        await adminPage.backFromOrders();
    })
})