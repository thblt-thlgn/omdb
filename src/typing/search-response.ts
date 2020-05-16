import { DataType } from './data-type';

interface SearchItem {
  title: string;
  year: number;
  imdbID: string;
  type: DataType;
  poster?: string;
}

export type SearchResponse = SearchItem[];
