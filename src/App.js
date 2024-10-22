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
}

export default App;
