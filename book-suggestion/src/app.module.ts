import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuggestionsModule } from './suggestions/suggestions.module';

@Module({
  imports: [SuggestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
