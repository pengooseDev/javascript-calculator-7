import { Console } from '@woowacourse/mission-utils';
import { Separator } from './models/Separator.js';

const MESSAGE = Object.freeze({
  READ_USER_INPUT: '덧셈할 문자열을 입력해 주세요.',
});
const DEFAULT_SEPARATORS = Object.freeze([',', ':']);

class App {
  #separator = new Separator(DEFAULT_SEPARATORS);

  async run() {
    const userInput = await this.#readUserInput(MESSAGE.READ_USER_INPUT);
    this.#separator.extract(userInput);
    const splitedInput = this.#separator.split(userInput);
    const parsedInput = this.#parseNumbers(splitedInput);
    this.#validateNumbers(parsedInput);

    const result = this.#add(parsedInput);
    this.#printResult(result);
  }

  async #readUserInput(message) {
    return await Console.readLineAsync(message);
  }

  #parseNumbers(array) {
    return array.map((value) => {
      if (this.#separator.contain(value)) {
        return value;
      }

      const number = Number(value);
      if (Number.isNaN(number)) {
        throw new Error('[ERROR] 숫자가 아닌 값이 포함되어 있습니다.');
      }

      return number;
    });
  }

  #validateNumbers(array) {
    const hasNumber = array.some((value) => typeof value === 'number');
    if (!hasNumber) {
      throw new Error('[ERROR] 숫자가 포함되어 있지 않습니다.');
    }

    const isNumberOrSeparator = array.every(
      (value) => typeof value === 'number' || this.#separator.contain(value),
    );

    if (!isNumberOrSeparator) {
      throw new Error('[ERROR] 숫자와 구분자가 아닌 값이 포함되어 있습니다.');
    }
  }

  #add(array) {
    return array.reduce((acc, current, index) => {
      if (index % 2 === 1) {
        if (!this.#separator.contain(current)) {
          throw new Error(
            `[ERROR] 구분자가 아닌 값이 포함되어 있습니다.${current}`,
          );
        }

        return acc;
      }

      return acc + current;
    }, 0);
  }

  #printResult(result) {
    Console.print(`결과: ${result}`);
  }
}

export default App;
