import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './api/modules/auth/auth.module';
import { UserModule } from './api/modules/user/user.module';
import { ChimeService } from './api/services/chime/chime.service';
import { ChimeController } from './api/controllers/chime/chime.controller';
import { ChimeModule } from './api/modules/chime/chime.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ChimeModule,
    /*  TypeOrmModule.forRoot(configuration().database as TypeOrmModuleOptions), */
    /* AuthModule,
    UserModule */
  ],
  providers: [AppService, ConfigService],
  controllers: [AppController],
})
export class AppModule {}
