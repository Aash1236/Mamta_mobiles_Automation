import * as dotenv from 'dotenv';
dotenv.config({ path: 'env/.env'});

export const ENV = {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    BASE_URL: process.env.BASE_URL
}