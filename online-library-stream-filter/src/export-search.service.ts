import {Service} from "typedi";
import algoliasearch, {SearchClient} from "algoliasearch";
import { Book } from "./model/book";
import { Author } from "./model/author";

const applicationId = process.env.APPLICATION_ID;
const adminAPIKey = process.env.ADMIN_API_KEY;

@Service()
export class ExportService {

    searchClient: SearchClient;

    constructor() {
        this.searchClient = algoliasearch(applicationId, adminAPIKey); 
    }

    async processBook(book: Book) {
    
        console.log('adding book');
        book.objectID = book.PK;

        let bookIndex = this.searchClient.initIndex("dev_online_library");

        await bookIndex.saveObject(book).then((objectID) => {
            console.log(objectID);
        })
    }

    async processAuthor(author: Author) {
    
        console.log('adding author');
        author.objectID = author.PK;

        let authorIndex = this.searchClient.initIndex("dev_online_library_author");

        await authorIndex.saveObject(author).then((objectID) => {
            console.log(objectID);
        })
    }
}
