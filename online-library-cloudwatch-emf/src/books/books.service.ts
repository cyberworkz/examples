import { Injectable } from '@nestjs/common';
import { metrics } from '../main';
import { BooksRepository } from "./books.repository";

import { MetricUnits} from '@aws-lambda-powertools/metrics';


@Injectable()
export class BooksService {


    constructor(private bookRepo: BooksRepository) { }

    async getBook(isbn: number) {
        return await this.bookRepo.getBook(isbn);
    }

    async getAuthorBooks(lastName: string, firstName: string) {
        return await this.bookRepo.getBooksByAuthor(lastName, firstName);
    }

    async lendBook(isbn: number) {
        let bookResponse = await this.bookRepo.lendBook(isbn);

        // measure books lend per category
        metrics.addMetric(bookResponse.data.category, MetricUnits.Count, 1);
        metrics.addMetadata('lendDate', bookResponse.data.lendDate)

        return bookResponse;
    }

    async returnBook(isbn: number) {
        let bookResponse = await this.bookRepo.returnBook(isbn);

         // measure books lend per category
         metrics.addMetric(bookResponse.data.category, MetricUnits.Count, 1);
         metrics.addMetadata('lendDate', bookResponse.data.lendDate)

         return bookResponse;
    }
}