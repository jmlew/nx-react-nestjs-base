import { Module } from '@nestjs/common';

import { BaseModule } from './features/base/base.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [BaseModule, UserModule],
})
export class AppModule {}
