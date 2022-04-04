import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {QuotesService} from './quotes.service';
import {QuotesModel} from './quotes.model';

@Controller('quotes')
export class QuotesController {

    constructor(private readonly quotesService: QuotesService) {}

    @Get()
    getQuotes(@Res() res) {
        const quotes = this.quotesService.getAllQuotes();
        return res.status(HttpStatus.OK).json(Array.from(quotes.entries()));
    }

    @Post()
    addQuote(@Body() quote: QuotesModel, @Res() res: any) {
        const quotes = this.quotesService.addQuote(quote.quote, quote.author);
        return res.status(HttpStatus.CREATED).json(Array.from(quotes.entries()));
    }

}
