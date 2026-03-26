import { test, expect } from '../../fixtures/baseFixture';
import { ProductPage } from '../../pages/ProductPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { generateUserData } from '../../utils/dataGenerator';

test.describe('@smoke', () => {
    test('E2E: Complete Order Flow(COD)', async ({ page }) => {
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = generateUserData();

        await page.goto('/');
        await productPage.selectFirstProduct();
        await productPage.addToCart();
        await productPage.openCart();
        await productPage.proceedToCheckout();

        //Fill details
        await checkoutPage.fillCustomerInfo(
            user.firstName,
            user.lastName,
            user.phone
        );

        await checkoutPage.fillShipping(
            user.address,
            user.city,
            user.state,
            user.pincode
        );

        await checkoutPage.selectCOD();
        await checkoutPage.placeOrder();

        await checkoutPage.verifyOrderSuccess();
    
    })

})