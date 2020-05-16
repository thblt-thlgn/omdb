import { generateQueryParams, fetch, asNullable, asNumber } from './utils';
import {
  APISearchParams,
  APISearchResponse,
  SearchOptions,
  SearchResponse,
  FetchOptions,
  APIFetchParams,
  FetchResponse,
  APIFetchResponse,
} from './typing';

const API_HOSTNAME = 'http://www.omdbapi.com';
const API_VERSION = 1;

class OMDb {
  #apiKey: string;

  constructor(apiKey: string) {
    this.#apiKey = apiKey;
  }

  private getAPIFetchParams = (
    key: string,
    kind: 'id' | 'title',
    opts: FetchOptions = {},
  ): APIFetchParams =>
    kind === 'id'
      ? {
          i: key,
          ...opts,
        }
      : {
          t: key,
          ...opts,
        };

  private castAPIFetchResponse = (params: APIFetchResponse): FetchResponse => ({
    title: params.Title,
    year: asNumber(params.Year),
    rated: params.Rated,
    released: params.Released,
    runtime: params.Runtime,
    genre: params.Genre.split(', '),
    director: params.Director,
    writers: params.Writer.split(', '),
    actors: params.Actors.split(', '),
    plot: params.Plot,
    language: params.Language,
    country: params.Country,
    awards: params.Awards,
    poster: asNullable(params.Poster),
    ratings: params.Ratings.map((cursor) => ({ source: cursor.Source, value: cursor.Value })),
    metascore: asNumber(params.Metascore),
    imdbRating: asNumber(params.imdbRating),
    imdbVotes: asNumber(params.imdbVotes),
    imdbId: params.imdbID,
    type: params.Type,
    dvd: asNullable(params.DVD),
    boxOffice: asNullable(params.BoxOffice),
    production: asNullable(params.Production),
    website: asNullable(params.Website),
  });

  private getAPISearchParams = (search: string, opts: SearchOptions = {}): APISearchParams => ({
    s: search,
    type: opts.type,
    y: opts.year,
    r: 'json',
    page: opts.page || 1,
    v: API_VERSION,
  });

  private castAPISearchResponse = (params: APISearchResponse): SearchResponse =>
    params.Search.map((item) => ({
      title: item.Title,
      imdbID: item.imdbID,
      type: item.Type,
      year: asNumber(item.Year),
      poster: asNullable(item.Poster),
    }));

  private async fetch(params: APIFetchParams): Promise<FetchResponse> {
    const queryParams = generateQueryParams({
      ...params,
      apikey: this.#apiKey,
    });
    const uri = `${API_HOSTNAME}/?${queryParams}`;
    const response = await fetch<APIFetchResponse>(uri);
    return this.castAPIFetchResponse(response);
  }

  getById(id: string, opts?: FetchOptions): Promise<FetchResponse> {
    const searchParams = this.getAPIFetchParams(id, 'id', opts);
    return this.fetch(searchParams);
  }

  getByTitle(title: string, opts?: FetchOptions): Promise<FetchResponse> {
    const searchParams = this.getAPIFetchParams(title, 'title', opts);
    return this.fetch(searchParams);
  }

  async search(search: string, opts?: SearchOptions): Promise<SearchResponse> {
    const searchParams = this.getAPISearchParams(search, opts);
    const queryParams = generateQueryParams({
      ...searchParams,
      apikey: this.#apiKey,
    });
    const uri = `${API_HOSTNAME}/?${queryParams}`;
    const response = await fetch<APISearchResponse>(uri);
    return this.castAPISearchResponse(response);
  }
}

export default OMDb;
