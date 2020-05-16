import { DataType } from './data-type';

export interface APISearchParams {
  s: string;
  type?: DataType;
  y?: number;
  r?: 'json' | 'xml';
  page?: number;
  v?: number;
}
