import OMDb from '../src/omdb';
import { expect } from 'chai';

const { API_KEY } = process.env;

if (!API_KEY) {
  throw new Error('API_KEY is missing');
}

class SuccessfulTestError extends Error {
  constructor() {
    super('This test is expected to fail');
  }
}

describe('OMDb SDK', () => {
  describe('omdb.search', () => {
    const movieName = 'Onward';

    it('should return an error if the API_KEY is invalid', async () => {
      const client = new OMDb('');
      try {
        await client.search(movieName);
        throw new SuccessfulTestError();
      } catch (e) {
        expect(e).to.exist;
        expect(e).to.not.instanceOf(SuccessfulTestError);
      }
    });

    it('should return retrieve a list of movies', async () => {
      const client = new OMDb(API_KEY);
      try {
        const res = await client.search(movieName);
        expect(res).to.exist;
        expect(res.length).to.be.greaterThan(0);
      } catch (e) {
        expect(e).to.not.exist;
      }
    });
  });

  describe('omdb.getByTitle', () => {
    const movieName = 'Shrek';

    it('should return an error if the API_KEY is invalid', async () => {
      const client = new OMDb('');
      try {
        await client.getByTitle(movieName);
        throw new SuccessfulTestError();
      } catch (e) {
        expect(e).to.exist;
        expect(e).to.not.instanceOf(SuccessfulTestError);
      }
    });

    it('should throw an error if the movie is not found', async () => {
      const client = new OMDb(API_KEY);
      try {
        await client.getByTitle('qsnddjksfhshdqsd');
        throw new SuccessfulTestError();
      } catch (e) {
        expect(e).to.exist;
        expect(e).to.not.instanceOf(SuccessfulTestError);
      }
    });

    it('should retrieve a movie', async () => {
      const client = new OMDb(API_KEY);
      try {
        const res = await client.getByTitle(movieName);
        expect(res).to.exist;
      } catch (e) {
        expect(e).to.not.exist;
      }
    });
  });

  describe('omdb.getById', () => {
    const movieId = 'tt2575988';

    it('should return an error if the API_KEY is invalid', async () => {
      const client = new OMDb('');
      try {
        await client.getById(movieId);
        throw new SuccessfulTestError();
      } catch (e) {
        expect(e).to.exist;
        expect(e).to.not.instanceOf(SuccessfulTestError);
      }
    });

    it('should throw an error if the movie is not found', async () => {
      const client = new OMDb(API_KEY);
      try {
        await client.getById('qsnddjksfhshdqsd');
        throw new SuccessfulTestError();
      } catch (e) {
        expect(e).to.exist;
        expect(e).to.not.instanceOf(SuccessfulTestError);
      }
    });

    it('should retrieve a movie', async () => {
      const client = new OMDb(API_KEY);
      try {
        const res = await client.getById(movieId);
        expect(res).to.exist;
      } catch (e) {
        expect(e).to.not.exist;
      }
    });
  });
});
