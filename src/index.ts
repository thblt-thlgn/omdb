import { generateQueryParams, fetch } from './utils';
import { APISearchParams, APISearchResponse, SearchParam, SearchResponse } from './typing';

const API_HOSTNAME = 'http://www.omdbapi.com';
const API_VERSION = 1;

class OMDb {
  #apiKey: string;

  constructor(apiKey: string) {
    this.#apiKey = apiKey;
  }

  private castSearchParams = (params: SearchParam): APISearchParams => ({
    s: params.search,
    type: params.type,
    y: params.year,
    r: 'json',
    page: params.page || 1,
    v: API_VERSION,
  });

  private castAPISearchResponse = (params: APISearchResponse): SearchResponse =>
    params.Search.map((item) => ({
      title: item.Title,
      imdbID: item.imdbID,
      type: item.Type,
      year: Number(item.Year),
      poster: item.Poster === 'N/A' ? item.Poster : undefined,
    }));

  async search(params: SearchParam): Promise<SearchResponse> {
    const searchParams = this.castSearchParams(params);
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
