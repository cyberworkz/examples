import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';

@Module({
  controllers: [SuggestionsController],
  providers: [SuggestionsService]
})
export class SuggestionsModule {}
