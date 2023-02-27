import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(evt => {
    const objectSave = { email: email.value, message: message.value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectSave));
  }, 500)
);

form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (email.value === '' || message.value === '') {
    return alert(' Fill in all fields of the form!');
  }
  console.log({ email: email.value, message: message.value });
  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export default {
  save,
  load,
};
const storageData = load(LOCALSTORAGE_KEY);

if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}
