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
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
    
        </div>
      </div>
`
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const content = document.querySelector(".dropdown-content");

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `  
            <a href="#" class="dropdown-item">
            <img src="${movie.Poster}" />
            ${movie.Title}
            </a>            
            `;
        content.appendChild(div);
    }
};

input.addEventListener('input', debounce(onInput, 500));