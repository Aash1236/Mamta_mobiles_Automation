import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        // await handlePopup(page);

        await use(page);
    }
});
export { expect } from '@playwright/test';