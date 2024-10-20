import { Console } from '@woowacourse/mission-utils';

const MESSAGE = Object.freeze({
  READ_USER_INPUT: '덧셈할 문자열을 입력해 주세요.',
});
const SEPARATORS = [',', ':'];

class App {
  #separators = [];

  async run() {
    const userInput = await this.#readUserInput(MESSAGE.READ_USER_INPUT);
  }

  async #readUserInput(message) {
    return await Console.readLineAsync(message);
  }
}

export default App;
