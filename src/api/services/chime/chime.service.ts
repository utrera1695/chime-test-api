import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChimeService {
  chime;
  ClientRequestToken = null;
  constructor() {
    this.ClientRequestToken = uuidv4();
    this.chime = new AWS.Chime({
      endpoint: process.env.AWS_CHIME_ENDPOINT,
      region: process.env.AWS_CHIME_REGION,
      credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      }),
    });
    console.log(this.ClientRequestToken);
    console.log(this.chime);
  }
  async createMeeting() {
    if (!this.chime) throw 'not chime create';
    return await this.chime
      .createMeeting({
        ClientRequestToken: this.ClientRequestToken,
        ExternalMeetingId: 'chime-oculus-test',
        MediaRegion: 'us-west-2', // Specify the region in which to create the meeting.
      })
      .promise();
  }

  async createAttendee(meetingData) {
    if (!this.chime) throw 'not chime create';
    return await this.chime
      .createAttendee({
        MeetingId: meetingData.Meeting.MeetingId,
        ExternalUserId: uuidv4(), // Link the attendee to an identity managed by your application.
      })
      .promise();
  }
}
