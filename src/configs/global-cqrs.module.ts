// cqrs.module.ts
import { Module, Global } from '@nestjs/common';
import { CqrsModule as NestCqrsModule } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [
    NestCqrsModule,
  ],
  exports: [NestCqrsModule],
})
export class GlobalCqrsModule {}
