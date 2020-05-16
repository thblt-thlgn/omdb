import { DataType } from './data-type';

interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: DataType;
  Poster: string | 'N/A';
}

export interface APISearchResponse {
  Search: Search[];
  totalResults: string;
  Response: 'True' | 'False';
}
