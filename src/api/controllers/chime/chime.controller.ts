import { Controller, Post } from '@nestjs/common';
import { ChimeService } from '../../services/chime/chime.service';

@Controller('chime')
export class ChimeController {
  constructor(private chimeService: ChimeService) {}
  @Post()
  async joinMeeting() {
    const meetingData = await this.chimeService.createMeeting();
    const attendeeData = await this.chimeService.createAttendee(meetingData);
    return { meetingData, attendeeData };
  }
}
