import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [DatabaseModule, ResultsModule],
})
export class AppModule {}
