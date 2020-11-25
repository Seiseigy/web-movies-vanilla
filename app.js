const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');

const API = 'https://www.thesuper.cloud/api/movies?movie=';

form.addEventListener('submit', submittedForm);

function getResults(searchTerm) {
    const url = `${API}${searchTerm}`;
    const results = [];
    fetch(url)
        .then(response => response.json())
        .then(data => showResults(data.Search));
};

function submittedForm(event) {
    event.preventDefault();
    const searchTerm = input.value;
    getResults(searchTerm)
};

function showResults(results) {
    console.log(results);
};




