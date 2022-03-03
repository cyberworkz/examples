import {Controller, Get, Param, Query, Res} from '@nestjs/common';
import {BooksService} from "./books.service";
import {IBook} from "./ibook";

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService){}

    @Get("/:isbn")
    async getBookByISBN(@Param('isbn') isbn:number, @Res() res: any){
        const book: object = await this.bookService.getBook(isbn);
        console.log('got book');
        return book;
    }

    @Get("/author")
    async getBooksByAuthor(@Query('lastName')lastName: string, @Query('firstName')firstName: string, @Res() res: any) {
        // const books: IBook[] = await this.bookService.getAuthorBooks(lastName, firstName);
        // return books;
    }
}
