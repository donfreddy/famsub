import { faker } from '@faker-js/faker'

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.number.int({ min: 10, max: 1000 }),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'suspended',
      'deactivated',
      'banned',
      'deleted',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'user',
    ]),
    profilePicture: `https://api.dicebear.com/9.x/avataaars/svg?seed=${firstName}`,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
