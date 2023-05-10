import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
const throttledFnSaveFormData = throttle(e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttledFnSaveFormData);

populateForm();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('formData:', formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    refs.email.value = savedData.email;
    refs.message.value = savedData.message;
  }
}
