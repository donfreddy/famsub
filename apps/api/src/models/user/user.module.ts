import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MeController } from './me.controller';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { UserRepositoryImpl } from './repositories/user.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    UserService,
  ],
  exports: [UserRepository, UserService],
  controllers: [MeController, UsersController],
})
export class UserModule {}
