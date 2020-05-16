import { DataType } from './data-type';

export interface SearchParam {
  search: string;
  type?: DataType;
  year?: number;
  page?: number;
}
