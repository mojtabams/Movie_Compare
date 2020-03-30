const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c4568ff9',
            s: searchTerm,
        },
    });

    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
};

const container = document.querySelector('#container');
container.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results"></div>
        </div>
      </div>
`
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const results = document.querySelector(".results");

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${movie.Poster}" />
            <h1>${movie.Title}</h1>
            `;
        results.appendChild(div);
    }
};

input.addEventListener('input', debounce(onInput, 500));