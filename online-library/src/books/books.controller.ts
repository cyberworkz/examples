import {Controller, Get, Param, Res} from '@nestjs/common';
import {BooksService} from "./books.service";
import {IBook} from "./ibook";

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService){}

    @Get("/:isbn")
    async getBookByISBN(@Param('isbn') isbn:number, @Res() res: any){
        const book: object = await this.bookService.getBook(isbn);
        return book;
    }

    @Get("/")
    async getBooksByAuthor(lastName: string, firstName: string) {
        const books: IBook[] = await this.bookService.getAuthorBooks(lastName, firstName);
    }
}
