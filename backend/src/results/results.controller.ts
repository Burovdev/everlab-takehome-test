import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  processResults(@UploadedFile('file') file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File not found!');
    if (file.mimetype !== 'text/plain')
      throw new BadRequestException('Uploaded file must be txt format');

    return this.resultsService.processResults(file);
  }
}
