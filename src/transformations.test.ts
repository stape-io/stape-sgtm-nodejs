import {
  base64,
  trim,
  sha256base64,
  sha256hex,
  md5,
  toLowerCase,
} from './transformations';

describe('Transformations', () => {
  describe('base64', () => {
    it('should encode a string to base64', () => {
      const input = 'Hello, World!';
      const expectedOutput = 'SGVsbG8sIFdvcmxkIQ==';
      expect(base64(input)).toEqual(expectedOutput);
    });
  });

  describe('trim', () => {
    it('should remove leading and trailing whitespace', () => {
      const input = '   Trim me   ';
      const expectedOutput = 'Trim me';
      expect(trim(input)).toEqual(expectedOutput);
    });
  });

  describe('sha256base64', () => {
    it('should compute SHA-256 and return base64 encoded value', () => {
      const input = 'Hash me';
      const expectedOutput = '6yAa9arw1gYp09KmHkZs/A/ttRet2DHsrFI14dqpY9Y=';
      expect(sha256base64(input)).toEqual(expectedOutput);
    });
  });

  describe('sha256hex', () => {
    it('should compute SHA-256 and return hex encoded value', () => {
      const input = 'Hash me';
      const expectedOutput =
        'eb201af5aaf0d60629d3d2a61e466cfc0fedb517add831ecac5235e1daa963d6';
      expect(sha256hex(input)).toEqual(expectedOutput);
    });
  });

  describe('md5', () => {
    it('should compute MD5 hash', () => {
      const input = 'Hash me';
      const expectedOutput = '17b31dce96b9d6c6d0a6ba95f47796fb';
      expect(md5(input)).toEqual(expectedOutput);
    });
  });

  describe('toLowerCase', () => {
    it('should convert a string to lowercase', () => {
      const input = 'Convert Me To Lowercase';
      const expectedOutput = 'convert me to lowercase';
      expect(toLowerCase(input)).toEqual(expectedOutput);
    });
  });
});
