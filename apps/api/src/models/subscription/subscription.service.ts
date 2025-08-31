import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SubscriptionService {
  private readonly subscriptionRepository: Repository<Subscription>;

  constructor(private readonly dataSource: DataSource) {
    this.subscriptionRepository = this.dataSource.getRepository(Subscription);
  }

  async create(user: User, inputs: CreateSubscriptionDto): Promise<Subscription> {
    return await this.subscriptionRepository.save({ inputs, user: user });
  }
}
