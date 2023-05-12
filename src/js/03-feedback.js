import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};

const throttledFnSaveFormData = throttle(e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttledFnSaveFormData);

populateForm();

function populateForm() {
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (formData) {
    if (formData.email) {
      refs.email.value = formData.email;
    }
    if (formData.message) {
      refs.message.value = formData.message;
    }
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (
    refs.email.value.trim().length === 0 ||
    refs.message.value.trim().length === 0
  ) {   console.log('alert');
    alert('Fill out the form before sending');
  } else {
    console.log('formData:', formData);
    formData.email = '';
    formData.message = '';
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
 }
}
