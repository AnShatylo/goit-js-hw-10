import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  const delay = document.querySelector('[name="delay"]');
  const state = document.querySelectorAll('[name="state"]');

  form.addEventListener('submit', formSubmit);

  function formSubmit(e) {
    e.preventDefault();

    const formData = {
      delay: delay.value,
      state: Array.from(state).find(input => input.checked)?.value || '',
    };

    if (formData.delay === '' || formData.state === '') {
      alert('Please fill all fields');
    } else {
      form.reset();

      createPromise(formData)
        .then(fulfilled => {
          iziToast.success({
            backgroundColor: '#59A10D',
            message: `Fulfilled promise in ${formData.delay}ms`,
            titleColor: '#fff',
            messageColor: '#fff',
            progressBarColor: ' #b5ea7',
          });
        })
        .catch(rejected => {
          iziToast.error({
            backgroundColor: '#EF4040',
            message: `Rejected promise in ${formData.delay}ms`,
            titleColor: '#fff',
            messageColor: '#fff',
            progressBarColor: '#B51B1B',
          });
        });
    }
  }

  function createPromise(formData) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (formData.state === 'fulfilled') {
          res('fulfilled');
        } else {
          rej('rejected');
        }
      }, formData.delay);
    });
  }
});
