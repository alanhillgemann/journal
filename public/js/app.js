// Personal API Key for OpenWeatherMap API
const apiKey = 'cfc8a56aa5890af342bb99ff465e8ad9&units=imperial';

// Base URL for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

/* Function called by event listener */
const createEntryAndUpdateJournal = () => {
    const newEntryZipCode = document.getElementById('zip').value;
    const newEntryFeeling = document.getElementById('feelings').value;
    const generateButton = document.getElementById('generate');
    getWeatherForZipCode(baseURL, newEntryZipCode, apiKey)
    .then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    })
    .then((res) => {
        return postNewEntry('/add', {
            feeling: newEntryFeeling,
            temperature: res.main.temp,
            zipcode: newEntryZipCode,
        });
    })
    .then((res) => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    })
    .then(() => {
        return getAllEntries('/all');
    })
    .then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    })
    .then((res) => {
        generateButton.disabled = false;
        updateMostRecentEntry(res);
    })
    .catch((err) => {
        console.error(err);
        generateButton.disabled = false;
        document.getElementById('form')
        .insertAdjacentHTML(
            'afterbegin', `<div id="error" role="alert">
            <p>Something went wrong. Try again later.</p></div>`
        );
    });
}

/* Function to GET Web API Data*/
const getWeatherForZipCode = async (baseURL, newEntryZipCode, apiKey) => {
    const reqURL = baseURL + '?zip=' + newEntryZipCode + '&appid=' + apiKey;
    return await fetch(reqURL);
}

/* Function to POST data */
const postNewEntry = async (reqURL = '/add', newEntry = {}) => {
    return await fetch(reqURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
    });
}

/* Function to GET Project Data */
const getAllEntries = async (reqURL = '/all') => {
    return await fetch(reqURL);
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', (e) => {
    e.preventDefault();
    if (document.getElementById('form').reportValidity()) {
        setTimeout(() => {
            document.getElementById('generate').disabled = true;
        }, 0);
        errorMessage = document.getElementById('error');
        if (errorMessage) {
            errorMessage.remove();
        }
        createEntryAndUpdateJournal();
    }
});

/* Function to UPDATE page with most recent entry */
const updateMostRecentEntry = (res) => {
    document.getElementById('date').innerHTML = `<p>Date: ${res.date}</p>`;
    document.getElementById('zipcode').innerHTML = `<p>Zip code: ${res.zipcode}</p>`;
    document.getElementById('temp').innerHTML = `<p>Temperature: ${res.temperature} <span>&#8457;</span></p>`;
    document.getElementById('content').innerHTML = `<p>Feeling: ${res.feeling}</p>`;
}
