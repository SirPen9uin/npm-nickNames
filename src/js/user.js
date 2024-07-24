import { httpGet } from './http';

export function loadUser(id) {
  const data = httpGet(`http://server:8080/users/${id}`);
  return JSON.parse(data);
}

// eslint-disable-next-line no-unused-vars
export function saveUser(user) {
  throw new Error('Unimplemented');
}

export default class Validator {
  validateUsername(value) {

    if(!/^[^0-9-_][a-z-_0-9]*[^0-9-_]$/i.test(value)) {
      return false
    }

    if(/\d{4,}/.test(value)) {
      return false
    }

    return true
  }
}