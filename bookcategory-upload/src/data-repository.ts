import { Service } from 'typedi';
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

    parsedData.forEach((item) => {
      if (item.GSI1PK.includes('CAT#')) {
        this.handleCategoryItem(item);
      }
    });
  }

  async handleCategoryItem(item: any) {
    try {
      await this.db
                .put({
                  TableName: this.tableName,
                  Item: item,
                  ConditionExpression: 'attribute_not_exists(#name)',
                  ExpressionAttributeNames: {
                    '#name': 'code',
                  },
                }).promise();
    } catch (error) {
      if (error.code === 'ConditionalCheckFailedException') {
        console.log(`category with code ${item.code}  already exists`, error);
      }
    }
  }
}
