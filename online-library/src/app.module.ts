import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksRepository } from './books/books.repository';
import { BooksService } from './books/books.service';

@Module({
  imports: [],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService, BooksRepository],
})
export class AppModule {}
