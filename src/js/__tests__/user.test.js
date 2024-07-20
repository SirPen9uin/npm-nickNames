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
    ['GA-23if3u_ll-i12_n', 'Success'],
    ["!fsks#", 'Success'],
    ['fdjsk3', 'Wrong username'],
    ['3sdkfjn', 'Wrong username'],
    ['hs32d32f333g32s', 'Test failed. More then two digits!'],
    ['-sdfak', 'Wrong username'],
    ['_sdfak', 'Wrong username'],
    ['sdfak-', 'Wrong username'],
    ['sdfak_', 'Wrong username']
  ]

test.each(dataForTest)('Username test: $s Result: %s', (value, result) => {
  const regex = new Validator()
  const regexResult = regex.validateUsername(value)
  expect(regexResult).toBe(result)
})