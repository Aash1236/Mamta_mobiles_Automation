import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly addToCartButton: Locator;
    readonly cartIcon: Locator;
    readonly checkoutButton: Locator;
    readonly checkoutHeading: Locator;
    readonly cartProductName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProduct = page.getByRole('img', { name: 'Samsung Galaxy S25 Ultra' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.cartIcon = page.getByTestId('bag-icon')
        this.checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
        this.checkoutHeading = page.getByRole('heading', { name: 'Checkout' });
        this.cartProductName = page.locator('h3');
    }

    async selectFirstProduct() {
        await this.firstProduct.waitFor({ state: 'visible' });
        await this.firstProduct.click();
    }
    async addToCart() {
        await this.addToCartButton.waitFor({ state: 'visible' });
        await this.addToCartButton.click();
    }
    async openCart() {
        await this.cartIcon.waitFor({ state: 'visible' });
        await this.cartIcon.click();
    }
    async proceedToCheckout() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }

    async verifyCheckoutPage() {
        await this.checkoutHeading.waitFor({ state: 'visible' });
    }
    async verifyProductInCart(productName: string) {
        await this.cartProductName.filter({ hasText: productName }).waitFor({ state: 'visible' });
    }
}