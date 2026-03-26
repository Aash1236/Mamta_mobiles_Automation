import { test } from '../../fixtures/baseFixture';
import { AdminPage } from '../../pages/AdminPage';
import { generateProductData } from '../../utils/dataGenerator';

test.describe('@sanity', () => {
    test('Admin flow crud/', async ({ page }) => {
        const adminPage = new AdminPage(page);
        const product = generateProductData();
        await page.goto('/');

        //goto admin 
        await adminPage.goToProfile();
        await adminPage.openAdminPanel();
        await adminPage.openProducts();
        //add product
        await adminPage.clickAddNew();
        await adminPage.addProduct(product);
        await adminPage.goToProductsFromOrders();
        //verify product
        await adminPage.verifyProduct(product.name);
        //delete product
        await adminPage.deleteProduct(product.name);
        //verify deletion
        await adminPage.verifyProductDeleted(product.name);
    
    })
})