document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();

    // Event listener for form submission
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('search-input').value;
        getImageOfTheDay(date);
    });

    // Event listener for clicking on search history items
    document.getElementById('search-history').addEventListener('click', (e) => {
        if (e.target && e.target.nodeName === 'LI') {
            const date = e.target.textContent;
            getImageOfTheDay(date);
        }
    });
});

// Function to fetch and display the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    getImageOfTheDay(currentDate);
}

// Function to fetch and display the image of the day for a given date
function getImageOfTheDay(date) {
    // Replace 'your_api_key' with your actual NASA API key
    const apiKey = 'dzoifGpnfoaJozPy6ScPbVTpYxCBLMU2WjPAn2Bq';
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayImageData(data);
            saveSearch(date);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Function to display image data in the UI
function displayImageData(data) {
    const imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.date}</p>
        <img src="${data.url}" alt="${data.title}" width="100%">
        <p>${data.explanation}</p>
    `;
}

// Function to save a date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
    addSearchToHistory(date);
}

// Function to display search history in the UI
function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li');
    listItem.textContent = date;
    searchHistory.appendChild(listItem);
}
