import { generateQueryParams, asNumber, asNullable } from '../src/utils';
import { expect } from 'chai';

describe('Utils functions', () => {
  describe('generateQueryParams', () => {
    it('should return a valid query parms string', () => {
      const queryParams = {
        param1: 1,
        param2: 'another param',
      };
      const res = generateQueryParams(queryParams);
      expect(res).to.exist;
      expect(res).to.be.equal(`param1=1&param2=another param`);
    });
  });

  describe('asNumber', () => {
    it('should convert into a valid number', () => {
      expect(asNumber('42')).to.be.equal(42);
      expect(asNumber('42.69')).to.be.equal(42.69);
      expect(asNumber('42,69')).to.be.equal(42.69);
    });
  });

  describe('asNullable', () => {
    it('should return a string', () => {
      expect(asNullable('just a string')).to.be.equal('just a string');
    });

    it('should return null', () => {
      expect(asNullable('N/A')).to.be.equal(null);
    });
  });
});
