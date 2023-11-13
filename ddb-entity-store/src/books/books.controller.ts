import {Controller, Get, HttpStatus, Param, Res} from '@nestjs/common';
import {BooksService} from './books.service';
import {Book} from './book';

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) {}

    @Get('/:isbn')
    async getBookByISBN(@Param('isbn') isbn: number, @Res() res: any) {
        const book: object = await this.bookService.getBook(isbn);
        return res.status(HttpStatus.OK).json(book);
    }

    @Get('/author/:lastName/:firstName')
    async getBooksByAuthor(@Param('lastName')lastName: string, @Param('firstName')firstName: string, @Res() res: any) {
        const books: any[] = await this.bookService.getAuthorBooks(lastName, firstName);
        return res.status(HttpStatus.OK).json(books);
    }
}
