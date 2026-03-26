import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly phone: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly pincode: Locator;
    readonly codOption: Locator;
    readonly codRadio: Locator;
    readonly placeOrderButton: Locator;
    readonly orderSuccessHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        //cust info
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.phone = page.getByRole('textbox', { name: '98765 43210' });

        //shipping details
        this.address = page.getByRole('textbox', { name: 'Flat No, Building, Street' });
        this.city = page.getByRole('textbox', { name: 'City' });
        this.state = page.getByRole('textbox', { name: 'State' });
        this.pincode = page.getByRole('textbox', { name: '123456' });

        //Payment
        this.codOption = page.getByText('Cash on Delivery', { exact: true });
        this.codRadio = page.getByTestId('radio-select-COD');

        //Place order
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.orderSuccessHeading =  page.getByRole('heading', { name: 'Order Confirmed!' })
    }

    async fillCustomerInfo(first: string, last: string, phone: string) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.phone.fill(phone);
    }

    async fillShipping(address: string, city: string, state: string, pincode: string) {
        await this.address.fill(address);
        await this.city.fill(city);
        await this.state.fill(state);
        await this.pincode.fill(pincode);
    }

    async selectCOD() {
        await this.codRadio.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }

    async verifyOrderSuccess() {
        await this.orderSuccessHeading.waitFor({ state: 'visible' })
    }
}