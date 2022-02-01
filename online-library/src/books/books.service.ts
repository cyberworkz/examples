import { Injectable } from '@nestjs/common';
import {BooksRepository} from "./books.repository";

@Injectable()
export class BooksService {

    constructor(bookRepo: BooksRepository) {}
}
