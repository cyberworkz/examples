import { Service } from 'typedi';
import { Category } from './category';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';

@Service()
export class DataRepository {

  protected tableName: string;
  protected db: DocumentClient;

  constructor() {
    this.tableName = process.env.DB_NAME;
    this.db = new AWS.DynamoDB.DocumentClient();
  }

  async upload(parsedData: any[]) {
    console.log('uploading data');

    for (const item of parsedData) {
      if (item.PK.includes('CAT#')) {
        await this.handleCategoryItem(item);
      }
    }
  }

  async handleCategoryItem(item: any) {
    let category = this.getCategory(item);
    try {
      await this.db
        .put({
          TableName: this.tableName,
          Item: category,
          ConditionExpression: 'attribute_not_exists(#code)',
          ExpressionAttributeNames: {
            '#code': 'code',
          },
        }, function (err, data) {
          if (err) {
            console.log('Error adding item to database: ', err);
          }
          else {
            console.log(data);
          }
        }).promise();
    } catch (error) {
      if (error.code === 'ConditionalCheckFailedException') {
        console.log('insert cancelled for category with code ' + item.code, error);
      }
    }
  }

  getCategory(item: any) {
    let category = new Category();
    category.PK = item.PK;
    category.SK = item.SK;
    category.code = item.code;
    category.name = item.name;

    console.log(category);
    return category;
  }
}
