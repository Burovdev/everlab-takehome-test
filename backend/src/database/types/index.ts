export type CsvMetricType = {
  name: string;
  oru_sonic_codes?: string;
  diagnostic?: string;
  diagnostic_groups?: string;
  oru_sonic_units?: string;
  units?: string | number;
  min_age?: number;
  max_age?: number;
  gender?: string;
  standard_lower?: number;
  standard_higher?: number;
  everlab_lower?: number;
  everlab_higher?: number;
};
