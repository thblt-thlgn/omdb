import * as http from 'http';
import { APISearchResponse, APIError, APIFetchResponse } from './typing';

export const generateQueryParams = (
  queryParams: Record<string, string | number | undefined>,
): string =>
  Object.entries(queryParams)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const asNumber = (value: string): number => parseFloat(value.replace(',', '.'));

export const asNullable = (value: string): string | null => (value === 'N/A' ? null : value);

export const fetch = <T extends APISearchResponse | APIFetchResponse>(uri: string): Promise<T> =>
  new Promise((resolve, reject) => {
    const onComplete = (bufferedData: Buffer[]): void => {
      const result = JSON.parse(String(Buffer.concat(bufferedData))) as T | APIError;
      if (result.Response === 'True') {
        resolve(result as T);
      } else {
        reject((result as APIError).Error);
      }
    };

    http
      .get(encodeURI(uri), {}, (res) => {
        const bufferedData: Buffer[] = [];

        res.on('data', (data) => {
          bufferedData.push(data);
          if (res.complete) {
            onComplete(bufferedData);
          }
        });
      })
      .on('error', reject);
  });
