import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const delayInput = event.currentTarget.elements.delay;
    const delay = parseInt(delayInput.value);

    const stateInput = event.currentTarget.elements.state;
    const state = stateInput.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay)
            } else {
                reject(delay);
            }
        }, delay)
    });
promise
    .then(value => {
        iziToast.success({
            title: 'Success',
            color: 'green',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
        });
    })
    .catch(error => {
        iziToast.error({
            title: 'Error',
            color: 'red',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
        });
        form.reset();
    });
});



