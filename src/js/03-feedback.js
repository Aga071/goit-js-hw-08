import throttle from 'lodash.throttle';

const formFeedback = document.querySelector('.feedback-form');
const inputEmail = formFeedback.querySelector('input');
const textareaMessage = formFeedback.querySelector('textarea');
const buttonForm = formFeedback.querySelector('button');

const LOCALSTORAGE_KEY = 'feedback-form-state';

let newObj = {};
updateOutput();

// var throt_fun = _.throttle(
//   formFeedback.addEventListener('input', e => {
//     newObj.email = inputEmail.value;
//     newObj.message = textareaMessage.value;

//     localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newObj));
//   })
// );

// throt_fun();

formFeedback.addEventListener(
  'input',
  throttle(() => {
    newObj.email = inputEmail.value;
    newObj.message = textareaMessage.value;

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newObj));
  }, 500)
);

function updateOutput() {
  try {
    const parsedSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    inputEmail.value = parsedSettings.email || '';
    textareaMessage.value = parsedSettings.message || '';
  } catch {}
}
formFeedback.addEventListener('submit', evt => {
  evt.preventDefault();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  inputEmail.value = '';
  textareaMessage.value = '';
  console.log(newObj);
});