import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { SupabaseStrategy } from './strategies/supabase.strategy';
import { AppConfigService } from '@modules/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => {
        return {
          global: true,
          secret: configService.jwtSecret,
          signOptions: { expiresIn: 40000 },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [JwtAuthGuard, SupabaseStrategy],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
