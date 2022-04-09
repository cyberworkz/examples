import { S3Event, S3Handler } from 'aws-lambda';

import S3 from 'aws-sdk/clients/s3';
import { Container } from 'typedi';
import { CsvRecordImportService } from './csv-record-import-service';

const processor: S3Handler = async (event: S3Event) => {
  // tslint:disable-next-line:prefer-template
  console.log('received event on ' + new Date().toDateString());

  const csvImportService = Container.get(CsvRecordImportService);

  for (const record of event.Records) {
    const key: string = record.s3.object.key;
    console.log(' key-->  ', key);
    console.log(record);

    const s3: S3 = new S3({ apiVersion: '2006-03-01', region: 'eu-west-1' });

    await s3.getObject({ Bucket: record.s3.bucket.name, Key: record.s3.object.key }).promise().then((data) => {
      console.log(data.Body.toString());
      },
    );

    const stream = await s3.getObject({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    }).createReadStream();
    await csvImportService.import(stream);
  }
};

export default processor;
