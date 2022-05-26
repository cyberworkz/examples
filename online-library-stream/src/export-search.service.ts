import {Service} from "typedi";
import {DynamoDBRecord} from "aws-lambda";
import {Converter} from "aws-sdk/clients/dynamodb";
import algoliasearch, {SearchClient} from "algoliasearch";
import { Book } from "./model/book";

const applicationId = process.env.APPLICATION_ID;
const adminAPIKey = process.env.ADMIN_API_KEY;

@Service()
export class ExportService {

    searchClient: SearchClient;

    constructor() {
        this.searchClient = algoliasearch(applicationId, adminAPIKey); 
    }

    async processRecord(record: DynamoDBRecord) {
        console.log("incoming record", record);
        let book: Book = Converter.unmarshall(record.dynamodb.NewImage) as Book;
    
        console.log('adding book');
        book.objectID = book.PK;

        let bookIndex = this.searchClient.initIndex("dev_online_library");

        await bookIndex.saveObject(book).then((objectID) => {
            console.log(objectID);
        })
    }
}
