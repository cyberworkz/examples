import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { IBook } from './ibook';
import { SuggestionsService } from './suggestions.service';

@Controller('suggestions')
export class SuggestionsController {

    constructor(private suggestionService: SuggestionsService){}

    @Get("/:isbn")
    async getSuggestionsByISBN(@Param('isbn') isbn:number, @Res() res: any){
        const suggestions: IBook[] = await this.suggestionService.getSuggestions(isbn);
        return res.status(HttpStatus.OK).json(suggestions);
    }

}

