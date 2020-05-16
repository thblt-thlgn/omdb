import * as http from 'http';
import { APISearchResponse, APIError } from './typing';

export const generateQueryParams = (
  queryParams: Record<string, string | number | undefined>,
): string =>
  Object.entries(queryParams)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const fetch = <T extends APISearchResponse>(uri: string): Promise<T> =>
  new Promise((resolve, reject) => {
    http
      .get(uri, {}, (res) => {
        res.on('data', (data) => {
          const result = JSON.parse(String(data)) as T | APIError;
          if (result.Response === 'True') {
            resolve(result as T);
          } else {
            reject((result as APIError).Error);
          }
        });
      })
      .on('error', reject);
  });
