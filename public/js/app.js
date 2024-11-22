console.log('Client side savascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';


    const weatherUrl = 'http://localhost:3000/weather/?address=' + encodeURIComponent(location);

    fetch(weatherUrl).then((response) => {
        response.json().then((data) => {
            if (!data || data.error) {
                messageOne.textContent = data.error;
            }
            else {
                console.log(data);
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        });
    });


    console.log(location);
});