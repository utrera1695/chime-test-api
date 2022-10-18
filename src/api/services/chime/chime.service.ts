import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChimeService {
  chime;
  ClientRequestToken = null;
  constructor() {
    this.chime = new AWS.Chime({
      endpoint: process.env.AWS_CHIME_ENDPOINT,
      region: process.env.AWS_CHIME_REGION,
      /*  credentials: new AWS.Credentials({
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
      }), */
    });
    this.ClientRequestToken = uuidv4();
  }
  async createMeeting() {
    return await this.chime
      .createMeeting({
        ClientRequestToken: this.ClientRequestToken,
        MediaRegion: 'us-west-2', // Specify the region in which to create the meeting.
      })
      .promise();
  }

  async createAttendee(meetingData) {
    return await this.chime
      .createAttendee({
        MeetingId: meetingData.Meeting.MeetingId,
        ExternalUserId: uuidv4(), // Link the attendee to an identity managed by your application.
      })
      .promise();
  }
}
