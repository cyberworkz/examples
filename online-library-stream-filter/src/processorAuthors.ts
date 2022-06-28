import {DynamoDBStreamEvent, DynamoDBStreamHandler} from 'aws-lambda';
import {Container} from "typedi";
import { ExportService } from './export-search.service';
import {Converter} from "aws-sdk/clients/dynamodb";
import { Author } from './model/author';

const processor: DynamoDBStreamHandler= async (event: DynamoDBStreamEvent) => {
    // tslint:disable-next-line:prefer-template
  console.log('received event on ' + new Date().toDateString());

  const exportService = Container.get(ExportService);

  try {
    for (const record of event.Records) {
      const source: string = record.eventSource;
      const newImage = record.dynamodb.NewImage
      console.log(' source-->  ', source);
      console.log('new image \n' + newImage)
      console.log('keys \n' + record.dynamodb.Keys);
      
      let author: Author = Converter.unmarshall(record.dynamodb.NewImage) as Author;
      await exportService.processAuthor(author);
    }
  } catch (error) {
    console.log(error);
  }
};

export default processor;
