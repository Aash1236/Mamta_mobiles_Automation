import { test, expect } from '../../fixtures/baseFixture'
import { ProductPage } from '../../pages/ProductPage'

test.describe('@smoke', () => {
    test('E2E: Product → Cart → Checkout', async ({ page }) => {
        const productPage = new ProductPage(page);
        const productName = 'Samsung Galaxy S25 Ultra';
        await page.goto('/');
        await productPage.selectFirstProduct();
        await productPage.addToCart();
        await productPage.openCart();
        await productPage.verifyProductInCart(productName);
        await productPage.proceedToCheckout();
        await productPage.verifyCheckoutPage();
        await expect(page).toHaveURL(/checkout/);
    })
})