import { Injectable } from '@nestjs/common';

@Injectable()
export class QuotesService {

    private readonly quotes: Map<string, string[]>;

    constructor() {
        this.quotes = new Map<string, string[]>();
        this.quotes.set('Eleanor Roosevelt', ['If life were predictable it would cease to be life, and be without flavor.']);
        this.quotes.set('Oprah Winfrey', ['If you look at what you have in life, you\'ll always have more. If you look at ' +
        'what you don\'t have in life, you\'ll never have enough.']);
    }

        addQuote(quote: string, author: string): Map<string, string[]> {
        if (this.quotes.has(author)) {
            const authorQoutes = this.quotes.get(author);
            authorQoutes.push(quote);
        } else {
            const quoteArray = new Array<string>();
            quoteArray.push(quote);
            this.quotes.set(author, quoteArray);
        }
        return this.quotes;
    }

    getAllQuotes() {
        return this.quotes;
    }

    getAuthorQuotes(author: string) {
        return this.quotes.get(author);
    }

    // tslint:disable-next-line:no-empty
    async clear() {

    }
}
