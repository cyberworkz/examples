import { ErrorCode, WebClient } from '@slack/web-api';
import {
  CloudWatchLogsDecodedData,
  CloudWatchLogsEvent,
  CloudWatchLogsEventData,
  CloudWatchLogsHandler,
} from 'aws-lambda';
import * as zlib from "zlib";

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

/**
 * Note: Cloudwatch log events are gzip-compressed and base64-encoded
 */
const processor: CloudWatchLogsHandler = async (event: CloudWatchLogsEvent) => {

  console.log('received log event on ' + new Date().toDateString());

  const compressedData: CloudWatchLogsEventData = event.awslogs;

  if(compressedData){
    const payload = Buffer.from(compressedData.data, 'base64')
    const decodedData: CloudWatchLogsDecodedData = JSON.parse(zlib.unzipSync(payload).toString()) as CloudWatchLogsDecodedData;

    console.log("Log group:" + decodedData.logGroup);

    for (const logEvent of decodedData.logEvents) {
    
      console.log(decodedData.logGroup + " " + logEvent.message);

      // message Slack
      try {
        const result  = await web.chat.postMessage({
          text: logEvent.message,
          channel: '#general'
        });
        console.log(result);
      }
      catch (error) {
        // Check the code property, and when its a PlatformError, log the whole response.
        if (error.code === ErrorCode.PlatformError) {
          console.log(error.data);
        } else {
          // Some other error, oh no!
          console.log('Well, that was unexpected.');
        }
      }
    }
  }
};

export default processor;
