import { faker } from '@faker-js/faker';

export function generateUserData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),

        address: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        pincode: faker.location.zipCode('######'),
    
    }
}
export function generateProductData() {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 1000, max: 200000 }),
        description: faker.commerce.productDescription(),
        brand: 'Apple',
        category: 'Mobiles',
        imagePath: 'test-data/sample.jpg'
    }
}