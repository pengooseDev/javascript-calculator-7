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
    const separators = this.#separator.extract(userInput);
    const splitedInput = this.#separator.split(userInput);
  }

  async #readUserInput(message) {
    return await Console.readLineAsync(message);
  }
}

export default App;
