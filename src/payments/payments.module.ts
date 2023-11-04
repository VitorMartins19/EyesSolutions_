import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
  } from "@nestjs/common";
  import { AuthModule } from "src/auth/auth.module";
  import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
  import { PrismaModule } from "src/prisma/prisma.module";
  import { PayController } from "./payments.controller";
  import { PayService } from "./payments.service";
  
  @Module({
  imports: [PrismaModule,forwardRef(() => AuthModule)],
    controllers: [PayController],
    providers: [PayService],
    exports: [PayService],
  })
  export class PayModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(UserIdCheckMiddleware).forRoutes({
        path: "users/:id",
        method: RequestMethod.ALL,
      });
    }
  }
  