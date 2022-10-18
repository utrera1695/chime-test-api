import { Module } from '@nestjs/common';
import { ChimeService } from 'src/api/services/chime/chime.service';
import { ChimeController } from '../../controllers/chime/chime.controller';

@Module({
  controllers: [ChimeController],
  providers: [ChimeService],
  exports: [ChimeService],
})
export class ChimeModule {}
