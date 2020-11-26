const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection = document.querySelector('#results');

const API = 'https://www.thesuper.cloud/api/movies?movie=';

form.addEventListener('submit', submittedForm);

async function getResults(searchTerm) {
    const url = `${API}${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.Error) {
        throw new Error(data.Error);
    }
    return data.Search;
};

async function submittedForm(event) {
    event.preventDefault();
    const searchTerm = input.value;
    try {
        const results = await getResults(searchTerm)
        showResults(results);
    } catch(error) {
        showError(error);
    }
};

function showResults(results) {
    resultsSection.innerHTML = results.reduce((html, movie) => {
        return html + `
        <div class="card col-4 border-info mb-3" style="max-width: 20rem;">
            <img class ="card-img-top" src="${movie.Poster} alt="${movie.Title}">
            <div class="card-body">
              <h4 class="card-title text-center">${movie.Title}</h4>
              <p class="card-text text-center">${movie.Year}</p>
            </div>
        </div>
        `;    
    } ,'');
};

function showError(error) {
    console.log(error);
    resultsSection.innerHTML = `
    <div class="alert alert-dismissible alert-danger col mt-5">
        ${error}
    </div>
    `;
}


