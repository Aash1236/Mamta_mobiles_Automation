import { Page, Locator, expect } from "@playwright/test";

export class AdminPage {
    readonly page: Page;
    readonly profileIcon: Locator;
    readonly adminPanelButton: Locator;
    readonly adminDashboardHeading: Locator;
    readonly ordersTab: Locator;
    readonly orderManagementHeading: Locator;
    readonly btdbFromOrders: Locator;
    readonly productsTab: Locator;
    readonly productManagementHeading: Locator;
    readonly btdbFromProducts: Locator;
    readonly addNewButton: Locator;
    readonly fileInput: Locator;
    readonly productNameInput: Locator;
    readonly brandDropdown: Locator;
    readonly categoryDropdown: Locator;
    readonly priceInput: Locator;
    readonly descriptionInput: Locator;
    readonly saveProductButton: Locator;
     
    constructor(page: Page) {
        this.page = page;
        this.profileIcon = page.getByTestId('user-icon');
        this.adminPanelButton = page.getByRole('button', { name: 'Admin Panel' });
        this.adminDashboardHeading = page.getByRole('heading', { name: 'Admin Dashboard' });
        this.ordersTab = page.getByTestId('orders');
        this.orderManagementHeading = page.getByRole('heading', { name: 'Order Management' });
        this.btdbFromOrders = page.getByRole('link', { name: 'Back to Dashboard' });
        this.productsTab = page.getByTestId('products');
        this.productManagementHeading = page.getByRole('heading', { name: 'Manage Products' });
        this.btdbFromProducts = page.getByRole('link', { name: 'Dashboard' });
        //handle orders
        this.addNewButton = page.getByRole('button', { name: 'Add New' });
        this.fileInput = page.locator('input[type="file"]');
        this.productNameInput = page.getByRole('textbox', { name: 'e.g. iPhone 15' });
        this.brandDropdown = page.locator('select[name="brand"]');
        this.categoryDropdown = page.locator('select[name="category"]');
        this.priceInput = page.locator('input[name="price"]');
        this.descriptionInput = page.locator('textarea[name="description"]');
        this.saveProductButton = page.getByRole('button', { name: 'Save Product' });
    }

    //Profile navigation
    async goToProfile() {
        await this.profileIcon.click();
        await this.page.waitForURL(/profile/);
    }
    //admin panel
    async openAdminPanel() {
        await this.adminPanelButton.click();
        await this.adminDashboardHeading.waitFor({ state: 'visible' });
    }
    //orders page
    async openOrders() {
        await this.ordersTab.click();
        await this.orderManagementHeading.waitFor({ state: 'visible' });
    }
    async backFromOrders() {
        await this.btdbFromOrders.click();
        await this.adminDashboardHeading.waitFor({ state: 'visible' });
    }
    //products page
    async openProducts() {
        await this.productsTab.click();
        await this.productManagementHeading.waitFor({ state: 'visible' });
    }
    async backFromProducts() {
        await this.btdbFromProducts.click();
        await this.orderManagementHeading.waitFor({ state: 'visible' });
    }
    //verify product existance
    async verifyProduct(productName: string) {
        const formattedName = productName.replace(/\s+/g, '-').toLowerCase();
        const productRow = this.page.getByTestId(`product_${formattedName}`);
        await expect(productRow).toBeVisible();
    }
    //add product method
    async clickAddNew() {
        await this.addNewButton.waitFor({ state: 'visible' });
        await this.addNewButton.click();
    }
    async addProduct(product: {
        name: string;
        price: string;
        description: string;
        brand: string;
        category: string;
        imagePath: string;
    }) {
        await this.productNameInput.waitFor({ state: 'visible' });
        await this.fileInput.setInputFiles(product.imagePath);
        await this.productNameInput.fill(product.name);
        await this.brandDropdown.selectOption({ label: product.brand });
        await this.categoryDropdown.selectOption({ label: product.category });
        await this.priceInput.fill(product.price);
        await this.descriptionInput.fill(product.description);
        await this.saveProductButton.click();
        await this.page.waitForURL(/admin\/orders/); 
    }
    async goToProductsFromOrders() {
        await this.btdbFromOrders.click();
        await this.adminDashboardHeading.waitFor({ state: 'visible' });
        await this.productsTab.click();
        await this.productManagementHeading.waitFor({ state: 'visible' });
    }
    async deleteProduct(productName: string) {
        const formattedName = productName.replace(/\s+/g, '-').toLowerCase();

        const deleteBtn = this.page.getByTestId(`delete_product_${formattedName}`);
        this.page.once('dialog', async (dialog) => {
            console.log(dialog.message());
            await dialog.accept();
        })
        await deleteBtn.click();
    }

    async verifyProductDeleted(productName: string) {
        const formattedName = productName.replace(/\s+/g, '-').toLowerCase();

        const productRow = this.page.getByTestId(`product_${formattedName}`);
        await productRow.waitFor({ state: 'detached' });
    }
}