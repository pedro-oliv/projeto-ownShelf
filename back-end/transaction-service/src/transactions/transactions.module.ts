import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../prisma/prisma.module';

import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    PrismaModule,

    ClientsModule.register([
      {
        name: 'RABBIT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ||
              'amqp://guest:guest@localhost:5672',
          ],
          queue: 'library_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],

  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
