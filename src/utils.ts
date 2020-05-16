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
    const onComplete = (bufferedData: Buffer[]): void => {
      const result = JSON.parse(String(Buffer.concat(bufferedData))) as T | APIError;
      if (result.Response === 'True') {
        resolve(result as T);
      } else {
        reject((result as APIError).Error);
      }
    };

    http
      .get(uri, {}, (res) => {
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
