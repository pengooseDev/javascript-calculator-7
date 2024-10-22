export class Separator {
  static CUSTOM_SEPARATOR_REGEX = /\/\/(.*?)\\n/g;

  static TYPE = {
    CUSTOM: 'custom',
    DEFAULT: 'default',
  };

  #separators;

  constructor(defaultSeparators = []) {
    this.#separators = new Map();

    defaultSeparators.forEach((separator) => {
      this.#separators.set(separator, Separator.TYPE.DEFAULT);
    });
  }

  extract(string) {
    const customSeparatorMatches = string.matchAll(
      Separator.CUSTOM_SEPARATOR_REGEX,
    );

    for (const match of customSeparatorMatches) {
      const customSeparator = match[1];

      if (customSeparator.length === 0) {
        throw new Error('[ERROR] 커스텀 구분자가 비어있습니다.');
      }

      const isNumber = !Number.isNaN(Number(customSeparator));
      if (isNumber) {
        throw new Error('[ERROR] 커스텀 구분자로 숫자를 입력할 수 없습니다.');
      }

      this.#separators.set(customSeparator, Separator.TYPE.CUSTOM);
    }

    const escapedSeparators = [...this.#separators.keys()].map((value) =>
      this.#escapeRegExp(value),
    );
    const separatorRegex = new RegExp(escapedSeparators.join('|'), 'g');
    const matches = string.match(separatorRegex);

    if (!matches) {
      throw new Error('[ERROR] 구분자가 존재하지 않습니다.');
    }

    return [...this.#separators.keys()];
  }

  contain(separator) {
    return this.#separators.has(separator);
  }

  split(string) {
    const separators = [...this.#separators].map(([separator, type]) => {
      if (type === Separator.TYPE.CUSTOM) {
        return this.#escapeRegExp(`//${separator}\\n`);
      }
      return separator;
    });

    const separatorRegex = new RegExp(`(${separators.join('|')})`, 'g');

    return string
      .split(separatorRegex)
      .filter(Boolean)
      .map((value) => value.replace(/\/\/|\\n/g, ''));
  }

  #escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
