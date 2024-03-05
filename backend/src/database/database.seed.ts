import path from 'path';
import { PrismaClient } from '@prisma/client';
import { readFile, utils } from 'xlsx';
import { CsvMetricType } from './types';

const diagnosticPath = path.join(__dirname, 'assets/diagnostic_metrics.csv');

const prisma = new PrismaClient();

const seed = async () => {
  const metricsWorkbook = readFile(diagnosticPath);
  const metrics: CsvMetricType[] = utils.sheet_to_json(
    metricsWorkbook.Sheets[metricsWorkbook.SheetNames[0]],
  );

  await Promise.all(
    metrics.map((metric) => {
      return prisma.metrics.create({
        data: {
          name: metric.name,
          diagnostic: metric.diagnostic,
          diagnosticGroups: metric.diagnostic_groups,
          gender: metric.gender,
          minAge: metric.min_age,
          maxAge: metric.max_age,
          oruSonicCodes: metric.oru_sonic_codes?.split(';'),
          units: (metric.units?.toString() ?? '').split('/'),
          oruSonicUnits: (metric.units?.toString() ?? '').split('/'),
          standardLower: metric.standard_lower,
          standardHigher: metric.standard_higher,
          everlabLower: metric.everlab_lower,
          everlabHigher: metric.everlab_higher,
        },
      });
    }),
  );
};

seed();
