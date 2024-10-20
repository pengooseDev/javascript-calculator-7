# javascript-calculator-precourse

## 과제 진행 요구 사항

- 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
- Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다

---

## 추가할 환경 설정

- [x] Node.js는 20.17.0 버전에서 동작한다.
- [ ] 기본적으로 JavaScript Style Guide를 원칙으로 한다.
  - [ ] prettier 설정을 추가한다.
  - [ ] eslint 설정을 추가한다.

## 구현할 기능 목록

- [ ] 유저의 입력을 받는다.

- [ ] 구분자를 추출한다.

  - `숫자`, `구분자(쉼표, 콜론)`, `커스텀 구분자(//{separator}\n)`를 구분한다.
  - 구분자, 커스텀 구분자가 있을 경우, 이를 `구분자 배열`에 저장한다.
  - [ ] `구분자 배열`이 비어있는 경우, 예외 처리한다.
  - [ ] `커스텀 구분자`로 숫자를 추가할 경우, 예외 처리한다.
  - [ ] `커스텀 구분자`가 공백인 경우, 예외 처리한다.

- [ ] 계산을 위해 문자열을 가공한다.

  - 구분자를 기준으로 분리된 `연산 배열`을 생성한다.
  - `연산 배열`을 반환한다.
  - [ ] 구분자 배열에 존재하지 않는 경우, 문자열을 숫자로 변환한다.
    - [ ] 숫자가 아닌 경우, 예외 처리한다.

- [ ] `가공된 연산 배열`이 올바른 형식인지 검증한다.

  - [ ] 숫자와 구분자 및 커스텀 구분자 이외의 값이 포함되어 있는 경우, 예외 처리한다.
  - [ ] 숫자가 없는 경우, 예외 처리한다.

- [ ] 숫자를 더한다.

  - `홀수` index의 값을 누적한다.
  - `짝수` index의 값이 구분자 배열에 존재하지 않는 경우, 예외처리 한다.

- [ ] 결과 값을 반환한다.

- 커스텀 에러를 이용해 에러메시지(`[ERROR]`)를 처리한다.
