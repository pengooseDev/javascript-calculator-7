import { Separator } from '../src/models/Separator';

describe('Separator', () => {
  describe('기본 구분자', () => {
    it('문자열에서 주어진 구분자를 추출해야 한다.', () => {
      const DEFAULT_SEPARATORS = [',', ':'];

      const separator = new Separator(DEFAULT_SEPARATORS);
      const separators = separator.extract('1,2:3');

      expect(separators).toContain(',');
      expect(separators).toContain(':');
    });

    it('문자열에서 주어지지 않은 구분자는 추출하지 않아야 한다.', () => {
      const DEFAULT_SEPARATORS = [','];

      const separator = new Separator(DEFAULT_SEPARATORS);
      const separators = separator.extract('1,2:3');

      expect(separators).toContain(',');
      expect(separators).not.toContain(';');
    });
  });

  describe('커스텀 구분자', () => {
    it('문자열에서 주어진 커스텀 구분자를 추출해야 한다.', () => {
      const DEFAULT_SEPARATORS = [',', ':'];

      const separator = new Separator(DEFAULT_SEPARATORS);
      const separators = separator.extract('1,//custom\\n2:3');

      expect(separators).toContain(',');
      expect(separators).toContain(':');
      expect(separators).toContain('custom');
    });

    it('커스텀 구분자가 정규표현식에 사용되는 문자를 포함할 경우, 올바르게 이스케이프 처리해야 한다.', () => {
      const separator = new Separator();
      const separators = separator.extract('1//.\\n2//(.*?)\\n3');

      expect(separators).toContain('.');
      expect(separators).toContain('(.*?)');
    });

    it('커스텀 구분자가 비어있을 경우, 예외처리 한다.', () => {
      const separator = new Separator();

      expect(() => separator.extract('1//\\n2')).toThrowError(
        '[ERROR] 커스텀 구분자가 비어있습니다.',
      );
    });

    it('커스텀 구분자로 숫자를 입력할 경우, 예외처리 한다.', () => {
      const separator = new Separator();

      expect(() => separator.extract('1//1\\n2')).toThrowError(
        '[ERROR] 커스텀 구분자로 숫자를 입력할 수 없습니다.',
      );
    });
  });

  it('구분자가 중복된 경우, 중복을 제거해야 한다.', () => {
    const separator = new Separator([',', ':']);
    const separators = separator.extract('1//custom\\n2//custom\\n3,4,5:6:7');

    expect(separators).toHaveLength(3);
  });

  describe('split', () => {
    it('문자열을 주어진 구분자로 나누어야 한다.', () => {
      const separator = new Separator([',', ':']);
      const splitedInput = separator.split('1,2:3');

      expect(splitedInput).toEqual(['1', ',', '2', ':', '3']);
    });

    it('문자열을 주어진 커스텀 구분자로 나누어야 한다.', () => {
      const separator = new Separator([',', ':']);
      const input = '1//custom\\n2//custom\\n3,4,5:6:7';
      separator.extract(input);
      const splitedInput = separator.split(input);

      expect(splitedInput).toEqual([
        '1',
        'custom',
        '2',
        'custom',
        '3',
        ',',
        '4',
        ',',
        '5',
        ':',
        '6',
        ':',
        '7',
      ]);
    });
  });

  describe('예외처리', () => {
    it('구분자가 존재하지 않을 경우, 예외처리 한다.', () => {
      const DEFAULT_SEPARATORS = [',', ':'];

      const separator = new Separator(DEFAULT_SEPARATORS);

      expect(() => separator.extract('1')).toThrowError(
        '[ERROR] 구분자가 존재하지 않습니다.',
      );
    });
  });
});
