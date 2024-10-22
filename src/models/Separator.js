export class Separator {
  static CUSTOM_SEPARATOR_REGEX = /\/\/(.*?)\\n/g;

  #separators;

  constructor(defaultSeparators = []) {
    this.#separators = new Set(defaultSeparators);
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
      this.#separators.add(customSeparator);
    }

    const escapedSeparators = [...this.#separators].map(this.#escapeRegExp);
    const separatorRegex = new RegExp(escapedSeparators.join('|'), 'g');
    const matches = string.match(separatorRegex);

    if (!matches) {
      throw new Error('[ERROR] 구분자가 존재하지 않습니다.');
    }

    return [...this.#separators];
  }

  contain(separator) {
    return this.#separators.has(separator);
  }

  #escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
