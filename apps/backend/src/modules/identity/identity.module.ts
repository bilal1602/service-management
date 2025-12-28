// apps/api/src/modules/identity/identity.module.ts
import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
