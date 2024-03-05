import { Injectable } from '@nestjs/common';
import parser, { Node } from 'hl7parser';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import { calculateYearsDiff, convertHl7DateStringToDate } from '../common/utils/date';
import { getMetricStatus } from '../common/utils/metrics';

@Injectable()
export class ResultsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async processResults(file: Express.Multer.File) {
    const hl7 = parser.create(file.buffer.toString().trim());
    const gender = hl7.get('PID.8').toString() === 'M' ? 'Male' : 'Female';
    const birthDateString = hl7.get('PID.7').toString();
    const birthDate = convertHl7DateStringToDate(birthDateString);
    const age = calculateYearsDiff(birthDate);
    const messages: Node[] = [];

    hl7.get('OBX').forEach((o) => {
      const value = o.get('OBX.2').toString();

      if (value === 'NM') messages.push(o);
    });

    const results = await Promise.all(
      messages.map(async (message) => {
        const metricName = message.get('OBX.3.2').toString();
        const units = (message.get('OBX.6') ?? '').toString().split('/');
        const metricValue = +message.get('OBX.5').toString();

        const metric = await this.databaseService.metrics.findFirst({
          where: {
            AND: [
              {
                gender: { in: ['Any', gender] },
                OR: [
                  {
                    name: { equals: metricName, mode: Prisma.QueryMode.insensitive },
                  },
                  {
                    oruSonicCodes: { hasSome: [metricName] },
                  },
                ],
              },
              {
                OR: [
                  { minAge: { lte: age }, maxAge: null },
                  { maxAge: { gte: age }, minAge: null },
                  { minAge: { lte: age }, maxAge: { gte: age } },
                  { maxAge: null, minAge: null },
                ],
              },
              {
                OR: [{ units: { hasSome: units } }, { oruSonicUnits: { hasSome: units } }],
              },
            ],
          },
        });

        const status = metric
          ? getMetricStatus(
              Math.min(metric.everlabLower || 0, metric.standardLower || 0),
              Math.max(metric.everlabHigher || Infinity, metric.standardHigher || Infinity),
              metricValue,
            )
          : 'no info';

        return {
          metric: metric ?? { name: metricName },
          status,
          value: metricValue,
        };
      }),
    );
    return results.filter(Boolean);
  }
}
