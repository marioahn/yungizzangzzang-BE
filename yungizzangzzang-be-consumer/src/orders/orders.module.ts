import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullConfigProvider } from 'src/common/providers/bull-config.provider';
import { ItemsModule } from 'src/items/items.module';
import { OrderItemsModule } from 'src/order-items/order-items.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/users/auth/auth.service';
// import { OrdersController } from './orders.controller';
import { OrdersProcessor } from './orders.processor';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    PrismaModule,
    OrderItemsModule,
    ItemsModule,
    BullModule.forRootAsync('bullqueue-config', {
      useClass: BullConfigProvider,
    }),
    BullModule.registerQueue({
      configKey: 'bullqueue-config',
      name: 'orders',
    }),
  ],
  // controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    EventEmitter2,
    AuthService,
    OrdersProcessor,
  ],
  exports: [OrdersRepository, OrdersService],
})
export class OrdersModule {
  // bull-board UI 연결을 위한 설정
  // constructor(@InjectQueue('ordersQueue') private ordersQueue: Queue) {}
  // configure(consumer: MiddlewareConsumer) {
  //   const serverAdapter = new ExpressAdapter();
  //   serverAdapter.setBasePath('/queues-board');
  //   createBullBoard({
  //     queues: [new BullAdapter(this.ordersQueue)],
  //     serverAdapter,
  //   });
  //   consumer.apply(serverAdapter.getRouter()).forRoutes('/queues-board');
  // }
}