import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { ProtectedRequest } from '../../common/helpers';
import { Transaction } from './entities/transaction.entity';

@ApiSecurity('api-key')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Create a new transaction', type: CreateTransactionDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Create a new transaction' })
  @Post()
  async create(
    @Request() request: ProtectedRequest,
    @Body() inputs: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.create(request.user, inputs);
  }
}
