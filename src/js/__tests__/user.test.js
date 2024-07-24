import { loadUser } from '../user';
import { httpGet } from '../http';
import Validator from '../user';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call loadUser once', () => {
  httpGet.mockReturnValue(JSON.stringify({}));

  const response = loadUser(1);
  expect(response).toEqual({});
  expect(httpGet).toHaveBeenCalledWith('http://server:8080/users/1');
});

const dataForTest = [
    ['GA-23if3u_ll-i12_n', true],
    ["!fsks#", true],
    ['fdjsk3', false],
    ['3sdkfjn', false],
    ['hs32d32f33233g32s', false],
    ['-sdfak', false],
    ['_sdfak', false],
    ['sdfak-', false],
    ['sdfak_', false],
    ['na123me', true],
    ['na1235me', false]
  ]

test.each(dataForTest)('Username test: $s Result: %s', (value, result) => {
  const regex = new Validator()
  const regexResult = regex.validateUsername(value)
  expect(regexResult).toBe(result)
})