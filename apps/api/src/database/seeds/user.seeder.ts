import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../models/user/entities/user.entity';
import { Gender, Role } from '../../common/helpers';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const users = [
    {
      first_name: 'Freddy',
      last_name: 'Tamwo',
      username: 'donfreddy',
      email: 'freddytamwo@gmail.com',
      contact_number: '671842701',
      gender: Gender.MALE,
      password: await bcrypt.hash('Famsub@2024', 10),
      role: Role.SUPER_ADMIN,
      country: 'Cameroon',
      birthdate: new Date('1995-07-23'),
      email_verified: true,
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Freddy&backgroundColor=7ed6df',
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      contact_number: '672505050',
      gender: Gender.MALE,
      password: await bcrypt.hash('Password@123', 10),
      role: Role.USER,
      account_verified: true,
      country: 'Cameroon',
      birthdate: new Date('1990-11-01'),
      email_verified: true,
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=John&backgroundColor=7ed6df',
    },
  ];

  for (const user of users) {
    const existingUser = await userRepository.findOne({ where: { email: user.email } });
    if (!existingUser) {
      // await userRepository.save(userRepository.create(user));
     // console.log(`User ${user.username} seeded`);
    }
  }
};
